(function () {
  function showTab(id) {
    document.querySelectorAll("[data-tab]").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-tab") === id ? "true" : "false"); });
    document.querySelectorAll("[data-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== id; });
  }
  document.addEventListener("click", function (e) {
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
