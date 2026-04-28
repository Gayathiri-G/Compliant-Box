function login(){
if(username.value=="admin" && password.value=="1234"){
localStorage.setItem("login","true");
location="index.html";
}else{
alert("Invalid login");
}
}