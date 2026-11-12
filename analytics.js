/* AI Sales Advisory — consent-gated analytics (GA4 + Microsoft Clarity)
   Nothing is loaded and no cookies are set until a visitor clicks "Accept analytics".
   To switch on: paste your IDs below and deploy.
     GA4:     Google Analytics > Admin > Data streams > Web > Measurement ID (looks like G-XXXXXXXXXX)
     Clarity: clarity.microsoft.com > Settings > Overview > Project ID (looks like abcd1234ef)
   While both are empty, no banner is shown and nothing is tracked. */
(function () {
  var CONFIG = { ga4: 'G-Q4FV912GL2', clarity: '' };

  var KEY = 'asa-consent-v1';
  var enabled = !!(CONFIG.ga4 || CONFIG.clarity);
  var loaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function readChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function saveChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function page() { return (location.pathname.replace(/^\//, '') || 'index.html'); }

  /* Public helper: window.asaTrack('event_name', { ...params }) */
  window.asaTrack = function (name, params) {
    if (!loaded) return;
    params = params || {};
    params.page = params.page || page();
    if (CONFIG.ga4 && window.gtag) window.gtag('event', name, params);
    if (CONFIG.clarity && window.clarity) { try { window.clarity('event', name); } catch (e) {} }
  };

  function loadAnalytics() {
    if (loaded || !enabled) return;
    loaded = true;
    if (CONFIG.ga4) {
      window.gtag = gtag;
      gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.ga4);
      document.head.appendChild(s);
      gtag('js', new Date());
      gtag('config', CONFIG.ga4);
    }
    if (CONFIG.clarity) {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', CONFIG.clarity);
      window.clarity('consent');
    }
  }

  function clearAnalyticsCookies() {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (/^(_ga|_gid|_gat|_clck|_clsk|CLID|ANONCHK|MR|MUID|SM)/.test(name)) {
        ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      }
    });
  }

  function hideBanner() { var b = document.querySelector('.consent'); if (b) b.remove(); }

  function choose(v) {
    var before = readChoice();
    saveChoice(v);
    hideBanner();
    if (v === 'granted') { loadAnalytics(); return; }
    clearAnalyticsCookies();
    if (window.clarity) { try { window.clarity('consent', false); } catch (e) {} }
    if (before === 'granted' && loaded) location.reload();
  }

  function tools() {
    var t = [];
    if (CONFIG.ga4) t.push('Google Analytics');
    if (CONFIG.clarity) t.push('Microsoft Clarity');
    return t.join(' and ');
  }

  function showBanner() {
    if (document.querySelector('.consent')) return;
    var b = document.createElement('div');
    b.className = 'consent';
    b.setAttribute('role', 'region');
    b.setAttribute('aria-label', 'Cookie preferences');
    b.innerHTML =
      '<p>We’d like to use analytics cookies (' + tools() + ') to see how people use this site so we can improve it. They stay off unless you accept. <a href="privacy.html">Privacy notice</a></p>' +
      '<div class="consent-actions"><button type="button" class="button" data-consent="granted">Accept analytics</button>' +
      '<button type="button" class="button consent-reject" data-consent="denied">Reject</button></div>';
    b.addEventListener('click', function (e) {
      var t = e.target.closest('[data-consent]');
      if (t) choose(t.getAttribute('data-consent'));
    });
    document.body.appendChild(b);
  }

  function addSettingsLink() {
    var bottom = document.querySelector('.footer-bottom');
    if (!bottom || bottom.querySelector('.consent-settings')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'consent-settings';
    btn.textContent = 'Cookie settings';
    btn.addEventListener('click', showBanner);
    bottom.appendChild(btn);
  }

  function sectionOf(el) {
    var s = el.closest('section[id], section, header, footer, nav');
    if (!s) return 'page';
    if (s.id) return s.id;
    if (s.tagName === 'HEADER' || s.closest('header')) return 'header';
    if (s.tagName === 'FOOTER') return 'footer';
    return (s.className || '').split(' ')[0] || s.tagName.toLowerCase();
  }

  function bindEvents() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var text = (a.textContent || '').replace(/[↗︎↓→]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80);
      if (/contact\.html/.test(href)) {
        window.asaTrack('cta_click', { cta_text: text, cta_location: sectionOf(a) });
      } else if (/cal\.com/.test(href)) {
        window.asaTrack('booking_link_click', { cta_text: text });
      } else if (a.closest('header, .mobile-menu')) {
        window.asaTrack('nav_click', { link_text: text, link_url: href });
      }
    });
    document.querySelectorAll('details').forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        var q = d.querySelector('summary');
        window.asaTrack('faq_open', { question: q ? q.textContent.replace(/\+/g, '').trim().slice(0, 100) : '' });
      });
    });
    document.querySelectorAll('#use-cases [role="tab"], #use-cases button').forEach(function (t) {
      t.addEventListener('click', function () {
        window.asaTrack('use_case_view', { use_case: t.textContent.replace(/\s+/g, ' ').trim().slice(0, 60) });
      });
    });
    if (typeof window.Cal === 'function') {
      try {
        window.Cal('on', { action: 'linkReady', callback: function () { window.asaTrack('booking_calendar_view'); } });
        window.Cal('on', { action: 'eventTypeSelected', callback: function () { window.asaTrack('booking_started'); } });
        window.Cal('on', { action: 'bookingSuccessfulV2', callback: function () { window.asaTrack('generate_lead', { method: 'cal_com', lead_type: 'free_ai_sales_review' }); } });
      } catch (e) {}
    }
  }

  function init() {
    if (!enabled) return;
    addSettingsLink();
    bindEvents();
    var c = readChoice();
    if (c === 'granted') loadAnalytics();
    else if (c !== 'denied') showBanner();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
