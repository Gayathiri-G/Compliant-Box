function login(){
  if(username.value=="admin" && password.value=="1234"){
    localStorage.setItem("login","true");
    location.href="index.html";
  } else alert("Invalid");
}