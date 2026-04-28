window.onload = function () {
    displayComplaints(getComplaints());

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
};

function addComplaint() {
    const title = document.getElementById("title").value.trim();
    const desc = document.getElementById("desc").value.trim();

    if (!title || !desc) {
        alert("Enter all fields");
        return;
    }

    const complaint = {
        id: Date.now(),
        title,
        desc,
        status: "Pending",
        date: new Date().toLocaleString()
    };

    let data = getComplaints();
    data.unshift(complaint);
    saveComplaints(data);

    displayComplaints(data);
    updateDashboard(); // ✅ FIX

    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
}

function displayComplaints(data) {
    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <b>${item.status}</b><br>
            <small>${item.date}</small><br>
            <button onclick="markSolved(${item.id})">✔ Solve</button>
            <button onclick="deleteComplaint(${item.id})">❌ Delete</button>
        `;

        list.appendChild(div);
    });
}

function deleteComplaint(id) {
    let data = getComplaints().filter(c => c.id !== id);
    saveComplaints(data);
    displayComplaints(data);
    updateDashboard(); // ✅ FIX
}

function markSolved(id) {
    let data = getComplaints().map(c => {
        if (c.id === id) c.status = "Solved";
        return c;
    });

    saveComplaints(data);
    displayComplaints(data);
    updateDashboard(); // ✅ FIX
}

function searchComplaint() {
    const value = document.getElementById("search").value.toLowerCase();
    const data = getComplaints();

    const filtered = data.filter(c =>
        c.title.toLowerCase().includes(value) ||
        c.desc.toLowerCase().includes(value)
    );

    displayComplaints(filtered);
}

function showPage(page) {
    const home = document.getElementById("homePage");
    const about = document.getElementById("aboutPage");
    const dashboard = document.getElementById("dashboardPage");

    home.style.display = "none";
    about.style.display = "none";
    dashboard.style.display = "none";

    if (page === "home") {
        home.style.display = "block";
    } 
    else if (page === "about") {
        about.style.display = "block";
    } 
    else if (page === "dashboard") {
        dashboard.style.display = "block";
        updateDashboard(); // ✅ IMPORTANT
    }
}

function updateDashboard() {
    const data = getComplaints();

    document.getElementById("total").innerText = data.length;
    document.getElementById("pending").innerText =
        data.filter(c => c.status === "Pending").length;
    document.getElementById("solved").innerText =
        data.filter(c => c.status === "Solved").length;
}

function logout() {
    localStorage.removeItem("login");
    window.location.href = "login.html";
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}