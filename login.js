document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  const email = email.value;
  const password = password.value;

  if(email && password){
    localStorage.setItem("isLoggedIn","true");
    window.location.href = "dashboard.html";
  }
});
