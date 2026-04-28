window.onload = function () {
    displayComplaints(getComplaints());

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
};

function addComplaint() {
    const title = document.getElementById("title").value.trim();
    const desc = document.getElementById("desc").value.trim();

    if (!title || !desc) return alert("Fill all fields");

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

    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
}

function displayComplaints(data) {
    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <span class="status ${item.status.toLowerCase()}">${item.status}</span>
            <br><small>${item.date}</small><br>
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
}

function markSolved(id) {
    let data = getComplaints().map(c => {
        if (c.id === id) c.status = "Solved";
        return c;
    });

    saveComplaints(data);
    displayComplaints(data);
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
    document.getElementById("homePage").style.display = "none";
    document.getElementById("aboutPage").style.display = "none";

    if (page === "home") {
        document.getElementById("homePage").style.display = "block";
    } else {
        document.getElementById("aboutPage").style.display = "block";
    }
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