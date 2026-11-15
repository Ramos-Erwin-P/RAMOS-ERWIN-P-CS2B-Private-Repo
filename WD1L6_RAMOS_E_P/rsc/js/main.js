// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle (uses Bootstrap's .collapse / .show classes from the CSS)
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("show");
  toggle.setAttribute("aria-expanded", String(open));
});

// Highlight the nav link for the section currently in view
// Will highlight even through scrolling
// Not limited to just clicking the nav links
const navAnchors = links.querySelectorAll("a");
const sections = [...navAnchors]
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => observer.observe(s));

// Contact form: validate, then open the visitor's email app with the message filled in.
// Does not actually work since this is a static site. No services are used.
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const MY_EMAIL = "erwinramos709@gmail.com";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.classList.add("was-validated");

  if (!form.checkValidity()) {
    formStatus.textContent = "Fix the highlighted fields and try again.";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent("Message from " + name);
  const body = encodeURIComponent(message + "\n\nReply to: " + email);
  window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;

  formStatus.textContent = "Opening your email app...";
  form.reset();
  form.classList.remove("was-validated");
});
