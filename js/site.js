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

  /* ---------- YouTube poster fallback ----------
     Not every video has a maxresdefault.jpg. When one is missing YouTube
     does NOT 404 — it answers 200 with a 120x90 grey placeholder, so an
     onerror handler never fires and the poster renders as a grey box.
     The only reliable tell is the decoded size, so check it on load and
     step down to hqdefault.jpg, which exists for every video. */
  var YT_POSTER = /^https?:\/\/i\.ytimg\.com\/vi\/([^/]+)\/maxresdefault\.jpg/;

  var stepDownPoster = function (img) {
    var m = YT_POSTER.exec(img.currentSrc || img.src);
    if (!m) return;
    img.src = "https://i.ytimg.com/vi/" + m[1] + "/hqdefault.jpg";
  };

  var checkPoster = function (img) {
    /* 120x90 is the placeholder; a real maxres frame is 1280x720. Width 0
       means it has not decoded yet, which the load handler will catch. */
    if (img.naturalWidth && img.naturalWidth <= 120) stepDownPoster(img);
  };

  var armPoster = function (img) {
    if (img.complete) checkPoster(img);
    img.addEventListener("load", function () { checkPoster(img); });
    /* A genuine network failure still deserves the same step-down. */
    img.addEventListener("error", function () { stepDownPoster(img); });
  };

  document.querySelectorAll("img.player__poster").forEach(function (img) {
    if (YT_POSTER.test(img.getAttribute("src") || "")) armPoster(img);
  });

  /* ---------- Click-to-load video embeds ----------
     Nothing from YouTube or Vimeo is requested until the visitor asks for it:
     faster first paint, and no third-party cookies set on arrival.

     Only one player is ever live at a time. Opening a second video tears the
     first one down and restores its poster, which stops the audio outright —
     two films talking over each other on the same page is the fastest way to
     make someone leave. Removing the iframe is deliberate: it needs no
     third-party player API, works the same for YouTube and Vimeo, and cannot
     leave a muted-but-running frame burning bandwidth behind the fold. */
  var openPlayer = null;

  var closePlayer = function () {
    if (!openPlayer) return;
    var el = openPlayer;
    openPlayer = null;
    el.innerHTML = el.__weaPoster;
    el.setAttribute("tabindex", "0");
    /* The restored poster is a fresh <img>, so it needs the maxres check
       applied again — it has not been through the walk below. */
    var img = el.querySelector("img.player__poster");
    if (img && YT_POSTER.test(img.getAttribute("src") || "")) armPoster(img);
  };

  document.querySelectorAll("[data-embed]").forEach(function (el) {
    var load = function () {
      var src = el.getAttribute("data-embed");
      if (!src || openPlayer === el) return;
      /* Stash the poster markup once, the first time this player is opened. */
      if (el.__weaPoster === undefined) el.__weaPoster = el.innerHTML;
      closePlayer();
      var frame = document.createElement("iframe");
      frame.src = src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1";
      frame.setAttribute("title", el.getAttribute("data-title") || "Video");
      frame.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      frame.setAttribute("allowfullscreen", "");
      frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      el.innerHTML = "";
      el.appendChild(frame);
      /* The frame takes over as the interactive element; the wrapper should
         no longer be a tab stop or swallow clicks meant for the player. */
      el.removeAttribute("tabindex");
      openPlayer = el;
    };
    el.addEventListener("click", function () {
      /* Clicks inside a live iframe never reach us, so this only ever fires
         on the poster — but guard anyway in case of a stray bubble. */
      if (openPlayer !== el) load();
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); load(); }
    });
  });

  /* Escape closes whatever is playing. */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && openPlayer) {
      var el = openPlayer;
      closePlayer();
      el.focus();
    }
  });

  /* The hero loop is decorative and silent, but it should not keep running
     under a film the visitor actually chose to watch. */
  var heroPause = function (playing) {
    var v = heroSlot && heroSlot.querySelector("video");
    if (!v) return;
    if (playing) { v.pause(); } else { var q = v.play(); if (q && q.catch) q.catch(function () {}); }
  };
  var wrapped = closePlayer;
  closePlayer = function () { wrapped(); heroPause(false); };

  /* ---------- Intake form ----------
     Qualification gates the calendar: the scheduler stays hidden until the
     form validates, per the funnel in the brief.

     Posts JSON to the form backend named by data-endpoint on #intake
     (Basin: https://usebasin.com/f/<form-id>). With no endpoint set the form
     still works and still gates the calendar, but nobody receives the
     answers — so set it before launch.

     These submissions are inbound leads, so a failed POST must never pass
     silently. On failure the visitor still reaches the calendar (never trap
     someone who is trying to book) but a fallback appears with their answers
     pre-filled into a mailto, so the lead survives a backend outage. */
  var intake = document.getElementById("intake");
  if (intake) {
    var booking = document.getElementById("booking");
    var FALLBACK_EMAIL = intake.getAttribute("data-fallback-email") || "hello@weengageagency.com";

    /* The honeypot is a visible-to-bots text input that must stay empty, so
       it can never be run through the "required and non-empty" check below. */
    var FIELDS = 'input:not([name="_gotcha"]), select, textarea';

    var validate = function (el) {
      var wrap = el.closest(".field");
      var ok = el.checkValidity() && String(el.value).trim() !== "";
      if (wrap) wrap.setAttribute("data-invalid", String(!ok));
      return ok;
    };

    intake.querySelectorAll(FIELDS).forEach(function (el) {
      el.addEventListener("blur", function () { validate(el); });
      el.addEventListener("input", function () {
        var wrap = el.closest(".field");
        if (wrap && wrap.getAttribute("data-invalid") === "true") validate(el);
      });
    });

    /* Calendly, themed to the site and pre-filled from the intake answers.
       They have just typed their name and email; asking again on the very
       next screen is the kind of friction that loses a booking. Colours are
       passed as bare hex, which is the format Calendly's embed expects. */
    var calendlyUrl = function (base, data) {
      var q = [
        "hide_gdpr_banner=1",
        "background_color=0E1216",
        "text_color=F0F3F6",
        "primary_color=E0A85C"
      ];
      if (data && data.name)  q.push("name="  + encodeURIComponent(data.name));
      if (data && data.email) q.push("email=" + encodeURIComponent(data.email));
      return base + (base.indexOf("?") > -1 ? "&" : "?") + q.join("&");
    };

    var revealBooking = function (data) {
      var url = booking && booking.getAttribute("data-calendly");
      if (url) {
        var slot = document.getElementById("calendly");
        if (slot) {
          var f = document.createElement("iframe");
          f.src = calendlyUrl(url, data);
          f.title = "Schedule a discovery call";
          f.setAttribute("loading", "lazy");
          f.style.cssText = "width:100%;height:760px;border:0;";
          slot.innerHTML = "";
          slot.appendChild(f);
        }
      }
      intake.hidden = true;
      if (booking) {
        booking.hidden = false;
        booking.scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth", block: "start" });
        var h = booking.querySelector("h2");
        if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
      }
    };

    var showFallback = function (data) {
      var note = document.getElementById("intake-fallback");
      if (!note) return;
      var body = Object.keys(data).map(function (k) { return k + ": " + data[k]; }).join("\n");
      var link = note.querySelector("a");
      if (link) {
        link.href = "mailto:" + FALLBACK_EMAIL +
          "?subject=" + encodeURIComponent("Discovery call request — " + (data.organization || data.name || "")) +
          "&body=" + encodeURIComponent(body);
      }
      note.hidden = false;
    };

    intake.addEventListener("submit", function (e) {
      e.preventDefault();

      /* Honeypot: real people never fill a field they cannot see. */
      var trap = intake.querySelector('input[name="_gotcha"]');
      if (trap && trap.value) { revealBooking(); return; }

      var firstBad = null;
      intake.querySelectorAll(FIELDS).forEach(function (el) {
        if (!validate(el) && !firstBad) firstBad = el;
      });
      if (firstBad) { firstBad.focus(); return; }

      var data = {};
      new FormData(intake).forEach(function (v, k) { if (k !== "_gotcha") data[k] = v; });
      try { sessionStorage.setItem("wea-intake", JSON.stringify(data)); } catch (err) {}

      var endpoint = intake.getAttribute("data-endpoint");
      if (!endpoint) { revealBooking(data); return; }

      var btn = intake.querySelector('button[type="submit"]');
      var label = btn ? btn.innerHTML : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      /* Form-encoded rather than JSON. Basin treats this as its native
         format and maps each key to a named field in the notification
         email; a JSON body can arrive as one opaque blob with no fields
         broken out. It is also a "simple" request, so the browser skips
         the CORS preflight entirely — one less thing between a lead and
         the inbox. */
      var body = new URLSearchParams();
      Object.keys(data).forEach(function (k) { body.append(k, data[k]); });

      fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: body
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          revealBooking(data);
        })
        .catch(function () {
          /* Let them book regardless, but make sure the lead is recoverable. */
          revealBooking(data);
          showFallback(data);
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = label; }
        });
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
