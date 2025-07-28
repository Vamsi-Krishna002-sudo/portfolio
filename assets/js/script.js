'use strict';

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();
  });

}
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");

  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter-btn");
      setActiveFilter(filter);
    });
  });

  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      const filter = this.getAttribute("data-select-item");
      setActiveFilter(filter);
      selectValue.textContent = this.textContent;
    });
  });

  function setActiveFilter(filter) {
    filterButtons.forEach(button => button.classList.remove("active"));
    document.querySelector(`[data-filter-btn="${filter}"]`).classList.add("active");

    filterItems.forEach(item => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  setActiveFilter("all");
});

// function SendMail(){
//   let parms = {
//     name: document.getElementById("name").value,
//     email: document.getElementById("email").value,
//     subject: document.getElementById("subject").value,
//     message: document.getElementById("message").value,
//   }
//   emailjs.send("service_5bvm5fc","template_57rl6su",parms).then(alert("Email Sent!!"))
// }

function SendMail(event){
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  if (!name || !email || !subject || !message) {
    showNotification("Please fill out all fields.", true);
    return;
  }

  let params = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  }

  emailjs.send("service_5bwsre", "template_57bswe", params)
    .then(function(response) {
      showNotification("Email sent successfully!", false);
      setTimeout(function() {
        document.getElementById('contactForm').reset(); // Reset form
        window.location.reload(); // Refresh page after 2 seconds
      }, 2000); // Adjust the delay as needed
    }, function(error) {
      showNotification("Failed to send email.", true);
    });
}

document.getElementById('contactForm').addEventListener('submit', SendMail);

function showNotification(message, isError) {
  let notification = document.getElementById("notification");
  let notificationMessage = document.getElementById("notification-message");

  notificationMessage.textContent = message;
  notification.classList.remove("hidden", "error", "visible");

  if (isError) {
    notification.classList.add("error");
  }

  notification.classList.add("visible");

  setTimeout(function() {
    notification.classList.remove("visible");
    notification.classList.add("hidden");
  }, 3000);
}


// let link = document.createElement('link');
// link.type ='text/css';
// link.rel='stylesheet';
// link.href ='./assets/css/style.css';

// document.querySelector('head').appendChild(link);