// MUST be global
function selectRole(role) {
  if (role === "seller") {
    window.location.href = "seller-signup.html";
  } else if (role === "buyer") {
    window.location.href = "buyer-signup.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {

  // SELLER SIGNUP
  const sellerForm = document.getElementById("sellerSignupForm");
  if (sellerForm) {
    sellerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      window.location.href = "seller-complete-profile.html";
    });
  }

  // BUYER SIGNUP
  const buyerForm = document.getElementById("buyerSignupForm");
  if (buyerForm) {
    buyerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const password = document.getElementById("buyerPassword").value;
      const confirmPassword = document.getElementById("buyerConfirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      window.location.href = "buyer-complete-profile.html";
    });
  }

});
