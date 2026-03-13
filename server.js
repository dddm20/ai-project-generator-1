const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const archiver = require("archiver")
const OpenAI = require("openai")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

mongoose.connect("YOUR_MONGODB_URL")

const User = require("./models/User")

const openai = new OpenAI({
apiKey:"YOUR_OPENAI_KEY"
})

/* تسجيل */

app.post("/register", async(req,res)=>{

const user = new User({

username:req.body.username,
password:req.body.password,
subscription:false

})

await user.save()

res.send("registered")

})

/* تسجيل دخول */

app.post("/login", async(req,res)=>{

const user = await User.findOne({

username:req.body.username,
password:req.body.password

})

if(user){

res.send("success")

}else{

res.send("error")

}

})

/* تفعيل الاشتراك */

app.post("/activate", async(req,res)=>{

await User.updateOne(
{username:req.body.username},
{$set:{subscription:true}}
)

res.send("activated")

})

/* AI Chat */

app.post("/chat", async(req,res)=>{

const completion = await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{role:"user",content:req.body.message}
]

})

res.send(completion.choices[0].message.content)

})

/* توليد مشروع */

app.post("/generate-project", async(req,res)=>{

const idea=req.body.idea

const prompt=
أنشئ مشروع ويب كامل.
أرسل الرد بصيغة JSON:

{
"index.html":"...",
"style.css":"...",
"script.js":"..."
}

الفكرة: ${idea}


const completion = await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{role:"user",content:prompt}
]

})

try{

const project = JSON.parse(
completion.choices[0].message.content
)

res.json(project)

}catch{

res.send("error")

}

})

/* تحميل ZIP */

app.post("/download-zip", async(req,res)=>{

const files=req.body

res.attachment("project.zip")

const archive=archiver("zip")

archive.pipe(res)

for(let name in files){

archive.append(files[name],{name:name})

}

archive.finalize()

})

app.listen(3000,()=>{

console.log("AI Builder Running")

})const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const archiver = require("archiver")
const OpenAI = require("openai")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

mongoose.connect("YOUR_MONGODB_URL")

const User = require("./models/User")

const openai = new OpenAI({
apiKey:"YOUR_OPENAI_KEY"
})

/* تسجيل */

app.post("/register", async(req,res)=>{

const user = new User({

username:req.body.username,
password:req.body.password,
subscription:false

})

await user.save()

res.send("registered")

})

/* تسجيل دخول */

app.post("/login", async(req,res)=>{

const user = await User.findOne({

username:req.body.username,
password:req.body.password

})

if(user){

res.send("success")

}else{

res.send("error")

}

})

/* تفعيل الاشتراك */

app.post("/activate", async(req,res)=>{

await User.updateOne(
{username:req.body.username},
{$set:{subscription:true}}
)

res.send("activated")

})

/* AI Chat */

app.post("/chat", async(req,res)=>{

const completion = await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{role:"user",content:req.body.message}
]

})

res.send(completion.choices[0].message.content)

})

/* توليد مشروع */

app.post("/generate-project", async(req,res)=>{

const idea=req.body.idea

const prompt=
أنشئ مشروع ويب كامل.
أرسل الرد بصيغة JSON:

{
"index.html":"...",
"style.css":"...",
"script.js":"..."
}

الفكرة: ${idea}


const completion = await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{role:"user",content:prompt}
]

})

try{

const project = JSON.parse(
completion.choices[0].message.content
)

res.json(project)

}catch{

res.send("error")

}

})

/* تحميل ZIP */

app.post("/download-zip", async(req,res)=>{

const files=req.body

res.attachment("project.zip")

const archive=archiver("zip")

archive.pipe(res)

for(let name in files){

archive.append(files[name],{name:name})

}

archive.finalize()

})

app.listen(3000,()=>{

console.log("AI Builder Running")

})