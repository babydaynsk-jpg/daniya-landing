(function () {
  function root(el) { return el.closest ? el.closest('[data-cs]') : null; }
  function idx(track) { return Math.max(0, Math.min(track.children.length - 1, Math.round(track.scrollLeft / Math.max(1, track.clientWidth)))); }
  function go(track, i) {
    var n = track.children.length;
    i = (i + n) % n;
    track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
  }
  function closeLb() {
    var lb = document.getElementById('dm-lb');
    if (lb) { lb.remove(); document.documentElement.style.overflow = ''; }
  }
  function openLb(src, alt) {
    closeLb();
    var lb = document.createElement('div');
    lb.id = 'dm-lb'; lb.className = 'dm-lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', alt || 'Кейс');
    lb.innerHTML = '<div class="dm-lb-scroll"><img alt=""></div><button type="button" class="dm-lb-x" aria-label="Закрыть">&#10005;</button><div class="dm-lb-hint">Проведите пальцем, чтобы посмотреть слайд целиком</div>';
    lb.querySelector('img').src = src;
    lb.querySelector('img').alt = alt || '';
    document.body.appendChild(lb);
    document.documentElement.style.overflow = 'hidden';
  }
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('.dm-lb-x') || t.id === 'dm-lb') { closeLb(); return; }
    var prev = t.closest('[data-cs-prev]'), next = t.closest('[data-cs-next]');
    if (prev || next) {
      var r = root(t), tr = r && r.querySelector('[data-cs-track]');
      if (tr) go(tr, idx(tr) + (next ? 1 : -1));
      return;
    }
    var fig = t.closest('[data-cs-track] figure');
    if (fig) { var im = fig.querySelector('img'); if (im) openLb(im.getAttribute('src'), im.getAttribute('alt')); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLb(); return; }
    var a = document.activeElement;
    var tr = a && a.matches && a.matches('[data-cs-track]') ? a : null;
    if (tr && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { e.preventDefault(); go(tr, idx(tr) + (e.key === 'ArrowRight' ? 1 : -1)); }
  });
  document.addEventListener('scroll', function (e) {
    var tr = e.target;
    if (!tr || !tr.matches || !tr.matches('[data-cs-track]')) return;
    var r = root(tr), i = idx(tr);
    var cap = r.querySelector('[data-cs-cap]'), num = r.querySelector('[data-cs-num]');
    if (cap && tr.children[i]) cap.textContent = tr.children[i].getAttribute('data-cap') || '';
    if (num) num.textContent = String(i + 1);
  }, true);
})();
