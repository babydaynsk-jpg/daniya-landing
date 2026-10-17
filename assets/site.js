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
