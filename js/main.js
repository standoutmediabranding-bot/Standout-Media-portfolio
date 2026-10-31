/* Standout Media - editing portfolio */
const CONFIG = {
  // Country code + number. Change here and every WhatsApp link updates.
  whatsapp: '918270340306',
  message: 'Hi Standout Media, I saw your editing portfolio and I want to talk about a project.'
};

const waLink = (text) => 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text || CONFIG.message);
document.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(); a.target = '_blank'; a.rel = 'noopener'; });

/* nav */
const nav = document.querySelector('.nav');
const links = document.querySelector('.nav-links');
document.querySelector('.burger')?.addEventListener('click', () => links.classList.toggle('open'));
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
const onScroll = () => nav?.classList.toggle('solid', scrollY > 30);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* reveal */
const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
const watch = (root) => root.querySelectorAll('.rv').forEach(el => io.observe(el));
watch(document);

/* video helpers */
function parseVideo(url) {
  if (!url) return null;
  let m;
  if ((m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|watch\?v=))([\w-]{11})/))) {
    return { embed: 'https://www.youtube.com/embed/' + m[1] + '?autoplay=1&rel=0', thumb: 'https://i.ytimg.com/vi/' + m[1] + '/maxresdefault.jpg', thumbLow: 'https://i.ytimg.com/vi/' + m[1] + '/hqdefault.jpg' };
  }
  if ((m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/))) return { embed: 'https://drive.google.com/file/d/' + m[1] + '/preview' };
  return { embed: url };
}

/* modal */
const modal = document.getElementById('modal');
const box = modal?.querySelector('.modal-box');
const ratio = modal?.querySelector('.modal-ratio');
const cap = modal?.querySelector('.modal-cap');
function openVideo(url, vertical, caption) {
  const v = parseVideo(url); if (!v) return;
  box.classList.toggle('v', !!vertical);
  ratio.innerHTML = '<iframe src="' + v.embed + '" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
  cap.textContent = caption || '';
  modal.classList.add('on');
}
const closeVideo = () => { modal.classList.remove('on'); ratio.innerHTML = ''; };
modal?.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('.modal-x')) closeVideo(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideo(); });

/* showreel */
const reel = document.getElementById('reel');
if (reel && typeof SHOWREEL !== 'undefined') {
  /* no showreel link yet: hide the player block until SHOWREEL is set in works.js */
  if (!SHOWREEL) reel.closest('.reel').style.display = 'none';
  const v = parseVideo(SHOWREEL);
  if (v && v.thumb) reel.insertAdjacentHTML('afterbegin', '<img src="' + v.thumb + '" alt="Showreel">');
  reel.addEventListener('click', () => openVideo(SHOWREEL, false, 'Standout Media showreel'));
}

/* work: every category is its own section with its own layout */
const host = document.getElementById('works');
if (host && typeof WORKS !== 'undefined') {
  const play = '<div class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>';

  const card = (w, span) => {
    const v = parseVideo(w.url);
    const img = w.thumb || (v && v.thumb) || '';
    return '<article class="card ' + w.orient + ' ' + (span || '') + '" data-i="' + WORKS.indexOf(w) + '">' +
      '<div class="thumb">' + (img ? '<img src="' + img + '"' + (!w.thumb && v && v.thumbLow ? ' onerror="this.onerror=null;this.src=\'' + v.thumbLow + '\'"' : '') + ' alt="' + w.title + '" loading="lazy">' : '<span class="ph">Video link soon</span>') +
      (w.cat === 'thumb' ? '' : play) + '</div>' +
      '<div class="cmeta"><b>' + w.title + '</b><span>' + (w.result || w.client) + '</span></div></article>';
  };

  host.innerHTML = CATEGORIES.map(c => {
    const items = WORKS.filter(w => w.cat === c.key);
    let body = '';
    let hstats = '';
    let bodyCls = 'wb-body';
    const tiles = (st) => st.map((s, i) => '<div class="stat' + (i ? ' lt' : '') + '"><b>' + s.n + '</b><span>' + s.t + '</span></div>').join('');
    if (c.layout === 'case') {
      const prof = c.profile ? '<img src="' + c.profile + '" alt="' + c.profileAlt + '">' : '<span class="ph">Profile screenshot placeholder</span>';
      body = '<div class="case-l"><div class="profile">' + prof + '</div><div class="tiles2">' + tiles(c.stats) + '</div></div>' +
        '<div class="case-r">' + items.map(w => card(w)).join('') + '</div>';
      bodyCls = 'case';
    } else if (c.layout === 'podcast') {
      const p = c.person;
      body = '<div class="pod-top">' +
        '<div class="pface"><img src="' + p.photo + '" alt="' + p.name + '"><div><h4 class="display">' + p.name + '</h4><p>' + p.show + '</p><span class="pill">' + p.handle + '</span></div></div>' +
        '<div class="pshot"><img src="' + p.proof + '" alt="' + p.show + ' Instagram profile"></div>' +
        '<div class="ptiles">' + tiles(c.stats) + '</div></div>' +
        '<div class="wb-body" style="margin-top:16px">' + items.map(w => card(w)).join('') + '</div>';
      bodyCls = 'podwrap';
    } else {
      if (c.stats) hstats = '<div class="hstats">' + c.stats.map(s => '<span class="pill hs"><b>' + s.n + '</b>' + s.t + '</span>').join('') + '</div>';
      if (c.layout === 'v4') body = items.map(w => card(w)).join('');
      else if (c.layout === 'duo' || c.layout === 'thumbs') body = items.map(w => card(w, 's6')).join('');
      else if (c.layout === 'feature') {
        const rest = items.slice(1), n = rest.length;
        const sp = n === 1 ? 's12' : n === 2 ? 's6' : n === 3 ? 's4' : 's6';
        body = card(items[0], 's12') + rest.map(w => card(w, sp)).join('');
      }
    }
    return '<section class="wblock rv ' + (c.tone || 'white') + '" id="w-' + c.key + '">' +
      '<div class="wb-head"><div><span class="pill">' + c.label + '</span><h3 class="display">' + c.title + '</h3></div>' +
      '<div><p>' + c.desc + '</p>' + hstats + '</div></div>' +
      '<div class="' + bodyCls + '">' + body + '</div></section>';
  }).join('');
  watch(host);

  host.addEventListener('click', (e) => {
    const c = e.target.closest('.card'); if (!c) return;
    const w = WORKS[c.dataset.i];
    if (w.cat === 'thumb') return;
    openVideo(w.url, w.orient === 'v', w.title + (w.result ? '  |  ' + w.result : ''));
  });
}

/* before / after */
document.querySelectorAll('.ba').forEach(ba => {
  const r = ba.querySelector('input');
  const set = () => ba.style.setProperty('--p', r.value + '%');
  r.addEventListener('input', set); set();
});

/* contact form -> WhatsApp */
const form = document.getElementById('waForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const text = 'Hi Standout Media, I am ' + d.name + ' and I would like to book a call.\nType of video: ' + d.type + '\nBudget: ' + (d.budget || 'not sure yet') + '\n\nAbout the project:\n' + (d.msg || '');
  window.open(waLink(text), '_blank', 'noopener');
});

/* services: spotlight follows the cursor */
document.querySelectorAll('.bx').forEach(el => el.addEventListener('pointermove', (e) => {
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  el.style.setProperty('--my', (e.clientY - r.top) + 'px');
}));

/* stagger reveals inside groups */
document.querySelectorAll('.bento, .proc, .vals, .stat-pill, .faq, .tools, .tkit').forEach(p => [...p.children].forEach((c, i) => c.style.setProperty('--d', (i * 110) + 'ms')));

/* spotlight on process cards */
document.querySelectorAll('.pc, .val').forEach(el => el.addEventListener('pointermove', (e) => {
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  el.style.setProperty('--my', (e.clientY - r.top) + 'px');
}));

/* count-up numbers */
(function () {
  const els = [...document.querySelectorAll('.stat-pill b, .stat b')];
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const co = new IntersectionObserver((es) => es.forEach(e => {
    if (!e.isIntersecting) return;
    co.unobserve(e.target);
    const el = e.target, m = el.dataset.t.match(/^([\d.]+)(.*)$/);
    if (!m) return;
    const end = parseFloat(m[1]), dec = (m[1].split('.')[1] || '').length, suf = m[2], t0 = performance.now(), dur = 1500;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = (end * ease(p)).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step); else el.textContent = el.dataset.t;
    };
    requestAnimationFrame(step);
  }), { threshold: .6 });
  els.forEach(el => { el.dataset.t = el.textContent.trim(); co.observe(el); });
})();

/* custom cursor */
(function () {
  if (matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const dot = document.createElement('div'); dot.className = 'cur';
  const ring = document.createElement('div'); ring.className = 'cur-ring';
  document.body.append(dot, ring);
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY; document.body.classList.add('has-cur');
    dot.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    ring.classList.toggle('hov', !!e.target.closest('a, button, .card, .bx, .pc, summary, input, select, textarea, .ba'));
  }, { passive: true });
  document.addEventListener('pointerleave', () => document.body.classList.remove('has-cur'));
  (function loop() { rx += (x - rx) * .16; ry += (y - ry) * .16; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)'; requestAnimationFrame(loop); })();
})();

/* warm up YouTube connections so the player starts faster */
(function () {
  if (!document.getElementById('works') && !document.getElementById('reel')) return;
  ['https://www.youtube.com', 'https://i.ytimg.com', 'https://www.google.com', 'https://googleads.g.doubleclick.net'].forEach(h => {
    const l = document.createElement('link'); l.rel = 'preconnect'; l.href = h; document.head.appendChild(l);
  });
})();

/* raw vs edited: slider over two YouTube players that play in sync */
(function () {
  const ba = document.querySelector('.ba[data-raw]');
  const btn = document.getElementById('baPlay');
  if (!ba || !btn) return;
  let raw, edit, ready = 0, playing = false, timer = null;
  const label = btn.querySelector('span');
  const icon = btn.querySelector('svg path');
  const PLAY = 'M8 5v14l11-7z', PAUSE = 'M6 5h4v14H6zM14 5h4v14h-4z';
  const ui = (on) => { playing = on; label.textContent = on ? 'Pause' : 'Play both'; icon.setAttribute('d', on ? PAUSE : PLAY); };
  const vars = { controls: 0, rel: 0, modestbranding: 1, playsinline: 1, disablekb: 1, fs: 0, iv_load_policy: 3, loop: 0 };

  function build() {
    raw = new YT.Player('ytRaw', { videoId: ba.dataset.raw, playerVars: vars, events: { onReady: (e) => { e.target.mute(); ready++; } } });
    edit = new YT.Player('ytEdit', { videoId: ba.dataset.edit, playerVars: vars, events: {
      onReady: () => { ready++; },
      onStateChange: (e) => { if (e.data === YT.PlayerState.ENDED) { raw.seekTo(0, true); edit.seekTo(0, true); raw.playVideo(); edit.playVideo(); } }
    } });
  }
  function load() {
    if (window.YT && YT.Player) return build();
    const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(s);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { if (prev) prev(); build(); };
  }
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { load(); o.disconnect(); } }, { rootMargin: '300px' }).observe(ba);

  btn.addEventListener('click', () => {
    if (ready < 2) return;
    if (playing) { raw.pauseVideo(); edit.pauseVideo(); clearInterval(timer); ui(false); return; }
    ba.classList.add('playing');
    edit.unMute(); raw.mute();
    raw.seekTo(edit.getCurrentTime(), true);
    raw.playVideo(); edit.playVideo(); ui(true);
    clearInterval(timer);
    timer = setInterval(() => {
      const d = raw.getCurrentTime() - edit.getCurrentTime();
      if (Math.abs(d) > .35) raw.seekTo(edit.getCurrentTime(), true);
    }, 600);
  });
})();
