/* Shared for all inner pages: cookie consent banner + Yandex.Metrika (loads only after consent).
   The home page has the same logic inline. Consent is shared through localStorage key dm_cookie_ok. */
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

  var ok = false;
  try { ok = localStorage.getItem("dm_cookie_ok") === "1"; } catch (e) {}
  if (ok) { loadMetrika(); return; }

  function showBanner() {
    var box = document.createElement("div");
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Согласие на использование cookie");
    box.style.cssText = "position:fixed;right:16px;bottom:16px;left:16px;margin-left:auto;z-index:2147483640;max-width:420px;background:rgba(29,29,31,.92);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);color:#f5f5f7;border-radius:20px;padding:14px 14px 14px 20px;box-shadow:0 12px 40px rgba(0,0,0,.25);display:flex;gap:16px;align-items:center;flex-wrap:wrap;font-family:'Golos Text',system-ui,sans-serif";
    var p = document.createElement("p");
    p.style.cssText = "flex:1 1 280px;margin:0;font-size:13px;line-height:1.4;color:#f5f5f7";
    p.appendChild(document.createTextNode("Сайт использует cookie-файлы, чтобы корректно работать и анализировать посещаемость. Нажимая «Принять», вы соглашаетесь с использованием cookie и обработкой данных в соответствии с "));
    var a = document.createElement("a");
    a.href = "privacy.html";
    a.textContent = "политикой конфиденциальности";
    a.style.cssText = "color:#fff;text-decoration:underline;text-underline-offset:3px";
    p.appendChild(a);
    p.appendChild(document.createTextNode("."));
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = "Принять";
    b.style.cssText = "flex:none;background:#fff;color:#1d1d1f;border:none;border-radius:980px;padding:10px 20px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer";
    b.addEventListener("click", function () {
      try { localStorage.setItem("dm_cookie_ok", "1"); } catch (e) {}
      loadMetrika();
      box.remove();
    });
    box.appendChild(p);
    box.appendChild(b);
    document.body.appendChild(box);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showBanner);
  else showBanner();
})();

/* print / save-as-PDF buttons (replaces inline onclick, which the CSP forbids) */
document.addEventListener("click", function (e) {
  if (e.target.closest && e.target.closest("[data-print]")) window.print();
});
