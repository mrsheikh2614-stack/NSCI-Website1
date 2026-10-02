const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#siteNav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("#siteNav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const form = document.querySelector("#joinForm");
const message = document.querySelector("#formMessage");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  // Demo-safe front-end behavior. Connect this form to your preferred
  // private form/database service before using it for real submissions.
  console.log("NSCI Join Request:", data);

  message.textContent =
    "Thank you! Your join request has been prepared. The admin form/database connection can be added here.";
  form.reset();
});
