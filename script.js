// ============================================
// NSCI WEBSITE - FIREBASE JOIN FORM
// FINAL SCRIPT.JS
// ============================================


// ============================================
// FIREBASE APP
// ============================================

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";


// ============================================
// FIRESTORE
// ============================================

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

  apiKey: "AIzaSyD19geihv7nYy23QK_MkW10taFMa-0xr98",

  authDomain:
    "national-student.firebaseapp.com",

  projectId:
    "national-student",

  storageBucket:
    "national-student.firebasestorage.app",

  messagingSenderId:
    "691466453066",

  appId:
    "1:691466453066:web:6845dfbfa06171d7db3e6b3"

};


// ============================================
// START FIREBASE
// ============================================

const app =
  initializeApp(firebaseConfig);

const db =
  getFirestore(app);


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


    if (
      menuButton &&
      navigation
    ) {

      menuButton.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

          navigation.classList.toggle(
            "active"
          );


          menuButton.setAttribute(
            "aria-expanded",
            navigation.classList.contains(
              "active"
            )
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
    // SHOW MESSAGE FUNCTION
    // ========================================

    function showMessage(
      message,
      color = "red"
    ) {

      formMessage.textContent =
        message;


      formMessage.style.display =
        "block";


      formMessage.style.color =
        color;

    }


    // ========================================
    // HIDE MESSAGE FUNCTION
    // ========================================

    function hideMessage() {

      formMessage.textContent =
        "";


      formMessage.style.display =
        "none";


      formMessage.style.color =
        "";

    }


    // ========================================
    // JOIN FORM SUBMIT
    // ========================================

    joinForm.addEventListener(
      "submit",
      async (event) => {


        // ====================================
        // STOP NORMAL FORM SUBMISSION
        // ====================================

        event.preventDefault();

        event.stopPropagation();


        // ====================================
        // CLEAR OLD MESSAGE
        // ====================================

        hideMessage();


        // ====================================
        // GET NAME INPUT
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


        // ====================================
        // GET PHONE INPUT
        // ====================================

        const phoneInput =
          joinForm.querySelector("#phone") ||

          joinForm.querySelector("#mobile") ||

          joinForm.querySelector(
            'input[name="phone"]'
          ) ||

          joinForm.querySelector(
            'input[name="mobile"]'
          );


        // ====================================
        // GET EMAIL INPUT
        // ====================================

        const emailInput =
          joinForm.querySelector("#email") ||

          joinForm.querySelector(
            'input[name="email"]'
          );


        // ====================================
        // GET LOCATION INPUT
        // ====================================

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
            "NSCI: Required form input missing."
          );


          showMessage(
            "Something is wrong with the registration form. Please try again."
          );


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
        // NAME VALIDATION
        // ====================================

        if (!name) {

          showMessage(
            "Please enter your full name."
          );


          nameInput.focus();

          return;

        }


        if (name.length < 2) {

          showMessage(
            "Please enter a valid full name."
          );


          nameInput.focus();

          return;

        }


        // ====================================
        // PHONE REQUIRED
        // ====================================

        if (!phone) {

          showMessage(
            "Please enter your phone number."
          );


          phoneInput.focus();

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

          showMessage(
            "Please enter a valid phone number."
          );


          phoneInput.focus();

          return;

        }


        // ====================================
        // EMAIL REQUIRED
        // ====================================

        if (!email) {

          showMessage(
            "Please enter your email address."
          );


          emailInput.focus();

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

          showMessage(
            "Please enter a valid email address."
          );


          emailInput.focus();

          return;

        }


        // ====================================
        // LOCATION REQUIRED
        // ====================================

        if (!location) {

          showMessage(
            "Please enter your city or district."
          );


          locationInput.focus();

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


        // ====================================
        // DISABLE BUTTON
        // ====================================

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
              submitButton.textContent.trim() ||
              originalText;


            submitButton.textContent =
              "Submitting...";

          }


          submitButton.disabled =
            true;

        }


        // ====================================
        // SAVE DATA TO FIRESTORE
        // ====================================

        try {

          const docRef =
            await addDoc(
              collection(
                db,
                "join_requests"
              ),
              {

                // Member information
                name: name,

                phone: phone,

                email: email,

                location: location,


                // Registration status
                status: "new",


                // Website source
                source:
                  "NSCI Website",


                // Server time
                submittedAt:
                  serverTimestamp()

              }
            );


          // ==================================
          // SUCCESS LOG
          // ==================================

          console.log(
            "NSCI: Registration saved successfully."
          );


          console.log(
            "Document ID:",
            docRef.id
          );


          // ==================================
          // REDIRECT TO THANK YOU PAGE
          // ==================================

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


          // ==================================
          // ERROR CODE
          // ==================================

          if (
            error &&
            error.code
          ) {

            console.error(
              "Firebase error code:",
              error.code
            );

          }


          // ==================================
          // USER MESSAGE
          // ==================================

          let errorMessage =
            "Sorry, your request could not be submitted. Please try again.";


          // ==================================
          // SPECIFIC FIRESTORE ERRORS
          // ==================================

          if (
            error.code ===
            "permission-denied"
          ) {

            errorMessage =
              "Registration is temporarily unavailable. Please try again later.";

          }


          if (
            error.code ===
            "unavailable"
          ) {

            errorMessage =
              "Internet connection problem. Please check your connection and try again.";

          }


          if (
            error.code ===
            "failed-precondition"
          ) {

            errorMessage =
              "Firebase setup is incomplete. Please contact the administrator.";

          }


          if (
            error.code ===
            "invalid-argument"
          ) {

            errorMessage =
              "Some registration information is invalid. Please check the form.";

          }


          showMessage(
            errorMessage
          );

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
