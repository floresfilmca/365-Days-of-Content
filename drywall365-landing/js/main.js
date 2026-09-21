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
})();
