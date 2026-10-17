/* Cookie consent for all pages: banner (Accept / Decline / Settings) + settings window with categories.
   Non-essential cookies are blocked until consent: Yandex.Metrika loads only when "analytics" is allowed.
   Choice is stored in localStorage "dm_cookie_prefs" ({analytics, functional, ads, ts}); the old key
   "dm_cookie_ok" ("1"/"0") is kept in sync and migrated. Footer links [data-cookie-settings] open the settings. */
(function () {
  var YM_ID = 109284397;
  // Session recording (Webvisor) is switched off on pages with forms where people enter personal data.
  var WEBVISOR = !/\/(brief|quiz)(\.html)?\/?$/.test(location.pathname);
  var KEY = "dm_cookie_prefs";

  var CATS = [
    { id: "necessary", title: "Обязательные cookie", fixed: true, text: [
      "Эти cookie нужны, чтобы вы могли пользоваться сайтом и его функциями. Они обеспечивают безопасную работу сайта и защищают его от DDoS-атак. Их нельзя отключить. Они удаляются после закрытия браузера."
    ] },
    { id: "analytics", title: "Аналитические cookie", text: [
      "Эти cookie собирают информацию, которая помогает понять, как используется сайт и насколько эффективны маркетинговые кампании.",
      "С их помощью можно улучшать структуру сайта, оптимизировать контент, находить проблемные места, считать посетителей, видеть источники трафика и действия на сайте. Для этого используется сервис Яндекс Метрика, в том числе Вебвизор (запись действий на странице)."
    ] },
    { id: "functional", title: "Функциональные cookie", text: [
      "Эти cookie запоминают ваши настройки и предпочтения: выбранный язык, регион, размер шрифта и другие. Они помогают сделать использование сайта удобнее."
    ] },
    { id: "ads", title: "Рекламные cookie", text: [
      "Рекламные (маркетинговые) cookie собирают информацию о ваших интересах, чтобы показывать вам подходящую рекламу на этом и других сайтах.",
      "Эти файлы используются для показа релевантной рекламы и ограничения количества её показов."
    ] }
  ];

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
      var old = localStorage.getItem("dm_cookie_ok");
      if (old === "1") return { analytics: true, functional: true, ads: true };
      if (old === "0") return { analytics: false, functional: false, ads: false };
    } catch (e) {}
    return null;
  }
  function save(p) {
    p.ts = new Date().toISOString();
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
      localStorage.setItem("dm_cookie_ok", p.analytics ? "1" : "0");
    } catch (e) {}
    apply(p);
  }

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
  function apply(p) {
    if (p.analytics) loadMetrika();
    else if (window.__dmYmLoaded) location.reload(); // stop an already running counter
  }

  var CSS = "" +
    ".dmc,.dmc *{box-sizing:border-box;font-family:'Golos Text',system-ui,-apple-system,sans-serif}" +
    ".dmc-bar{position:fixed;z-index:2147483640;left:16px;right:16px;bottom:16px;margin:0 auto;max-width:760px;background:#fff;color:#1d1d1f;border:1px solid #e7e0d5;border-radius:20px;box-shadow:0 16px 48px rgba(0,0,0,.18);padding:20px 22px}" +
    ".dmc-bar p{margin:0 0 10px;font-size:13.5px;line-height:1.5;color:#3a3a3c}" +
    ".dmc a{color:#c8235a;text-decoration:underline;text-underline-offset:3px}" +
    ".dmc-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}" +
    ".dmc-b{border-radius:980px;padding:11px 22px;font-size:14px;font-weight:600;cursor:pointer;border:1px solid #1d1d1f;background:#fff;color:#1d1d1f;line-height:1.2}" +
    ".dmc-b.pri{background:#1d1d1f;color:#fff}" +
    ".dmc-b.end{margin-left:auto}" +
    ".dmc-b:focus-visible,.dmc-row button:focus-visible,.dmc-sw input:focus-visible+span{outline:2px solid #c8235a;outline-offset:2px}" +
    ".dmc-ov{position:fixed;inset:0;z-index:2147483641;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:16px}" +
    ".dmc-win{background:#fff;color:#1d1d1f;width:100%;max-width:460px;max-height:calc(100vh - 32px);border-radius:16px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.3)}" +
    ".dmc-top{padding:14px 18px;box-shadow:0 4px 12px rgba(0,0,0,.05)}" +
    ".dmc-back{background:none;border:0;font-size:24px;line-height:1;color:#8e8e93;cursor:pointer;padding:4px 6px}" +
    ".dmc-body{padding:22px 22px 8px;overflow:auto}" +
    ".dmc-body h2{margin:0 0 12px;font-size:22px;font-weight:600;letter-spacing:-.01em}" +
    ".dmc-body>p{margin:0 0 18px;font-size:15px;line-height:1.55;color:#3a3a3c}" +
    ".dmc-row{border-top:1px solid #e5e5ea}.dmc-row:last-child{border-bottom:1px solid #e5e5ea}" +
    ".dmc-head{display:flex;align-items:center;gap:10px;min-height:54px}" +
    ".dmc-head button{flex:1;display:flex;align-items:center;gap:10px;background:none;border:0;padding:12px 0;font-size:15px;color:#1d1d1f;cursor:pointer;text-align:left}" +
    ".dmc-plus{width:16px;flex:none;font-size:20px;line-height:1;font-weight:300}" +
    ".dmc-st{font-size:12px;color:#8e8e93;white-space:nowrap}.dmc-st.on{color:#c8235a}" +
    ".dmc-fix{font-size:12.5px;color:#c8235a;white-space:nowrap}" +
    ".dmc-sw{position:relative;flex:none;width:48px;height:28px}" +
    ".dmc-sw input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer;z-index:1}" +
    ".dmc-sw span{position:absolute;inset:0;border-radius:28px;background:#d1d1d6;transition:background .2s}" +
    ".dmc-sw span:after{content:'';position:absolute;left:3px;top:3px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .2s}" +
    ".dmc-sw input:checked+span{background:#c8235a}.dmc-sw input:checked+span:after{transform:translateX(20px)}" +
    ".dmc-txt{padding:0 0 14px 26px;font-size:13.5px;line-height:1.55;color:#48484a}.dmc-txt p{margin:0 0 8px}" +
    ".dmc-foot{padding:16px 22px;box-shadow:0 -4px 12px rgba(0,0,0,.05)}" +
    "@media(max-width:560px){.dmc-bar{left:10px;right:10px;bottom:10px;padding:16px}.dmc-b{flex:1 1 auto;text-align:center}.dmc-b.end{margin-left:0}.dmc-ov{padding:0;align-items:flex-end}.dmc-win{max-width:none;max-height:92vh;border-radius:16px 16px 0 0}}";

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }
  function addCss() {
    if (document.getElementById("dmc-css")) return;
    var s = el("style", { id: "dmc-css" }); s.textContent = CSS; document.head.appendChild(s);
  }
  function closeAll() {
    var a = document.querySelectorAll("[data-dmc]");
    for (var i = 0; i < a.length; i++) a[i].remove();
  }

  var LINKS = '<a href="cookie.html">Условиями использования файлов cookie</a>';

  function showBanner() {
    addCss(); closeAll();
    var bar = el("div", { "class": "dmc dmc-bar", role: "dialog", "aria-label": "Согласие на использование cookie", "data-dmc": "" });
    bar.innerHTML =
      "<p>Осуществляя навигацию по сайту после ознакомления с баннером, вы соглашаетесь с " + LINKS +
      " в целях обеспечения функционирования и улучшения работы сайта, ретаргетинга, проведения веб-аналитики с использованием сервиса Яндекс Метрика.</p>" +
      "<p>Вы можете настроить предпочтения cookie через кнопки баннера либо позже изменить их в настройках браузера. Подробнее об обработке файлов cookie и персональных данных — в <a href=\"cookie.html\">политике использования cookie</a> и <a href=\"privacy.html\">политике конфиденциальности</a>.</p>" +
      '<div class="dmc-btns"><button type="button" class="dmc-b pri" data-a="all">Принять</button>' +
      '<button type="button" class="dmc-b" data-a="none">Отклонить cookie</button>' +
      '<button type="button" class="dmc-b end" data-a="set">Настроить</button></div>';
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]"); if (!b) return;
      var a = b.getAttribute("data-a");
      if (a === "all") { save({ analytics: true, functional: true, ads: true }); closeAll(); }
      else if (a === "none") { save({ analytics: false, functional: false, ads: false }); closeAll(); }
      else showSettings(true);
    });
    document.body.appendChild(bar);
  }

  function showSettings(fromBanner) {
    addCss(); closeAll();
    var cur = read() || { analytics: false, functional: false, ads: false };
    var ov = el("div", { "class": "dmc dmc-ov", "data-dmc": "" });
    var win = el("div", { "class": "dmc-win", role: "dialog", "aria-modal": "true", "aria-labelledby": "dmc-h" });
    var rows = "";
    CATS.forEach(function (c, i) {
      var right = c.fixed
        ? '<span class="dmc-fix">Всегда разрешено</span>'
        : '<span class="dmc-st' + (cur[c.id] ? " on" : "") + '" data-st="' + c.id + '">' + (cur[c.id] ? "Разрешено" : "Запрещено") + "</span>" +
          '<label class="dmc-sw"><input type="checkbox" data-cat="' + c.id + '"' + (cur[c.id] ? " checked" : "") + ' aria-label="' + c.title + '"><span></span></label>';
      rows += '<div class="dmc-row"><div class="dmc-head"><button type="button" aria-expanded="false" aria-controls="dmc-t' + i + '"><span class="dmc-plus" aria-hidden="true">+</span>' + c.title + "</button>" + right + "</div>" +
        '<div class="dmc-txt" id="dmc-t' + i + '" hidden>' + c.text.map(function (t) { return "<p>" + t + "</p>"; }).join("") + "</div></div>";
    });
    win.innerHTML =
      '<div class="dmc-top"><button type="button" class="dmc-back" data-back aria-label="Назад">&#8592;</button></div>' +
      '<div class="dmc-body"><h2 id="dmc-h">Настройки файлов cookie</h2>' +
      "<p>Файлы cookie, необходимые для корректной работы сайта, всегда включены. Остальные файлы cookie можно настроить.</p>" + rows + "</div>" +
      '<div class="dmc-foot"><button type="button" class="dmc-b pri" data-save>Принять</button></div>';
    ov.appendChild(win);
    win.addEventListener("click", function (e) {
      var h = e.target.closest(".dmc-head button");
      if (h) {
        var t = document.getElementById(h.getAttribute("aria-controls"));
        var open = t.hidden; t.hidden = !open;
        h.setAttribute("aria-expanded", open ? "true" : "false");
        h.querySelector(".dmc-plus").textContent = open ? "−" : "+";
        return;
      }
      if (e.target.closest("[data-back]")) {
        if (fromBanner || !read()) showBanner(); else closeAll();
        return;
      }
      if (e.target.closest("[data-save]")) {
        var p = { analytics: false, functional: false, ads: false };
        win.querySelectorAll("[data-cat]").forEach(function (i) { p[i.getAttribute("data-cat")] = i.checked; });
        save(p); closeAll();
      }
    });
    win.addEventListener("change", function (e) {
      var i = e.target.closest("[data-cat]"); if (!i) return;
      var st = win.querySelector('[data-st="' + i.getAttribute("data-cat") + '"]');
      st.textContent = i.checked ? "Разрешено" : "Запрещено";
      st.classList.toggle("on", i.checked);
    });
    ov.addEventListener("click", function (e) { if (e.target === ov && read()) closeAll(); });
    document.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape" && document.contains(ov)) { if (read()) closeAll(); else showBanner(); document.removeEventListener("keydown", esc); }
    });
    document.body.appendChild(ov);
    var first = win.querySelector(".dmc-head button"); if (first) first.focus();
  }

  function start() {
    var p = read();
    if (p) { if (p.analytics) loadMetrika(); }
    else showBanner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();

  // footer link "Настройки cookie": open the settings window with the current choice
  document.addEventListener("click", function (e) {
    var s = e.target.closest && e.target.closest("[data-cookie-settings]");
    if (!s) return;
    e.preventDefault();
    showSettings(false);
  });
})();
