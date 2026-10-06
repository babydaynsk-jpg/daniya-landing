(function () {
  var YM_ID = 109284397;
  function loadMetrika() {
    if (window.__dmYmLoaded) return;
    window.__dmYmLoaded = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
      k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    window.ym(YM_ID, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
  }
  var state = null;
  try { state = localStorage.getItem("dm_cookie_ok"); } catch (e) {}
  var ck = document.getElementById("dm-cookie");
  if (state === "1") loadMetrika(); else if (state !== "0" && ck) ck.hidden = false;

  function showTab(id) {
    document.querySelectorAll("[data-tab]").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-tab") === id ? "true" : "false"); });
    document.querySelectorAll("[data-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== id; });
  }
  document.addEventListener("click", function (e) {
    var dc = e.target.closest("[data-decline-cookies]");
    if (dc) {
      var wasOn = window.__dmYmLoaded;
      try { localStorage.setItem("dm_cookie_ok", "0"); } catch (_) {}
      if (ck) ck.hidden = true;
      if (wasOn) location.reload();
      return;
    }
    var cs = e.target.closest("[data-cookie-settings]");
    if (cs) {
      e.preventDefault();
      try { localStorage.removeItem("dm_cookie_ok"); } catch (_) {}
      if (ck) ck.hidden = false;
      return;
    }
    var a = e.target.closest("[data-accept-cookies]");
    if (a) {
      try { localStorage.setItem("dm_cookie_ok", "1"); } catch (_) {}
      loadMetrika();
      if (ck) ck.hidden = true;
      return;
    }
    var t = e.target.closest("[data-tab]");
    if (t) { showTab(t.getAttribute("data-tab")); return; }
    var l = e.target.closest('a[href^="#res-"]');
    if (l) { showTab(l.getAttribute("href").slice(5)); }
  });

  // nav shadow on scroll
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // reveal on scroll
  var els = document.querySelectorAll("[data-r]");
  if (!("IntersectionObserver" in window) || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    els.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    els.forEach(function (el) { el.classList.add("pre"); io.observe(el); });
  }
})();
