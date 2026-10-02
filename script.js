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
  apiKey: "AIzaSyD19ghvj7NyV3zqk_MKW10taFM-0xr98",
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

  // ----------------------------------------
  // MOBILE MENU
  // ----------------------------------------

  const menuButton = document.querySelector(
    ".menu-btn, .menu-toggle, #menuBtn, #menuToggle"
  );

  const navigation = document.querySelector(
    ".nav-links, .navigation, #navLinks, #mobileMenu"
  );

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      navigation.classList.toggle("active");
    });
  }


  // ----------------------------------------
  // JOIN FORM
  // ----------------------------------------

  const joinForm = document.querySelector(
    "#joinForm, #join-form, form[data-join-form]"
  );

  if (!joinForm) {
    console.log("NSCI: Join form not found.");
    return;
  }


  // ----------------------------------------
  // FORM SUBMIT
  // ----------------------------------------

  joinForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    // --------------------------------------
    // GET INPUTS
    // --------------------------------------

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


    const name = nameInput
      ? nameInput.value.trim()
      : "";

    const phone = phoneInput
      ? phoneInput.value.trim()
      : "";

    const email = emailInput
      ? emailInput.value.trim()
      : "";


    // --------------------------------------
    // VALIDATION
    // --------------------------------------

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (!phone) {
      alert("Please enter your phone number.");
      return;
    }

    if (!email) {
      alert("Please enter your email address.");
      return;
    }


    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }


    // --------------------------------------
    // BUTTON
    // --------------------------------------

    const submitButton =
      joinForm.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

    const originalText =
      submitButton
        ? submitButton.textContent
        : "Join Us";


    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }


    // --------------------------------------
    // SEND TO FIRESTORE
    // --------------------------------------

    try {

      await addDoc(
        collection(db, "Join request"),
        {
          name: name,
          phone: phone,
          email: email,

          status: "new",

          source: "NSCI Website",

          submittedAt: serverTimestamp()
        }
      );


      // ------------------------------------
      // SUCCESS
      // ------------------------------------

      alert(
        "Thank you for joining NSCI!\n\n" +
        "Your request has been submitted successfully."
      );

      joinForm.reset();


    } catch (error) {

      console.error(
        "NSCI Firebase error:",
        error
      );

      alert(
        "Your request could not be submitted.\n\n" +
        "Please try again."
      );

    } finally {

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent =
          originalText || "Join Us";
      }

    }

  });

});


// ==========================================
// CONNECTION CHECK
// ==========================================

console.log(
  "NSCI Website connected to Firebase:",
  app.options.projectId
);
