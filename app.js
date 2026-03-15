// ====================
// تسجيل الدخول
// ====================
if(document.getElementById("loginForm")){
    document.getElementById("loginForm").addEventListener("submit", function(e){
        e.preventDefault();
        const username=document.getElementById("username").value.trim();
        const password=document.getElementById("password").value.trim();
        fetch("/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        })
        .then(r=>r.json())
        .then(data=>{
            const msg=document.getElementById("loginMessage");
            if(data.success){msg.style.color="green";msg.innerText="تم تسجيل الدخول";setTimeout(()=>window.location.href="index.html",1000);}
            else{msg.style.color="red";msg.innerText="خطأ في البيانات";}
        });
    });
}

// ====================
// تسجيل حساب جديد
// ====================
if(document.getElementById("registerForm")){
    document.getElementById("registerForm").addEventListener("submit",function(e){
        e.preventDefault();
        const username=document.getElementById("username").value.trim();
        const email=document.getElementById("email").value.trim();
        const password=document.getElementById("password").value.trim();
        const confirm=document.getElementById("confirmPassword").value.trim();
        const msg=document.getElementById("registerMessage");
        if(password!==confirm){msg.style.color="red";msg.innerText="كلمتا المرور غير متطابقتين"; return;}
        fetch("/register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,email,password})
        })
        .then(r=>r.json())
        .then(data=>{
            if(data.success){msg.style.color="green";msg.innerText="تم إنشاء الحساب";setTimeout(()=>window.location.href="login.html",1000);}
            else{msg.style.color="red";msg.innerText=data.message||"حدث خطأ";}
        });
    });
}

// ====================
// تحميل إحصائيات للمستخدمين والمشاريع
// ====================
function loadStats(){
    const usersCount=document.getElementById("usersCount");
    const projectsCount=document.getElementById("projectsCount");
    if(usersCount){
        fetch("/users").then(r=>r.json()).then(users=>usersCount.innerText="عدد المستخدمين: "+users.length);
    }
    if(projectsCount){
        fetch("/projects").then(r=>r.json()).then(projects=>projectsCount.innerText="عدد المشاريع: "+projects.length);
    }
}
loadStats();
setInterval(loadStats,5000);

// ====================
// إنشاء مشاريع AI
// ====================
function generateProject(type){
    fetch("/generate/"+type)
    .then(r=>r.json())
    .then(data=>{
        const msg=document.getElementById("genMessage");
        if(data.success){msg.style.color="green";msg.innerText="تم إنشاء مشروع "+data.type;}
        else{msg.style.color="red";msg.innerText="حدث خطأ";}
    });
}
window.generate=generateProject;

// ====================
// دردشة AI
// ====================
if(document.getElementById("chatForm")){
    const chatBox=document.getElementById("chatBox");
    const chatForm=document.getElementById("chatForm");
    function loadChats(){
        fetch("/chats").then(r=>r.json()).then(chats=>{
            chatBox.innerHTML="";
            chats.forEach(c=>{
                const div=document.createElement("div");
                div.innerText=${c.type}: ${c.message};
                chatBox.appendChild(div);
            });
            chatBox.scrollTop=chatBox.scrollHeight;
        });
    }
    chatForm.addEventListener("submit",e=>{
        e.preventDefault();
        const msg=document.getElementById("chatInput").value.trim();
        if(!msg) return;
        fetch("/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:msg})})

.then(r=>r.json()).then(data=>{
            document.getElementById("chatInput").value="";
            loadChats();
        });
    });
    loadChats();
    setInterval(loadChats,5000);
}

// ====================
// تحميل المشاريع بصيغة ZIP
// ====================
function downloadZip(id){
    window.location.href="/download/zip/"+id;
}
window.downloadZip=downloadZip;