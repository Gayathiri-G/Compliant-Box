function getComplaints() {
    return JSON.parse(localStorage.getItem("complaints")) || [];
}

function saveComplaints(data) {
    localStorage.setItem("complaints", JSON.stringify(data));
}
