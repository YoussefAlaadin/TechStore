let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let email = document.getElementById("email")
let password = document.getElementById("password")
let registerBtn = document.getElementById("signUp")
registerBtn.addEventListener("click", function(e){
e.preventDefault()
if(firstName.value===""|| lastName.value===""||email.value===""|| password.value===""){
    alert("please fill all data")
}
else{
    localStorage.setItem("username", firstName.value)
    localStorage.setItem("email", email.value)
    localStorage.setItem("password", password.value)
    setTimeout(()=>{
        window.location = "login.html"
    }, 800)
}
})

