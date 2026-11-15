/* ============================================================
   angelsimcha.com | shared behaviour
   - injects the nav and footer on every page (edit them ONCE here)
   - scroll reveal, gallery, marquee, lightbox, copy buttons, contact form
   ============================================================ */
(function () {
  'use strict';

  var SITE = {
    email: 'contact@angelsimcha.com',
    linkedin: 'https://www.linkedin.com/in/angel-nwafor',
    instagram: 'https://instagram.com/theangelsimcha',
    x: 'https://x.com/theangelsimcha',
    github: 'https://github.com/Chiagoziem-Angel',
    linktree: 'https://linktr.ee/angelsimcha',
    operatorsCorner: 'https://operatorscorner.com',
    operatorsChannel: 'https://whatsapp.com/channel/0029Vb6EjozDp2Q3jPYFgu0X',
    store: 'https://selar.com/m/angelsimcha',
    bookstore: 'https://wa.me/c/2348165649262'
  };

  var NAV = [
    ['work.html', 'Work'],
    ['credentials.html', 'Credentials'],
    ['gallery.html', 'Gallery'],
    ['writing.html', 'Writing'],
    ['about.html', 'About'],
    ['press-kit.html', 'Press Kit'],
    ['contact.html', 'Contact']
  ];

  function page() {
    var p = location.pathname.split('/').pop() || 'index.html';
    return p === '' ? 'index.html' : p;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---------- Nav ---------- */
  function buildNav() {
    var host = document.getElementById('site-nav');
    if (!host) return;
    var cur = page();
    var links = NAV.map(function (n) {
      return '<a href="' + n[0] + '"' + (n[0] === cur ? ' class="active"' : '') + '>' + n[1] + '</a>';
    }).join('');
    host.className = 'site-nav';
    host.innerHTML =
      '<div class="wrap">' +
      '<a href="index.html" class="logo">Angel<span>.</span></a>' +
      '<button class="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span></button>' +
      '<nav class="nav-links" aria-label="Main">' + links + '</nav>' +
      '</div>';
    var btn = host.querySelector('.nav-toggle');
    var menu = host.querySelector('.nav-links');
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;
    host.className = 'site-footer';
    host.innerHTML =
      '<div class="wrap">' +
      '<div class="footer-grid">' +
      '<div><div class="f-brand">Angel<span>.</span></div>' +
      '<p>COO and Responsible AI Lead at Hammet. Building education and leadership infrastructure in Africa.</p></div>' +
      '<div><h4>Follow along</h4>' +
      '<a href="' + SITE.linkedin + '" target="_blank" rel="noopener">LinkedIn</a>' +
      '<a href="' + SITE.instagram + '" target="_blank" rel="noopener">Instagram</a>' +
      '<a href="' + SITE.x + '" target="_blank" rel="noopener">X (Twitter)</a>' +
      '<a href="' + SITE.github + '" target="_blank" rel="noopener">GitHub</a>' +
      '<a href="' + SITE.linktree + '" target="_blank" rel="noopener">All my links</a></div>' +
      '<div><h4>Resources</h4>' +
      '<a href="' + SITE.operatorsCorner + '" target="_blank" rel="noopener">Operators Corner</a>' +
      '<a href="' + SITE.operatorsChannel + '" target="_blank" rel="noopener">Operators Corner on WhatsApp</a>' +
      '<a href="' + SITE.store + '" target="_blank" rel="noopener">My Little Store</a>' +
      '<a href="' + SITE.bookstore + '" target="_blank" rel="noopener">The Zoe Bookstore</a>' +
      '<a href="mailto:' + SITE.email + '">' + SITE.email + '</a></div>' +
      '</div>' +
      '<div class="copyright">&copy; ' + new Date().getFullYear() + ' Angel Simcha. Built with intention.</div>' +
      '</div>';
  }

  /* ---------- Scroll reveal ---------- */
  var io = null;
  function observeReveals(root) {
    var els = (root || document).querySelectorAll('.reveal:not(.show)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('show'); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
    }
    els.forEach(function (e) { io.observe(e); });
  }
  window.observeReveals = observeReveals;

  /* ---------- Gallery helpers ---------- */
  function placeholder(item, cls) {
    var d = document.createElement('div');
    d.className = cls || 'ph-fill';
    d.textContent = item.caption || 'Photo';
    return d;
  }

  function mediaFor(item, phClass, eager) {
    var img = new Image();
    img.alt = item.caption || '';
    if (!eager) img.loading = 'lazy';
    img.src = item.src;
    img.onerror = function () {
      if (img.parentNode) img.parentNode.replaceChild(placeholder(item, phClass), img);
    };
    return img;
  }

  var GAL = [];

  function buildGalleryPage() {
    var grid = document.getElementById('gallery-grid');
    if (!grid || !window.GALLERY) return;
    var tones = ['', 'tone-indigo', '', 'tone-gold'];

    window.GALLERY.forEach(function (item, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'g-item reveal shape-' + (item.shape || 'sq') + ' ' + tones[i % tones.length];
      b.style.setProperty('--d', ((i % 6) * 70) + 'ms');
      b.setAttribute('data-cat', item.cat);
      b.setAttribute('aria-label', 'Open photo: ' + (item.caption || ''));
      b.appendChild(mediaFor(item, 'ph-fill'));
      var cap = document.createElement('span');
      cap.className = 'cap';
      cap.textContent = item.caption || '';
      b.appendChild(cap);
      b.addEventListener('click', function () { openLightbox(b); });
      b._item = item;
      grid.appendChild(b);
    });

    var fh = document.getElementById('gallery-filters');
    if (fh && window.GALLERY_CATS) {
      window.GALLERY_CATS.forEach(function (c, i) {
        var f = document.createElement('button');
        f.type = 'button';
        f.className = 'filter-btn' + (i === 0 ? ' active' : '');
        f.textContent = c.label;
        f.addEventListener('click', function () {
          fh.querySelectorAll('.filter-btn').forEach(function (x) { x.classList.remove('active'); });
          f.classList.add('active');
          grid.querySelectorAll('.g-item').forEach(function (g) {
            var show = c.id === 'all' || g.getAttribute('data-cat') === c.id;
            g.classList.toggle('hide', !show);
            if (show) { g.classList.remove('show'); void g.offsetWidth; g.classList.add('show'); }
          });
        });
        fh.appendChild(f);
      });
    }
    observeReveals(grid);
  }

  function buildMarquee() {
    var host = document.getElementById('gallery-marquee');
    if (!host || !window.GALLERY) return;
    var track = document.createElement('div');
    track.className = 'marquee-track';
    var items = window.GALLERY.slice(0, 10);
    function pass() {
      items.forEach(function (item) {
        var d = document.createElement('div');
        d.className = 'm-item';
        d.appendChild(mediaFor(item, 'ph-fill', true));
        track.appendChild(d);
      });
    }
    pass(); pass();
    host.appendChild(track);
  }

  /* ---------- Lightbox ---------- */
  var lb, lbFig, lbIdx = 0, lbList = [];
  function ensureLightbox() {
    if (lb) return;
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous">&#8249;</button>' +
      '<button class="lb-btn lb-next" aria-label="Next">&#8250;</button>' +
      '<figure></figure>';
    document.body.appendChild(lb);
    lbFig = lb.querySelector('figure');
    lb.querySelector('.lb-close').onclick = closeLightbox;
    lb.querySelector('.lb-prev').onclick = function () { stepLightbox(-1); };
    lb.querySelector('.lb-next').onclick = function () { stepLightbox(1); };
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });
  }
  function renderLightbox() {
    var item = lbList[lbIdx]._item;
    lbFig.innerHTML = '';
    var img = new Image();
    var triedFull = !item.full;
    img.src = item.full || item.src;
    img.alt = item.caption || '';
    img.onerror = function () {
      // fall back to the normal-size photo if the large one is missing
      if (!triedFull) { triedFull = true; img.src = item.src; return; }
      var p = document.createElement('div');
      p.className = 'lb-ph';
      p.textContent = item.caption || 'Photo';
      if (img.parentNode) img.parentNode.replaceChild(p, img);
    };
    lbFig.appendChild(img);
    var c = document.createElement('figcaption');
    c.textContent = item.caption || '';
    lbFig.appendChild(c);
  }
  function openLightbox(btn) {
    ensureLightbox();
    lbList = Array.prototype.filter.call(document.querySelectorAll('#gallery-grid .g-item'), function (g) { return !g.classList.contains('hide'); });
    lbIdx = lbList.indexOf(btn);
    renderLightbox();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  function stepLightbox(d) {
    lbIdx = (lbIdx + d + lbList.length) % lbList.length;
    renderLightbox();
  }

  /* ---------- Copy buttons (press kit) ---------- */
  function wireCopy() {
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = document.querySelector(btn.getAttribute('data-copy'));
        if (!target) return;
        var text = target.innerText.trim();
        function done() {
          var old = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(function () { btn.textContent = old; }, 1600);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, done);
        } else {
          var ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch (e) {}
          document.body.removeChild(ta); done();
        }
      });
    });
  }

  /* ---------- Image slots with colour fallback (work cards, press photos) ---------- */
  function wireImageSlots() {
    document.querySelectorAll('img[data-fallback]').forEach(function (img) {
      // the error may already have fired before this script ran
      if (img.complete && img.naturalWidth === 0) img.style.display = 'none';
      img.addEventListener('error', function () { img.style.display = 'none'; });
    });
  }

  /* ---------- Contact form (AJAX to Formspree, then redirect) ---------- */
  function wireContact() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var status = document.getElementById('form-status');
    var btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      btn.disabled = true; btn.textContent = 'Sending...';
      status.style.display = 'none';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (r) {
          if (r.ok) { location.href = 'contact-success.html'; return; }
          throw new Error('bad');
        })
        .catch(function () {
          btn.disabled = false; btn.textContent = 'Send Message';
          status.textContent = 'Something went wrong. Please email ' + SITE.email + ' directly.';
          status.style.display = 'block';
        });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildNav();
    buildFooter();
    buildGalleryPage();
    buildMarquee();
    wireCopy();
    wireImageSlots();
    wireContact();
    observeReveals();
  });
})();
