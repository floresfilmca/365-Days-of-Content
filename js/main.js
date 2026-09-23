// Drywall365 — Landing Page JS
// Vanilla JS only, no dependencies, no external requests other than fonts (in <head>).

(function () {
  "use strict";

  // ---- Footer year ----
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---- FAQ accordion ----
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // Close all other items (single-open accordion)
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // ---- Checkout link ----
  // Swap data-checkout-url to your real Lemon Squeezy (or Stripe) checkout URL
  // once your product is live. Every button/link with class "js-checkout"
  // or id "checkout-link" will be wired up automatically.
  var checkoutTriggers = document.querySelectorAll("#checkout-link, .js-checkout");
  checkoutTriggers.forEach(function (el) {
    var url = el.getAttribute("data-checkout-url");
    if (url && url.indexOf("REPLACE_WITH") === -1) {
      el.setAttribute("href", url);
    }
  });

  // ---- Contact form (Web3Forms) ----
  // Sends the form via fetch so the visitor never leaves the page.
  // Requires a free access key from https://web3forms.com pasted into the
  // hidden "access_key" input in index.html.
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    var statusEl = contactForm.querySelector(".form-status");
    var submitBtn = contactForm.querySelector("button[type='submit']");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var accessKey = contactForm.querySelector("input[name='access_key']").value;
      if (!accessKey || accessKey.indexOf("YOUR_WEB3FORMS") !== -1) {
        statusEl.textContent = "Form isn't fully set up yet — add your Web3Forms access key.";
        statusEl.className = "form-status error";
        return;
      }

      var originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      statusEl.textContent = "";
      statusEl.className = "form-status";

      fetch(contactForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            statusEl.textContent = "Thanks! Your message has been sent — we'll get back to you soon.";
            statusEl.className = "form-status success";
            contactForm.reset();
          } else {
            statusEl.textContent = "Something went wrong. Please try again or email us directly.";
            statusEl.className = "form-status error";
          }
        })
        .catch(function () {
          statusEl.textContent = "Something went wrong. Please try again or email us directly.";
          statusEl.className = "form-status error";
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        });
    });
  }
})();
