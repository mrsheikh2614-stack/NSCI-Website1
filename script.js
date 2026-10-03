// ==========================================
// NSCI WEBSITE - FIREBASE JOIN FORM
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {
  apiKey: "AIzaSyD19gehVj7nYvZ3qk_MKW10taFMa-0xr98",
  authDomain: "national-student.firebaseapp.com",
  projectId: "national-student",
  storageBucket: "national-student.firebasestorage.app",
  messagingSenderId: "691466453066",
  appId: "1:691466453066:web:6845dfbfa06171d7b3e6b3"
};


// ==========================================
// START FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ==========================================
// WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // MOBILE MENU
  // ========================================

  const menuButton = document.querySelector(
    ".menu-btn, .menu-toggle, #menuBtn, #menuToggle"
  );

  const navigation = document.querySelector(
    ".nav-links, .navigation, #navLinks, #mobileMenu"
  );

  if (menuButton && navigation) {

    menuButton.addEventListener("click", (event) => {

      event.preventDefault();

      navigation.classList.toggle("active");

      menuButton.setAttribute(
        "aria-expanded",
        navigation.classList.contains("active")
      );

    });

  }


  // ========================================
  // JOIN FORM
  // ========================================

  const joinForm = document.querySelector(
    "#joinForm, #join-form, form[data-join-form]"
  );

  if (!joinForm) {

    console.log("NSCI: Join form not found.");

    return;

  }


  // ========================================
  // FORM MESSAGE
  // ========================================

  let formMessage = document.querySelector("#formMessage");

  // If message element doesn't exist, create one
  if (!formMessage) {

    formMessage = document.createElement("p");

    formMessage.id = "formMessage";

    formMessage.setAttribute("role", "status");

    formMessage.style.marginTop = "15px";

    formMessage.style.fontWeight = "600";

    joinForm.appendChild(formMessage);

  }


  // ========================================
  // JOIN FORM SUBMIT
  // ========================================

  joinForm.addEventListener(
    "submit",
    async (event) => {

      // VERY IMPORTANT:
      // Stop normal HTML form submission
      // so page does NOT jump/reload.

      event.preventDefault();
      event.stopPropagation();

      // Clear old message

      formMessage.textContent = "";

      formMessage.style.display = "none";


      // ======================================
      // GET INPUTS
      // ======================================

      const nameInput =
        joinForm.querySelector("#name") ||
        joinForm.querySelector("#fullName") ||
        joinForm.querySelector('input[name="name"]') ||
        joinForm.querySelector('input[name="fullName"]');


      const phoneInput =
        joinForm.querySelector("#phone") ||
        joinForm.querySelector("#mobile") ||
        joinForm.querySelector('input[name="phone"]') ||
        joinForm.querySelector('input[name="mobile"]');


      const emailInput =
        joinForm.querySelector("#email") ||
        joinForm.querySelector('input[name="email"]');


      const locationInput =
        joinForm.querySelector("#location") ||
        joinForm.querySelector("#city") ||
        joinForm.querySelector('input[name="location"]') ||
        joinForm.querySelector('input[name="city"]');


      const name = nameInput
        ? nameInput.value.trim()
        : "";


      const phone = phoneInput
        ? phoneInput.value.trim()
        : "";


      const email = emailInput
        ? emailInput.value.trim()
        : "";


      const location = locationInput
        ? locationInput.value.trim()
        : "";


      // ======================================
      // VALIDATION
      // ======================================

      if (!name) {

        formMessage.textContent =
          "Please enter your name.";

        formMessage.style.display = "block";

        nameInput?.focus();

        return;

      }


      if (!phone) {

        formMessage.textContent =
          "Please enter your phone number.";

        formMessage.style.display = "block";

        phoneInput?.focus();

        return;

      }


      if (!email) {

        formMessage.textContent =
          "Please enter your email address.";

        formMessage.style.display = "block";

        emailInput?.focus();

        return;

      }


      // ======================================
      // EMAIL VALIDATION
      // ======================================

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (!emailPattern.test(email)) {

        formMessage.textContent =
          "Please enter a valid email address.";

        formMessage.style.display = "block";

        emailInput?.focus();

        return;

      }


      // ======================================
      // SUBMIT BUTTON
      // ======================================

      const submitButton =
        joinForm.querySelector(
          'button[type="submit"], input[type="submit"]'
        );


      let originalText = "Submit Join Request";


      if (submitButton) {

        if (submitButton.tagName === "INPUT") {

          originalText =
            submitButton.value || originalText;

          submitButton.value = "Submitting...";

        } else {

          originalText =
            submitButton.textContent || originalText;

          submitButton.textContent = "Submitting...";

        }

        submitButton.disabled = true;

      }


      // ======================================
      // SAVE TO FIRESTORE
      // ======================================

      try {

        const docRef = await addDoc(
          collection(db, "Join request"),
          {

            name: name,

            phone: phone,

            email: email,

            location: location,

            status: "new",

            source: "NSCI Website",

            submittedAt: serverTimestamp()

          }
        );


        console.log(
          "NSCI Join request saved successfully:",
          docRef.id
        );


        // ====================================
        // SUCCESS MESSAGE
        // ====================================

        formMessage.textContent =
          "Thank you for joining NSCI! 🎉 Your join request has been submitted successfully.";

        formMessage.style.display = "block";

        formMessage.style.color = "green";


        // Clear form

        joinForm.reset();


        // Keep user on the Join section
        // without jumping to top

        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search + "#join"
        );


      } catch (error) {

        console.error(
          "NSCI Firebase error:",
          error
        );


        // ====================================
        // ERROR MESSAGE
        // ====================================

        formMessage.textContent =
          "Sorry, your request could not be submitted. Please try again.";

        formMessage.style.display = "block";

        formMessage.style.color = "red";

      }


      // ======================================
      // RESTORE BUTTON
      // ======================================

      if (submitButton) {

        submitButton.disabled = false;


        if (submitButton.tagName === "INPUT") {

          submitButton.value = originalText;

        } else {

          submitButton.textContent = originalText;

        }

      }

    },
    true
  );


  console.log(
    "NSCI: Join form is ready."
  );

});


// ==========================================
// FIREBASE CONNECTION CHECK
// ==========================================

console.log(
  "NSCI Website connected to Firebase:",
  app.options.projectId
);
