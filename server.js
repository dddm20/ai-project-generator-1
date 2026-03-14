const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let db = {users:[], subscriptions:[]};
if(fs.existsSync("database.json")) db = JSON.parse(fs.readFileSync("database.json"));

// تسجيل حساب جديد
app.post("/register", (req,res)=>{
  const {email,password} = req.body;
  if(db.users.find(u=>u.email===email)) return res.json({msg:"الحساب موجود"});
  db.users.push({email,password,plan:"free"});
  fs.writeFileSync("database.json", JSON.stringify(db));
  res.json({msg:"تم إنشاء الحساب"});
});

// تسجيل دخول
app.post("/login", (req,res)=>{
  const {email,password} = req.body;
  const user = db.users.find(u=>u.email===email && u.password===password);
  if(user) res.json({success:true});
  else res.json({success:false});
});

// الاشتراكات
app.post("/subscribe", (req,res)=>{
  const {email,plan} = req.body;
  db.subscriptions.push({email,plan});
  fs.writeFileSync("database.json", JSON.stringify(db));
  res.json({msg:"تم تفعيل الاشتراك"});
});

app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
