/* Shared for all inner pages: cookie consent banner (Accept / Decline) + Yandex.Metrika (loads only after consent).
   The home page has the same logic in home.js. Consent is shared through localStorage key dm_cookie_ok:
   "1" = accepted, "0" = declined, missing = not asked yet. */
(function () {
  var YM_ID = 109284397;
  // Session recording (Webvisor) is switched off on pages with forms where people enter personal data.
  var WEBVISOR = !/\/(brief|quiz)(\.html)?\/?$/.test(location.pathname);

  function loadMetrika() {
    if (window.__dmYmLoaded) return;
    window.__dmYmLoaded = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
      k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    window.ym(YM_ID, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: WEBVISOR });
  }

  function getConsent() {
    try { return localStorage.getItem("dm_cookie_ok"); } catch (e) { return null; }
  }
  function setConsent(v) {
    try { if (v === null) localStorage.removeItem("dm_cookie_ok"); else localStorage.setItem("dm_cookie_ok", v); } catch (e) {}
  }

  function showBanner() {
    if (document.querySelector("[data-dm-cookie-box]")) return;
    var box = document.createElement("div");
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Согласие на использование cookie");
    box.setAttribute("data-dm-cookie-box", "");
    box.style.cssText = "position:fixed;right:16px;bottom:16px;left:16px;margin-left:auto;z-index:2147483640;max-width:440px;background:rgba(29,29,31,.94);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);color:#f5f5f7;border-radius:20px;padding:16px 16px 16px 20px;box-shadow:0 12px 40px rgba(0,0,0,.25);display:flex;gap:14px;align-items:center;flex-wrap:wrap;font-family:'Golos Text',system-ui,sans-serif";
    var p = document.createElement("p");
    p.style.cssText = "flex:1 1 260px;margin:0;font-size:13px;line-height:1.45;color:#f5f5f7";
    p.appendChild(document.createTextNode("Сайт использует cookie и сервис Яндекс Метрика (в том числе запись действий на странице — Вебвизор), чтобы анализировать посещаемость. Аналитика включается только после вашего согласия. Подробнее — в "));
    var a = document.createElement("a");
    a.href = "privacy.html";
    a.textContent = "политике конфиденциальности";
    a.style.cssText = "color:#fff;text-decoration:underline;text-underline-offset:3px";
    p.appendChild(a);
    p.appendChild(document.createTextNode("."));
    var wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;flex-direction:column;gap:8px;flex:none";
    var yes = document.createElement("button");
    yes.type = "button";
    yes.textContent = "Принять";
    yes.style.cssText = "background:#fff;color:#1d1d1f;border:none;border-radius:980px;padding:10px 20px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer";
    var no = document.createElement("button");
    no.type = "button";
    no.textContent = "Отклонить";
    no.style.cssText = "background:transparent;color:#fff;border:1px solid rgba(255,255,255,.45);border-radius:980px;padding:9px 20px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer";
    yes.addEventListener("click", function () {
      setConsent("1");
      loadMetrika();
      box.remove();
    });
    no.addEventListener("click", function () {
      var wasOn = window.__dmYmLoaded;
      setConsent("0");
      box.remove();
      if (wasOn) location.reload(); // stop an already running counter
    });
    wrap.appendChild(yes);
    wrap.appendChild(no);
    box.appendChild(p);
    box.appendChild(wrap);
    document.body.appendChild(box);
  }

  var state = getConsent();
  if (state === "1") loadMetrika();
  else if (state !== "0") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showBanner);
    else showBanner();
  }

  // footer link "Настройки cookie": reopen the banner so the choice can be changed
  document.addEventListener("click", function (e) {
    var s = e.target.closest && e.target.closest("[data-cookie-settings]");
    if (!s) return;
    e.preventDefault();
    setConsent(null);
    showBanner();
  });
})();

/* print / save-as-PDF buttons (replaces inline onclick, which the CSP forbids) */
document.addEventListener("click", function (e) {
  if (e.target.closest && e.target.closest("[data-print]")) window.print();
});

/* consent checkbox gate: links/buttons marked data-needs-consent work only after the checkbox is ticked */
document.addEventListener("click", function (e) {
  var el = e.target.closest && e.target.closest("[data-needs-consent]");
  if (!el) return;
  var cb = document.querySelector("[data-consent-box]");
  if (cb && !cb.checked) {
    e.preventDefault();
    e.stopPropagation();
    var hint = document.querySelector("[data-consent-hint]");
    if (hint) { hint.hidden = false; hint.scrollIntoView({ block: "center", behavior: "smooth" }); }
    cb.focus();
  }
}, true);
document.addEventListener("change", function (e) {
  if (e.target && e.target.matches && e.target.matches("[data-consent-box]")) {
    var hint = document.querySelector("[data-consent-hint]");
    if (hint && e.target.checked) hint.hidden = true;
  }
});
