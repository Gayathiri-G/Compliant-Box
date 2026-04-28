function showPage(page) {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("aboutPage").style.display = "none";

    if (page === "home") {
        document.getElementById("homePage").style.display = "block";
    } else {
        document.getElementById("aboutPage").style.display = "block";
    }
}