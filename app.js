const GAS_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycby2X2ku8gwIIq5_nYjEykekNk27IiTzNFRfF5fUhzwnczdZKf1ilUXssxfC4o-KB0tE/exec";

let PASSWORDS = [];
let SCHOOL_KEY = "";

document.addEventListener("DOMContentLoaded", function () {

  const userTypeSelect = document.getElementById("userTypeSelect");
  const employeeBlock = document.getElementById("employeeBlock");
  const employeeSelect = document.getElementById("employeeSelect");
  const authBlock = document.getElementById("authBlock");
  const continueBtn = document.getElementById("continueBtn");
  const loginBtn = document.getElementById("loginBtn");
  const loginPassword = document.getElementById("loginPassword");
  const loginModal = document.getElementById("loginModal");
  const schoolKeyBlock = document.getElementById("schoolKeyBlock");
  const schoolKeyInput = document.getElementById("schoolKeyInput");
  const schoolKeyBtn = document.getElementById("schoolKeyBtn");

  function openSession(type) {

    document.getElementById("loginModal").style.display = "none";
    document.getElementById("menuBtn").disabled = false;

    localStorage.setItem("userType", type);
  }

  function logout() {
    document.getElementById("loginModal").style.display = "flex";
    document.getElementById("menuBtn").disabled = true;
    localStorage.clear();
  }

  window.logout = logout;

  continueBtn.addEventListener("click", function () {
    openSession("parent");
  });

});
