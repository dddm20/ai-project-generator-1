// تسجيل حساب
async function register(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let res = await fetch("/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password})
  });
  let data = await res.json();
  alert(data.msg);
}

// تسجيل دخول
async function login(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let res = await fetch("/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password})
  });
  let data = await res.json();
  if(data.success) window.location="dashboard.html";
  else alert("خطأ في البيانات");
}

// تفعيل الاشتراك
async function subscribe(plan){
  let email = prompt("ادخل البريد الإلكتروني");
  let res = await fetch("/subscribe",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,plan})
  });
  let data = await res.json();
  alert(data.msg);
}
