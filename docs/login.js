function validate(event) {
  event.preventDefault();
  const email = document.getElementById("form2Example1").value;
  const pwd = document.getElementById("form2Example2").value;
  const error = document.querySelector(".invalid");
  const homePage = document.querySelector(".nextPage");

  if (email === "admin@email.com" && pwd === "abcd") {
    console.log("Login successful");
    error.innerHTML = "";
    window.location.replace("userpage.html");
  } else {
    error.innerHTML = "Please check your login info";
    console.log("Login unsuccessful");
  }
}
