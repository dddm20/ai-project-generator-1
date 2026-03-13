/* تسجيل */

async function register(){

let username=document.getElementById("username").value
let password=document.getElementById("password").value

let res=await fetch("/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username:username,
password:password

})

})

let text=await res.text()

document.getElementById("msg").innerText=text

}

/* تسجيل دخول */

async function login(){

let username=document.getElementById("username").value
let password=document.getElementById("password").value

let res=await fetch("/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username:username,
password:password

})

})

let text=await res.text()

if(text=="success"){

window.location="chat.html"

}else{

document.getElementById("msg").innerText="Login failed"

}

}

/* تفعيل الاشتراك */

async function activate(){

let username=document.getElementById("user").value

let res=await fetch("/activate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username:username

})

})

let text=await res.text()

document.getElementById("msg").innerText=text

}