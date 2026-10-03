// ============================================
// NSCI WEBSITE - FIREBASE JOIN FORM
// ============================================

// Firebase App
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

// Firestore
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

// IMPORTANT:
// Keep your EXISTING Firebase config here.
// Do NOT change your projectId, appId, etc.

const firebaseConfig = {

  apiKey: "AIzaSyD19geihv7nYy23QK_MkW10taFMa-0xr98",
authDomain: "national-student.firebaseapp.com",
projectId: "national-student",
storageBucket: "national-student.firebasestorage.app",
messagingSenderId: "691466453066",
appId: "1:691466453066:web:6845dfbfa06171d7db3e6b3"
};


// ============================================
// START FIREBASE
// ============================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ============================================
// PAGE READY
// ============================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    // ========================================
    // MOBILE MENU
    // ========================================

    const menuButton =
      document.querySelector(
        ".menu-btn, .menu-toggle, #menuBtn, #menuToggle"
      );

    const navigation =
      document.querySelector(
        ".nav-links, .navigation, #navLinks, #mobileMenu"
      );


    if (menuButton && navigation) {

      menuButton.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

          navigation.classList.toggle("active");

          menuButton.setAttribute(
            "aria-expanded",
            navigation.classList.contains("active")
          );

        }
      );

    }


    // ========================================
    // FIND JOIN FORM
    // ========================================

    const joinForm =
      document.querySelector(
        "#joinForm, #join-form, form[data-join-form]"
      );


    if (!joinForm) {

      console.error(
        "NSCI: Join form not found."
      );

      return;
    }


    // ========================================
    // FORM MESSAGE
    // ========================================

    let formMessage =
      document.querySelector(
        "#formMessage"
      );


    if (!formMessage) {

      formMessage =
        document.createElement("p");

      formMessage.id =
        "formMessage";

      formMessage.setAttribute(
        "role",
        "status"
      );

      formMessage.style.marginTop =
        "15px";

      formMessage.style.fontWeight =
        "600";

      joinForm.appendChild(
        formMessage
      );

    }


    // ========================================
    // JOIN FORM SUBMIT
    // ========================================

    joinForm.addEventListener(
      "submit",
      async (event) => {

        // IMPORTANT:
        // Stop normal HTML form submission
        event.preventDefault();
        event.stopPropagation();


        // ====================================
        // CLEAR OLD MESSAGE
        // ====================================

        formMessage.textContent = "";

        formMessage.style.display =
          "none";

        formMessage.style.color =
          "";


        // ====================================
        // GET INPUTS
        // ====================================

        const nameInput =
          joinForm.querySelector("#name") ||
          joinForm.querySelector("#fullName") ||
          joinForm.querySelector(
            'input[name="name"]'
          ) ||
          joinForm.querySelector(
            'input[name="fullName"]'
          );


        const phoneInput =
          joinForm.querySelector("#phone") ||
          joinForm.querySelector("#mobile") ||
          joinForm.querySelector(
            'input[name="phone"]'
          ) ||
          joinForm.querySelector(
            'input[name="mobile"]'
          );


        const emailInput =
          joinForm.querySelector("#email") ||
          joinForm.querySelector(
            'input[name="email"]'
          );


        const locationInput =
          joinForm.querySelector("#location") ||
          joinForm.querySelector("#city") ||
          joinForm.querySelector(
            'input[name="location"]'
          ) ||
          joinForm.querySelector(
            'input[name="city"]'
          );


        // ====================================
        // CHECK INPUTS
        // ====================================

        if (
          !nameInput ||
          !phoneInput ||
          !emailInput ||
          !locationInput
        ) {

          console.error(
            "NSCI: One or more form inputs were not found."
          );

          formMessage.textContent =
            "Something is wrong with the registration form. Please try again.";

          formMessage.style.display =
            "block";

          formMessage.style.color =
            "red";

          return;
        }


        // ====================================
        // GET VALUES
        // ====================================

        const name =
          nameInput.value.trim();

        const phone =
          phoneInput.value.trim();

        const email =
          emailInput.value.trim();

        const location =
          locationInput.value.trim();


        // ====================================
        // REQUIRED VALIDATION
        // ====================================

        if (!name) {

          formMessage.textContent =
            "Please enter your full name.";

          formMessage.style.display =
            "block";

          formMessage.style.color =
            "red";

          nameInput.focus();

          return;
        }


        if (!phone) {

          formMessage.textContent =
            "Please enter your phone number.";

          formMessage.style.display =
            "block";

          formMessage.style.color =
            "red";

          phoneInput.focus();

          return;
        }


        if (!email) {

          formMessage.textContent =
            "Please enter your email address.";

          formMessage.style.display =
            "block";

          formMessage.style.color =
            "red";

          emailInput.focus();

          return;
        }


        if (!location) {

          formMessage.textContent =
            "Please enter your city or district.";

          formMessage.style.display =
            "block";

          formMessage.style.color =
            "red";

          locationInput.focus();

          return;
        }


        // ====================================
        // EMAIL VALIDATION
        // ====================================

        const emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
          !emailPattern.test(email)
        ) {

          formMessage.textContent =
            "Please enter a valid email address.";

          formMessage.style.display =
            "block";

          formMessage.style.color =
            "red";

          emailInput.focus();

          return;
        }


        // ====================================
        // PHONE VALIDATION
        // ====================================

        const phoneDigits =
          phone.replace(
            /[\s()-]/g,
            ""
          );


        if (
          !/^\+?[0-9]{10,15}$/.test(
            phoneDigits
          )
        ) {

          formMessage.textContent =
            "Please enter a valid phone number.";

          formMessage.style.display =
            "block";

          formMessage.style.color =
            "red";

          phoneInput.focus();

          return;
        }


        // ====================================
        // SUBMIT BUTTON
        // ====================================

        const submitButton =
          joinForm.querySelector(
            'button[type="submit"], input[type="submit"]'
          );


        let originalText =
          "Submit Join Request";


        if (submitButton) {

          if (
            submitButton.tagName ===
            "INPUT"
          ) {

            originalText =
              submitButton.value ||
              originalText;

            submitButton.value =
              "Submitting...";

          } else {

            originalText =
              submitButton.textContent ||
              originalText;

            submitButton.textContent =
              "Submitting...";

          }


          submitButton.disabled =
            true;

        }


        // ====================================
        // SAVE TO FIRESTORE
        // ====================================

        try {

          const docRef =
            await addDoc(
              collection(
                db,
                "join_requests"
              ),
              {

                name: name,

                phone: phone,

                email: email,

                location: location,

                status: "new",

                source: "NSCI Website",

                submittedAt:
                  serverTimestamp()

              }
            );


          console.log(
            "NSCI: Join request saved successfully:",
            docRef.id
          );


          // ==================================
          // SUCCESS
          // ==================================

          /*
           * Firebase save successful.
           * Now redirect to Thank You page.
           */

          window.location.href =
            "thank-you.html";


        } catch (error) {

          // ==================================
          // FIREBASE ERROR
          // ==================================

          console.error(
            "NSCI Firebase error:",
            error
          );


          formMessage.textContent =
            "Sorry, your request could not be submitted. Please try again.";


          formMessage.style.display =
            "block";


          formMessage.style.color =
            "red";


          // More useful debugging
          if (error && error.code) {

            console.error(
              "Firebase error code:",
              error.code
            );

          }

        } finally {

          // ==================================
          // RESTORE BUTTON
          // ==================================

          if (submitButton) {

            submitButton.disabled =
              false;


            if (
              submitButton.tagName ===
              "INPUT"
            ) {

              submitButton.value =
                originalText;

            } else {

              submitButton.textContent =
                originalText;

            }

          }

        }

      }
    );


    // ========================================
    // FIREBASE CONNECTION CHECK
    // ========================================

    console.log(
      "NSCI Website connected to Firebase:",
      app.options.projectId
    );

  }
); 
