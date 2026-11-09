/* Mounts the Cal.com booking calendar on contact.html, with a fallback if it fails to load */
(function () {
  var booking = document.querySelector('#cal-booking');
  if (!booking || typeof Cal !== 'function') return;
  var ready = false;
  Cal('on', { action: 'linkReady', callback: function () {
    ready = true;
    var l = booking.querySelector('.calendar-loader'); if (l) l.remove();
  } });
  Cal('inline', { elementOrSelector: '#cal-booking', calLink: 'aisalesadvisory/discovery-call', config: { layout: 'month_view' } });
  setTimeout(function () {
    if (ready) return;
    booking.innerHTML = '<div class="calendar-loader"><span>Live availability didn’t load. <a href="https://cal.com/aisalesadvisory/discovery-call">Open the booking calendar</a>.</span></div>';
  }, 10000);
})();
