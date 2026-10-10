/* ============================================================
   DK — Sauna And Jacuzzi
   Behaviour: mobile nav, header state, scrollspy, reveal
   animations, animated stats, gallery lightbox.
   No dependencies.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- CONFIG ----------
     The floating button is the only WhatsApp link. It uses the
     international number 27672166641 (local: 067 216 6641).
     Quote buttons open an email request: desktop navigation and mobile hero (see index.html). */
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: mobile nav toggle ---------- */
  var header = document.querySelector(".site-header");
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");

  function setNav(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setNav(!nav.classList.contains("open"));
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setNav(false);
      toggle.focus();
    }
  });
  // Close after choosing a destination (mobile)
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setNav(false);
  });

  /* ---------- Header: solidify on scroll ---------- */
  var onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scrollspy: highlight current section ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal-on-scroll animations ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (REDUCED || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (REDUCED) { el.textContent = target; return; }
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Gallery lightbox ---------- */
  var dialog = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCaption = document.getElementById("lbCaption");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".g-btn"));
  var current = 0;

  function show(i) {
    current = (i + buttons.length) % buttons.length;
    var btn = buttons[current];
    lbImg.src = btn.getAttribute("data-full");
    lbImg.alt = btn.querySelector("img").alt;
    lbCaption.textContent = btn.getAttribute("data-caption") || "";
  }
  buttons.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      show(i);
      if (typeof dialog.showModal === "function") dialog.showModal();
    });
  });
  document.getElementById("lbClose").addEventListener("click", function () { dialog.close(); });
  document.getElementById("lbPrev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("lbNext").addEventListener("click", function () { show(current + 1); });
  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
  // Click on backdrop closes
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
