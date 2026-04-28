let state=getData();

window.onload=()=>{render(state);};

function addComplaint(){
  const c={
    id:Date.now(),
    title:title.value,
    desc:desc.value,
    status:"Pending",
    priority:priority.value
  };
  state.unshift(c);
  setData(state);
  render(state);
}

function solve(id){
  state=state.map(x=>x.id==id?{...x,status:"Solved"}:x);
  setData(state); render(state);
}

function del(id){
  state=state.filter(x=>x.id!=id);
  setData(state); render(state);
}

function applyFilters(){
  let list=getData();
  const q=search.value.toLowerCase();
  const st=filterStatus.value;

  list=list.filter(x=>
    x.title.toLowerCase().includes(q) &&
    (st?x.status==st:true)
  );
  render(list);
}

function route(p){
  ["home","dashboard","profile","contact"].forEach(id=>{
    document.getElementById(id).classList.add("hide");
  });
  document.getElementById(p).classList.remove("hide");

  if(p=="dashboard") renderDashboard(getData());
}

function saveProfile(){
  setProfile({name:pname.value,email:pemail.value});
  alert("Saved");
}

function sendMsg(){
  toast.innerText="Message sent!";
  setTimeout(()=>toast.innerText="",2000);
}

function toggleTheme(){
  document.body.classList.toggle("dark");
}

function logout(){
  localStorage.removeItem("login");
  location.href="login.html";
}