function getData(){return JSON.parse(localStorage.getItem("data"))||[]}
function setData(d){localStorage.setItem("data",JSON.stringify(d))}