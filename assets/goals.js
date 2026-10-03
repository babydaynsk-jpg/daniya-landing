/* Yandex.Metrika goals: sends a "JavaScript event" goal for every key action.
   Works only after cookie consent (the counter is loaded by site.js / inline script on the home page).
   Goal identifiers are listed in .github/METRIKA-GOALS.md */
(function () {
  var YM_ID = 109284397;

  function goal(name, extra) {
    if (typeof window.ym !== "function") return; // no consent yet -> nothing is sent
    var params = { page: location.pathname.replace(/^\//, "") || "/" };
    if (extra) for (var k in extra) if (extra[k]) params[k] = extra[k];
    try { window.ym(YM_ID, "reachGoal", name, params); } catch (e) {}
  }
  window.dmGoal = goal;

  function clean(t) { return (t || "").replace(/\s+/g, " ").trim().slice(0, 60); }
  function sectionOf(el) {
    var s = el.closest("section[id], footer, header");
    return s ? (s.id || s.tagName.toLowerCase()) : "";
  }

  var ARTICLES = /(guide|romi-kak-schitat|unit-ekonomika-reklama|rabota-s-bazoy-povtornye-prodazhi|voronka-prodazh|skvoznaya-analitika|kak-vybrat-marketologa|skolko-stoit-marketing|kanaly-privlecheniya-klientov)\.html/;

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var sec, txt;

    // cookie consent (metrika is loaded by the consent handler, so wait a moment)
    var ck = t.closest("#dm-cookie button, [role=dialog][aria-label^='Согласие'] button");
    if (ck) { setTimeout(function () { goal("cookie_accept"); }, 600); return; }

    // tabs with results
    var tab = t.closest("[data-tab]");
    if (tab) { goal("results_tab", { tab: tab.getAttribute("data-tab") }); return; }

    // print / save PDF buttons (brief)
    var pr = t.closest("button");
    if (pr && /print/.test(pr.getAttribute("onclick") || "")) { goal("brief_save_pdf"); return; }

    // accordions
    var sum = t.closest("summary");
    if (sum) {
      var det = sum.parentNode;
      if (det && !det.open) { // about to open
        goal(det.closest("#faq") ? "faq_open" : "accordion_open", { text: clean(sum.textContent), section: sectionOf(sum) });
      }
      return;
    }

    var a = t.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    sec = sectionOf(a); txt = clean(a.textContent);
    var extra = { section: sec, text: txt };
    var custom = a.getAttribute("data-goal");
    if (custom) goal(custom, extra);

    if (href.indexOf("t.me/") > -1) goal("click_telegram", extra);
    else if (href.indexOf("max.ru") > -1) goal("click_max", extra);
    else if (href.indexOf("tel:") === 0) goal("click_phone", extra);
    else if (href.indexOf("mailto:") === 0) goal("click_email", extra);
    else if (href.indexOf("tenchat.ru") > -1) goal("click_tenchat", extra);
    else if (href.indexOf("instagram.com") > -1) goal("click_instagram", extra);
    else if (/(^|\/)(quiz|brief)\.html/.test(href)) goal("click_brief", extra);
    else if (/#cta$/.test(href)) goal("click_diagnostic", extra);
    else if (/#res-/.test(href)) goal("click_segment", { segment: href.slice(href.indexOf("#res-") + 5) });
    else if (/#marketplace$/.test(href)) goal("click_segment", { segment: "marketplace" });
    else if (/(^|\/)cases\.html/.test(href)) goal("click_portfolio", extra);
    else if (/(^|\/)articles\.html/.test(href)) goal("click_all_articles", extra);
    else if (ARTICLES.test(href)) goal("click_article", { article: href.replace(/^.*\//, "").replace(".html", ""), section: sec });
  }, true);

  // scroll depth
  var marks = { 25: 0, 50: 0, 75: 0, 90: 0 }, tick = false;
  function depth() {
    tick = false;
    var h = document.documentElement.scrollHeight - innerHeight;
    if (h <= 0) return;
    var p = (scrollY / h) * 100;
    for (var m in marks) if (!marks[m] && p >= +m) { marks[m] = 1; goal("scroll_" + m); }
  }
  addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(depth); } }, { passive: true });

  // reading time: engaged visitor (30 s visible)
  var shown = 0, fired = false;
  setInterval(function () {
    if (document.visibilityState === "visible") shown++;
    if (!fired && shown >= 30) { fired = true; goal("engaged_30s"); }
  }, 1000);
})();
