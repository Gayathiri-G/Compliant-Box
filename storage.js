function getData(){return JSON.parse(localStorage.getItem("data"))||[]}
function setData(d){localStorage.setItem("data",JSON.stringify(d))}
function getProfile(){return JSON.parse(localStorage.getItem("profile"))||{}}
function setProfile(p){localStorage.setItem("profile",JSON.stringify(p))}