function login() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    if (u === "admin" && p === "1234") {
        localStorage.setItem("login","true");
        window.location.href = "index.html";
    } else {
        alert("Invalid login");
    }
}