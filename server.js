const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { createProjectZip } = require("./utils/zip");
const { generateSite } = require("./ai/siteGenerator");
const { generateApp } = require("./ai/appGenerator");
const { generateGame } = require("./ai/gameGenerator");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const DB_FILE = "./database.json";

function readDB() {
    if(!fs.existsSync(DB_FILE)){
        fs.writeFileSync(DB_FILE, JSON.stringify({users:[], projects:[], subscriptions:[], chats:[]}));
    }
    return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data){
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ====================
// تسجيل مستخدم جديد
// ====================
app.post("/register", async (req,res)=>{
    const {username,email,password} = req.body;
    let db = readDB();
    if(db.users.find(u=>u.username===username)) return res.json({success:false,message:"اسم المستخدم موجود"});
    const hashed = await bcrypt.hash(password,10);
    db.users.push({username,email,password:hashed});
    writeDB(db);
    res.json({success:true});
});

// ====================
// تسجيل دخول
// ====================
app.post("/login", async (req,res)=>{
    const {username,password} = req.body;
    let db = readDB();
    const user = db.users.find(u=>u.username===username);
    if(!user) return res.json({success:false});
    const match = await bcrypt.compare(password,user.password);
    if(match) res.json({success:true});
    else res.json({success:false});
});

// ====================
// جلب البيانات
// ====================
app.get("/users", (req,res)=> res.json(readDB().users));
app.get("/projects", (req,res)=> res.json(readDB().projects));
app.get("/subscriptions", (req,res)=> res.json(readDB().subscriptions));
app.get("/chats", (req,res)=> res.json(readDB().chats));

// ====================
// إنشاء مشاريع AI
// ====================
app.get("/generate/:type", (req,res)=>{
    const {type} = req.params;
    let db = readDB();
    const id = Date.now();
    if(type==="site") generateSite(id);
    if(type==="app") generateApp(id);
    if(type==="game") generateGame(id);
    db.projects.push({id,type,createdAt:new Date()});
    writeDB(db);
    res.json({success:true,type});
});

// ====================
// تحميل ZIP
// ====================
app.get("/download/zip/:id", (req,res)=>{
    const id = req.params.id;
    createProjectZip(id,(err,zipName)=>{
        if(err) return res.status(500).send(err);
        res.download(zipName, ()=> fs.unlinkSync(zipName));
    });
});

// ====================
// دردشة AI
// ====================
app.post("/chat", (req,res)=>{
    const {message} = req.body;
    let db = readDB();
    db.chats.push({type:"user",message});
    const reply = "مرحباً! رد AI على: "+message;
    db.chats.push({type:"ai",message:reply});
    writeDB(db);
    res.json({reply});
});

app.listen(PORT,()=>console.log(Server running on http://localhost:${PORT}));