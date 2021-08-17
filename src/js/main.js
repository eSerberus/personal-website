/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== TYPING TEXT ====================*/
const textes = document.querySelectorAll(".typewriter span");
let prevText = textes[textes.length - 1];
let i = 0;

animate();
setInterval((_) => animate(), 6000);

function animate() {
  let index = i++ % textes.length;

  prevText.style.display = "none";
  textes[index].style.display = "block";

  prevText = textes[index];
}

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((e) => {
  e.addEventListener("click", toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    // remove active class each tabContent add active to target
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    // remove active class each tabs add active to target
    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
    // end of the tab
  });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");

  if (this.scrollY >= 150) {
    nav.classList.add("scroll-header");
  } else {
    nav.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-up");

  if (this.scrollY >= 560) {
    scrollTop.classList.add("show-scroll");
  } else {
    scrollTop.classList.remove("show-scroll");
  }
}

window.addEventListener("scroll", scrollTop);

/*==================== MOUSE MOVE ANIMATION ====================*/
const cursor = document.querySelector(".cursor");
// const cursor2 = document.querySelector(".cursor-2");

const mouseMove = (e) => {
  cursor.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
};
window.addEventListener("mousemove", mouseMove);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "uil-sun";

// previously selected topic(if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "light" : "dark";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// Validate if the user previously choose a topic
if (selectedTheme) {
  document.body.classList[selectedTheme === "light" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with theme button
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);

  // Save the theme and current icon that the user choose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// ==================== Email js ==================== //
(function () {
  emailjs.init("user_d2kmjdu9H4v67TMtQkObS");
})();

function resetForm(params) {
  let inputs = document.querySelectorAll("input");
  let textArea = document.querySelectorAll("textarea");
  inputs.forEach((input) => (input.value = ""));
  textArea.forEach((textArea) => (textArea.value = ""));
}

function sendMail() {
  let fullName = document.getElementById("name").value;
  let userEmail = document.getElementById("email").value;
  let userProject = document.getElementById("project");
  let userMessage = document.getElementById("message").value;

  var contactParams = {
    from_name: fullName,
    from_email: userEmail,
    project: userProject,
    message: userMessage,
  };
  emailjs
    .send("service_825jig9", "template_ifqgbxx", contactParams)
    .then(function (res) {});
}

//  ==================== Form submission and validation ==================== //
const form = document.getElementById("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const project = document.getElementById("project");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkValues();
  checkInputs();
});

const checkInputs = () => {
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const projectValue = project.value.trim();
  const messageValue = message.value.trim();

  if (fullNameValue == "" || fullNameValue == null) {
    setErrorFor(fullName, "Name cannot be blank");
  } else {
    setSuccessFor(fullName);
  }

  if (emailValue == "" || emailValue == null) {
    setErrorFor(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
  } else {
    setSuccessFor(email);
  }

  if (projectValue == "" || projectValue == null) {
    setErrorFor(project, "Project cannot be blank");
  } else if (projectValue.length <= 4) {
    setErrorFor(project, "Project name should be more than 4 letters");
  } else {
    setSuccessFor(project);
  }

  if (messageValue == "" || messageValue == null) {
    setErrorFor(message, "Project cannot be blank");
  } else if (messageValue.length <= 10) {
    setErrorFor(message, "Description should be more than 10 letters");
  } else {
    setSuccessFor(message);
  }
};

// set error function
const setErrorFor = (input, message) => {
  const contactContent = input.parentNode;
  const small = contactContent.querySelector("small");

  // add error message inside small tag
  small.innerText = message;

  // add error class
  contactContent.className = "contact__content error";
};

// set success function
const setSuccessFor = (input) => {
  const contactContent = input.parentNode;
  contactContent.className = "contact__content successful";
};

const isEmail = (email) => {
  return /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(
    email
  );
};

const checkValues = () => {
  if (
    fullName.value == "" ||
    fullName.value == null ||
    email.value == "" ||
    email.value == null ||
    !isEmail(email.value) ||
    project.value == "" ||
    project.value == null ||
    project.value.length <= 4 ||
    message.value.length <= 4
  ) {
    return null;
  } else {
    const sendButton = document.getElementById("sendButton");
    sendButton.classList.add("active");

    setTimeout(() => {
      sendButton.classList.add("success");
    }, 2770);

    setTimeout(() => {
      sendButton.classList.remove("active");
      sendButton.classList.remove("success");
      resetForm();
    }, 5000);

    sendMail();
  }
};

/*==================== SCROLL REVEAL ANIMATION ====================*/
// **Animation Top
const srTop = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 2000,
  reset: true,
});

srTop.reveal(
  `.home__data, .home__image, .home__social, .services__content, .project__title, .testimonial__container  `,
  {
    interval: 200,
  }
);

// **Animation Bottom
const stBottom = ScrollReveal({
  origin: "bottom",
  distance: "40px",
  duration: 3000,
  reset: true,
});

stBottom.reveal(`.portfolio__container, .footer__bg`, {
  interval: 100,
});

// **Animation Left
const srLeft = ScrollReveal({
  origin: "left",
  distance: "30px",
  duration: 3000,
  reset: true,
});

srLeft.reveal(
  `.about-images, .skills__container, .project__description, .contact__information`,
  {
    interval: 100,
  }
);

// **Animation Right
const srRight = ScrollReveal({
  origin: "right",
  distance: "40px",
  duration: 3000,
  reset: true,
});

srRight.reveal(
  `.about__data, .qualification__container, .project__btn,.contact__form`,
  {
    interval: 100,
  }
);
