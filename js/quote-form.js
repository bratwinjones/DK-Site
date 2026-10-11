/* DK Excellency — quote request form. FormSubmit handles delivery and spam verification. */
(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var form = document.getElementById("quoteForm");
  if (!form) return;

  var submit = document.getElementById("quoteSubmit");
  var status = document.getElementById("quoteFormStatus");
  var phone = document.getElementById("quotePhone");
  var details = document.getElementById("quoteDetails");
  var honeypot = document.getElementById("quoteWebsite");
  var next = document.getElementById("quoteNext");
  var submitting = false;

  // Keep the single WhatsApp floater, but let it step out of the way whenever
  // it would cover the form (including the service selector on small screens).
  var chat = document.querySelector(".wa-float");
  var card = document.querySelector(".quote-form-card");
  var chatFrame = null;
  function updateChat() {
    chatFrame = null;
    if (!chat || !card) return;
    var button = chat.getBoundingClientRect();
    var panel = card.getBoundingClientRect();
    var overlaps = button.left < panel.right + 8 && button.right > panel.left - 8 &&
      button.top < panel.bottom + 8 && button.bottom > panel.top - 8;
    chat.classList.toggle("quote-wa-hidden", overlaps);
  }
  function scheduleChat() {
    if (chatFrame === null) chatFrame = window.requestAnimationFrame(updateChat);
  }
  window.addEventListener("scroll", scheduleChat, { passive: true });
  window.addEventListener("resize", scheduleChat);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", scheduleChat);
    window.visualViewport.addEventListener("scroll", scheduleChat, { passive: true });
  }
  updateChat();

  // Return to the same site, including deployment previews or subfolder hosting.
  // Only the thank-you page URL is sent; client details never appear in the URL.
  if (/^https?:$/.test(window.location.protocol)) {
    next.value = new URL("quote-thank-you.html", window.location.href).href;
  }

  form.addEventListener("invalid", function (event) {
    event.target.setAttribute("aria-invalid", "true");
  }, true);

  form.addEventListener("input", function (event) {
    var input = event.target;
    if (typeof input.setCustomValidity === "function") input.setCustomValidity("");
    input.removeAttribute("aria-invalid");
    if (!submitting) status.hidden = true;
  });

  form.addEventListener("change", function (event) {
    event.target.removeAttribute("aria-invalid");
  });

  form.addEventListener("submit", function (event) {
    if (submitting) {
      event.preventDefault();
      return;
    }

    ["quoteName", "quoteEmail", "quotePhone", "quoteLocation", "quoteDetails"].forEach(function (id) {
      var input = document.getElementById(id);
      input.value = input.value.trim();
    });

    phone.setCustomValidity("");
    details.setCustomValidity("");
    var digits = phone.value.replace(/\D/g, "");
    if (!/^\+?[\d\s().-]+$/.test(phone.value) || digits.length < 7 || digits.length > 15) {
      phone.setCustomValidity("Please enter a valid phone number with 7 to 15 digits.");
    }
    if (details.value.length < details.minLength) {
      details.setCustomValidity("Please add at least 10 characters about your project.");
    }

    if (honeypot.value.trim()) {
      event.preventDefault();
      status.hidden = false;
      status.dataset.state = "error";
      status.setAttribute("role", "alert");
      status.textContent = "No request was sent. Your details are still here. Please contact DK Excellency if this problem continues.";
      return;
    }

    if (!form.reportValidity()) {
      event.preventDefault();
      return;
    }

    // Do not disable the fields: native POST must include every client value.
    // FormSubmit accepts the request after its verification step and redirects
    // to _next. We never show a success message before that response.
    submitting = true;
    submit.disabled = true;
    submit.textContent = "Submitting…";
    form.setAttribute("aria-busy", "true");
    status.hidden = false;
    status.dataset.state = "pending";
    status.setAttribute("role", "status");
    status.textContent = "Submitting your request. You may be asked to complete a spam check.";
  });

  // Browser Back can restore this page from the back/forward cache after a
  // verification/network error. Keep the entered details but allow a retry.
  window.addEventListener("pageshow", function () {
    submitting = false;
    submit.disabled = false;
    submit.textContent = "Submit quote request";
    form.removeAttribute("aria-busy");
    status.hidden = true;
    scheduleChat();
  });
})();
