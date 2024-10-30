let email = document.getElementById("email");
let password = document.getElementById("password");
let logBtn = document.getElementById("signIn");

let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");
let getName = localStorage.getItem("username")

logBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (email.value === "" || password.value === "") {
    alert("please fill all data");
  } else {
    if (
      getEmail &&
      getEmail.trim() === email.value.trim() &&
      getPassword &&
      getPassword === password.value
    ) {sessionStorage.setItem("username", getName)
      sessionStorage.setItem("email", getEmail)
      sessionStorage.setItem("password", getPassword)
      setTimeout(() => {
        window.location = "index.html";
      }, 800);
    }
    else {
      alert("Incorrect email or password!");
    }
  }
});
