(function () {
  var script = document.currentScript;
  var base = (script && script.getAttribute('data-base')) || '.';
  var html = ''
    + '<a class="skip-link" href="#main-content">Skip to main content</a>'
    + '<div class="demo-banner">Demo website for portfolio purposes only &mdash; Raven &amp; Ridge Outfitters is a fictional company, not a real store. No orders are actually placed.</div>'
    + '<div class="banner">Free shipping on orders over $120 &middot; Raven\'s Nest members ship free, always</div>'
    + '<header>'
    + '  <a class="logo" href="' + base + '/index.html">🐦‍⬛ Raven &amp; Ridge</a>'
    + '  <nav class="nav-links" id="nav-links" aria-label="Primary">'
    + '    <a href="' + base + '/index.html#shop">Shop</a>'
    + '    <a href="' + base + '/offerings.html">Offerings</a>'
    + '    <a href="' + base + '/journal.html">Journal</a>'
    + '    <a href="' + base + '/about.html">About</a>'
    + '    <a href="' + base + '/locations.html">Locations</a>'
    + '    <a href="' + base + '/reviews.html">Reviews</a>'
    + '    <a href="' + base + '/faq.html">FAQ</a>'
    + '    <a href="#contact">Contact</a>'
    + '  </nav>'
    + '  <div class="header-actions">'
    + '    <a href="' + base + '/wishlist.html" class="cart-link" aria-label="View wishlist"><span aria-hidden="true">♡</span><span id="wishlist-badge" class="cart-badge">0</span></a>'
    + '    <a href="' + base + '/cart.html" class="cart-link" aria-label="View cart"><span aria-hidden="true">🛒</span><span id="cart-badge" class="cart-badge">0</span></a>'
    + '    <button type="button" class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links">&#9776;</button>'
    + '  </div>'
    + '</header>';
  document.write(html);

  var toggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('main-content')) { return; }
    var skip = [
      'SCRIPT', 'STYLE'
    ];
    var children = document.body.children;
    for (var i = 0; i < children.length; i++) {
      var el = children[i];
      if (skip.indexOf(el.tagName) !== -1) { continue; }
      var cls = el.className || '';
      if (el.tagName === 'A' && cls.indexOf('skip-link') !== -1) { continue; }
      if (cls.indexOf('demo-banner') !== -1) { continue; }
      if (cls.indexOf('banner') !== -1 && cls.indexOf('demo-banner') === -1) { continue; }
      if (el.tagName === 'HEADER') { continue; }
      el.id = 'main-content';
      el.setAttribute('tabindex', '-1');
      break;
    }
  });
})();
