// ============================================
// NSCI WEBSITE - FIREBASE JOIN FORM
// ============================================

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from
  "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";


// ============================================
// FIREBASE CONFIG
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyD19geHvj7nvYz3Qk_MkW10taFMa-0xr98",
  authDomain: "national-student.firebaseapp.com",
  projectId: "national-student",
  storageBucket: "national-student.firebasestorage.app",
  messagingSenderId: "691466453066",
  appId: "1:691466453066:web:6845dfbfa06171d7b3e6b3"
};


// ============================================
// START FIREBASE
// ============================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ============================================
// WEBSITE
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // MOBILE MENU
  // ==========================================

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


  // ==========================================
  // JOIN FORM
  // ==========================================

  const joinForm = document.querySelector(
    "#joinForm, #join-form, form[data-join-form]"
  );

  if (!joinForm) {
    console.error("NSCI: Join form not found.");
    return;
  }


  // ==========================================
  // FORM MESSAGE
  // ==========================================

  let formMessage = document.querySelector("#formMessage");

  if (!formMessage) {

    formMessage = document.createElement("p");

    formMessage.id = "formMessage";

    formMessage.setAttribute("role", "status");

    formMessage.style.marginTop = "15px";

    formMessage.style.fontWeight = "600";

    joinForm.appendChild(formMessage);

  }


  // ==========================================
  // FORM SUBMIT
  // ==========================================

  joinForm.addEventListener("submit", async (event) => {

    event.preventDefault();
    event.stopPropagation();


    // ========================================
    // GET INPUTS
    // ========================================

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


    // ========================================
    // READ VALUES
    // ========================================

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


    // ========================================
    // CLEAR OLD MESSAGE
    // ========================================

    formMessage.textContent = "";

    formMessage.style.display = "none";

    formMessage.style.color = "";


    // ========================================
    // NAME VALIDATION
    // ========================================

    if (!name) {

      formMessage.textContent =
        "Please enter your name.";

      formMessage.style.display = "block";

      formMessage.style.color = "red";

      if (nameInput) {
        nameInput.focus();
      }

      return;

    }


    // ========================================
    // PHONE VALIDATION
    // ========================================

    if (!phone) {

      formMessage.textContent =
        "Please enter your phone number.";

      formMessage.style.display = "block";

      formMessage.style.color = "red";

      if (phoneInput) {
        phoneInput.focus();
      }

      return;

    }


    // ========================================
    // PHONE FORMAT
    // ========================================

    const cleanPhone = phone.replace(/[^\d+]/g, "");

    if (cleanPhone.length < 10) {

      formMessage.textContent =
        "Please enter a valid phone number.";

      formMessage.style.display = "block";

      formMessage.style.color = "red";

      if (phoneInput) {
        phoneInput.focus();
      }

      return;

    }


    // ========================================
    // EMAIL VALIDATION
    // ========================================

    if (!email) {

      formMessage.textContent =
        "Please enter your email address.";

      formMessage.style.display = "block";

      formMessage.style.color = "red";

      if (emailInput) {
        emailInput.focus();
      }

      return;

    }


    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

      formMessage.textContent =
        "Please enter a valid email address.";

      formMessage.style.display = "block";

      formMessage.style.color = "red";

      if (emailInput) {
        emailInput.focus();
      }

      return;

    }


    // ========================================
    // SUBMIT BUTTON
    // ========================================

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


    // ========================================
    // SAVE TO FIRESTORE
    // ========================================

    try {

      const docRef = await addDoc(
        collection(db, "join_requests"),
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
        "NSCI: Join request saved successfully:",
        docRef.id
      );


      // ======================================
      // SUCCESS MESSAGE
      // ======================================

      formMessage.textContent =
        "Thank you for joining NSCI! 🎉 Your join request has been submitted successfully.";

      formMessage.style.display = "block";

      formMessage.style.color = "green";


      // ======================================
      // CLEAR FORM
      // ======================================

      joinForm.reset();


      // ======================================
      // KEEP USER ON JOIN SECTION
      // ======================================

      history.replaceState(
        null,
        "",
        window.location.pathname +
        window.location.search +
        "#join"
      );


    } catch (error) {

      console.error(
        "NSCI Firebase error:",
        error
      );


      // ======================================
      // ERROR MESSAGE
      // ======================================

      formMessage.textContent =
        "Sorry, your request could not be submitted. Please try again.";

      formMessage.style.display = "block";

      formMessage.style.color = "red";

    }


    // ========================================
    // RESTORE BUTTON
    // ========================================

    if (submitButton) {

      submitButton.disabled = false;

      if (submitButton.tagName === "INPUT") {

        submitButton.value = originalText;

      } else {

        submitButton.textContent = originalText;

      }

    }

  });


  // ==========================================
  // FIREBASE CONNECTION CHECK
  // ==========================================

  console.log(
    "NSCI Website connected to Firebase:",
    app.options.projectId
  );

});
