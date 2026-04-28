let myChart;

window.onload = function () {
    displayComplaints(getComplaints());
};

function addComplaint() {
    const title = document.getElementById("title").value.trim();
    const desc = document.getElementById("desc").value.trim();

    if (!title || !desc) return alert("Fill all fields");

    const complaint = {
        id: Date.now(),
        title,
        desc,
        status: "Pending"
    };

    let data = getComplaints();
    data.unshift(complaint);
    saveComplaints(data);

    displayComplaints(data);
    updateDashboard();
}

function displayComplaints(data) {
    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(c => {
        list.innerHTML += `
            <div>
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
                <b>${c.status}</b><br>
                <button onclick="markSolved(${c.id})">✔</button>
                <button onclick="deleteComplaint(${c.id})">❌</button>
            </div>
        `;
    });
}

function deleteComplaint(id) {
    let data = getComplaints().filter(c => c.id !== id);
    saveComplaints(data);
    displayComplaints(data);
    updateDashboard();
}

function markSolved(id) {
    let data = getComplaints().map(c => {
        if (c.id === id) c.status = "Solved";
        return c;
    });

    saveComplaints(data);
    displayComplaints(data);
    updateDashboard();
}

function searchComplaint() {
    const val = document.getElementById("search").value.toLowerCase();
    const data = getComplaints();

    displayComplaints(
        data.filter(c =>
            c.title.toLowerCase().includes(val) ||
            c.desc.toLowerCase().includes(val)
        )
    );
}

function showPage(page) {
    const pages = ["homePage","aboutPage","dashboardPage","profilePage","contactPage"];
    pages.forEach(p => document.getElementById(p).style.display = "none");

    if (page === "home") document.getElementById("homePage").style.display = "block";
    if (page === "about") document.getElementById("aboutPage").style.display = "block";
    if (page === "dashboard") {
        document.getElementById("dashboardPage").style.display = "block";
        updateDashboard();
    }
    if (page === "profile") document.getElementById("profilePage").style.display = "block";
    if (page === "contact") document.getElementById("contactPage").style.display = "block";
}

function updateDashboard() {
    const data = getComplaints();

    const total = data.length;
    const pending = data.filter(c => c.status === "Pending").length;
    const solved = data.filter(c => c.status === "Solved").length;

    document.getElementById("total").innerText = total;
    document.getElementById("pending").innerText = pending;
    document.getElementById("solved").innerText = solved;

    const ctx = document.getElementById("chart");

    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Total", "Pending", "Solved"],
            datasets: [{
                data: [total, pending, solved],
                backgroundColor: ["blue","orange","green"]
            }]
        }
    });
}

function logout() {
    localStorage.removeItem("login");
    window.location.href = "login.html";
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}