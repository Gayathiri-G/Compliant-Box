let chart;

function render(list){
  const el=document.getElementById("list");
  el.innerHTML="";
  list.forEach(c=>{
    el.innerHTML+=`
    <div class="card">
      <h4>${c.title}</h4>
      <p>${c.desc}</p>
      <b>${c.status}</b> | ${c.priority}<br>
      <button onclick="solve(${c.id})">✔</button>
      <button onclick="del(${c.id})">❌</button>
    </div>`;
  });
}

function renderDashboard(data){
  const t=data.length;
  const p=data.filter(x=>x.status=="Pending").length;
  const s=data.filter(x=>x.status=="Solved").length;

  total.innerText=t; pending.innerText=p; solved.innerText=s;

  if(chart) chart.destroy();
  chart=new Chart(chart,{
    type:"bar",
    data:{labels:["Total","Pending","Solved"],
    datasets:[{data:[t,p,s]}]}
  });
}