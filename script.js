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
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "national-student.firebaseapp.com",
  projectId: "national-student",
  storageBucket: "national-student.firebasestorage.app",
  messagingSenderId: "691466453066",
  appId: "YOUR_ACTUAL_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ==========================================
// PAGE
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
    menuButton.addEventListener("click", (e) => {
      e.preventDefault();
      navigation.classList.toggle("active");
    });
  }


  // ----------------------------------------
  // FIND JOIN FORM
  // ----------------------------------------

  const joinForm = document.querySelector(
    "#joinForm, #join-form, form[data-join-form]"
  );

  if (!joinForm) {
    console.log("NSCI: Join form not found.");
    return;
  }


  // ========================================
  // JOIN FORM SUBMIT
  // ========================================

  joinForm.addEventListener("submit", async (event) => {

    // VERY IMPORTANT:
    // Stop normal HTML form submission
    event.preventDefault();
    event.stopPropagation();

    console.log("NSCI: Join form submitted");


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


    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";


    // --------------------------------------
    // VALIDATION
    // --------------------------------------

    if (!name) {
      alert("Please enter your name.");
      if (nameInput) nameInput.focus();
      return;
    }

    if (!phone) {
      alert("Please enter your phone number.");
      if (phoneInput) phoneInput.focus();
      return;
    }

    if (!email) {
      alert("Please enter your email address.");
      if (emailInput) emailInput.focus();
      return;
    }


    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      if (emailInput) emailInput.focus();
      return;
    }


    // --------------------------------------
    // SUBMIT BUTTON
    // --------------------------------------

    const submitButton = joinForm.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

    let originalText = "Join Us";

    if (submitButton) {

      originalText =
        submitButton.tagName === "INPUT"
          ? submitButton.value
          : submitButton.textContent;

      submitButton.disabled = true;

      if (submitButton.tagName === "INPUT") {
        submitButton.value = "Submitting...";
      } else {
        submitButton.textContent = "Submitting...";
      }
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
          status: "new",
          source: "NSCI Website",
          submittedAt: serverTimestamp()
        }
      );


      console.log(
        "NSCI: Join request saved successfully:",
        docRef.id
      );


      // ------------------------------------
      // SUCCESS MESSAGE
      // ------------------------------------

      alert(
        "Thank you for joining NSCI! 🎉\n\n" +
        "Your join request has been submitted successfully."
      );


      // Clear form
      joinForm.reset();


    } catch (error) {

      console.error(
        "NSCI Firebase error:",
        error
      );

      alert(
        "Something went wrong while submitting your request.\n\n" +
        "Please try again."
      );

    } finally {

      // ------------------------------------
      // RESTORE BUTTON
      // ------------------------------------

      if (submitButton) {

        submitButton.disabled = false;

        if (submitButton.tagName === "INPUT") {
          submitButton.value = originalText;
        } else {
          submitButton.textContent = originalText;
        }

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
