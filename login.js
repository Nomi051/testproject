document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    if (email.toLowerCase() === "admin@carbon.com") {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "admin.html";
    } else {
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "dashboard.html";
    }
  });
});
