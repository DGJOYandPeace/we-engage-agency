/* We Engage Agency — interaction layer.
   Three jobs: sticky masthead, scroll reveals, hero parallax.
   Every one of them stands down under prefers-reduced-motion. */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Sticky masthead ---------- */
  var masthead = document.querySelector(".masthead");
  if (masthead) {
    var onScroll = function () {
      masthead.classList.toggle("is-stuck", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll reveals ----------
     IntersectionObserver rather than an animation library, per the brief. */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduced.matches || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Hero parallax ----------
     Background drifts at ~0.35x scroll. rAF-throttled, and only while
     the hero is actually on screen. */
  var heroMedia = document.querySelector(".hero__media");
  if (heroMedia && !reduced.matches) {
    var ticking = false;
    var park = function () {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroMedia.style.transform = "translate3d(0," + (y * 0.35).toFixed(1) + "px,0)";
      }
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(park); ticking = true; }
    }, { passive: true });
    park();
  }

  /* ---------- Hero video ----------
     The brief is explicit: no video below 768px (cellular cost, iOS autoplay
     quirks), and no video at all under reduced motion. The poster <img> is
     the markup default, so we only ever *promote* to video when allowed. */
  var heroSlot = document.querySelector("[data-hero-video]");
  if (heroSlot) {
    var wide = window.matchMedia("(min-width: 768px)");
    var mounted = false;

    var mount = function () {
      if (mounted || !wide.matches || reduced.matches) return;
      mounted = true;
      var v = document.createElement("video");
      v.src = heroSlot.getAttribute("data-hero-video");
      v.poster = heroSlot.getAttribute("data-hero-poster") || "";
      /* All three are required together or iOS Safari refuses to autoplay. */
      v.muted = true;
      v.autoplay = true;
      v.playsInline = true;
      v.setAttribute("muted", "");
      v.setAttribute("autoplay", "");
      v.setAttribute("playsinline", "");
      v.loop = true;
      v.setAttribute("aria-hidden", "true");
      v.addEventListener("canplay", function () {
        var poster = heroSlot.querySelector("img");
        if (poster) poster.style.display = "none";
      });
      heroSlot.appendChild(v);
      var p = v.play();
      if (p && p.catch) {
        p.catch(function () {
          /* Autoplay refused — the poster underneath is already correct. */
          v.remove();
          mounted = false;
          var poster = heroSlot.querySelector("img");
          if (poster) poster.style.display = "";
        });
      }
    };

    mount();
    if (wide.addEventListener) wide.addEventListener("change", mount);
  }

  /* ---------- Click-to-load video embeds ----------
     Nothing from YouTube or Vimeo is requested until the visitor asks for it:
     faster first paint, and no third-party cookies set on arrival. */
  document.querySelectorAll("[data-embed]").forEach(function (el) {
    var load = function () {
      var src = el.getAttribute("data-embed");
      if (!src) return;
      var frame = document.createElement("iframe");
      frame.src = src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1";
      frame.setAttribute("title", el.getAttribute("data-title") || "Video");
      frame.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      frame.setAttribute("allowfullscreen", "");
      frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      el.innerHTML = "";
      el.appendChild(frame);
    };
    el.addEventListener("click", load);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); load(); }
    });
  });

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
