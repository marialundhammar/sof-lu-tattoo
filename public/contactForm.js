const contactForm = document.querySelector(".contact-form");

let name = document.getElementById("name");
let email = document.getElementById("email");
let subject;
let message = document.getElementById("message");
let phone = document.getElementById("phone");
let size = document.getElementById("size");
let url = document.getElementById("url");


/* let grey = document.getElementById("grey");
let lines = document.getElementById("lines"); */

function displayRadioValue() {
  var ele = document.getElementsByName('type');

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked)

      return ele[i].value;
  }
}



contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit clicked");


  let formData = {
    name: name.value,
    email: email.value,
    message: message.value,
    phone: phone.value,
    type: displayRadioValue(),
    size: size.value,
    url: url.value,

  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);

    if (xhr.responseText == "success") {
      alert("Boknings förfrågan skickad 🐱");

      name.value = "";
      email.value = "";
      message.value = "";
      phone.value = "";
      url.value = "";
      size.value = "";

    } else {
      alert("Something went wrong");
    }
  };

  xhr.send(JSON.stringify(formData));
});
