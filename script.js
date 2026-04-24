const list = document.getElementById("list");

// Load complaints
window.onload = function () {
    displayComplaints(getComplaints());
};

// Add complaint
function addComplaint() {
    const title = document.getElementById("title").value.trim();
    const desc = document.getElementById("desc").value.trim();

    if (!title || !desc) return;

    const complaint = {
        id: Date.now(),
        title,
        desc,
        date: new Date().toLocaleString()
    };

    let data = getComplaints();
    data.unshift(complaint);
    saveComplaints(data);

    displayComplaints(data);

    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
}

// Display complaints
function displayComplaints(data) {
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <small>${item.date}</small><br>
            <button onclick="deleteComplaint(${item.id})">Delete</button>
        `;

        list.appendChild(div);
    });
}

// Delete complaint
function deleteComplaint(id) {
    let data = getComplaints().filter(c => c.id !== id);
    saveComplaints(data);
    displayComplaints(data);
}

// Search complaint
function searchComplaint() {
    const value = document.getElementById("search").value.toLowerCase();
    const data = getComplaints();

    const filtered = data.filter(c =>
        c.title.toLowerCase().includes(value) ||
        c.desc.toLowerCase().includes(value)
    );

    displayComplaints(filtered);
}

// Logout
function logout() {
    localStorage.removeItem("login");
    window.location.href = "login.html";
}