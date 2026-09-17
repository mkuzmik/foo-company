(function () {
  var script = document.currentScript;
  var base = (script && script.getAttribute('data-base')) || '.';
  var html = ''
    + '<div class="demo-banner">Demo website for portfolio purposes only &mdash; Raven &amp; Ridge Outfitters is a fictional company, not a real store. No orders are actually placed.</div>'
    + '<div class="banner">Free shipping on orders over $120 &middot; Raven\'s Nest members ship free, always</div>'
    + '<header>'
    + '  <a class="logo" href="' + base + '/index.html">🐦‍⬛ Raven &amp; Ridge</a>'
    + '  <nav>'
    + '    <a href="' + base + '/index.html#shop">Shop</a>'
    + '    <a href="' + base + '/offerings.html">Offerings</a>'
    + '    <a href="' + base + '/journal.html">Journal</a>'
    + '    <a href="' + base + '/about.html">About</a>'
    + '    <a href="' + base + '/locations.html">Locations</a>'
    + '    <a href="' + base + '/reviews.html">Reviews</a>'
    + '    <a href="' + base + '/faq.html">FAQ</a>'
    + '    <a href="#contact">Contact</a>'
    + '    <a href="' + base + '/cart.html" class="cart-link">🛒<span id="cart-badge" class="cart-badge">0</span></a>'
    + '  </nav>'
    + '</header>';
  document.write(html);
})();
