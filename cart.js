(function () {
  var STORAGE_KEY = 'ravenridge_cart';

  function getCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
    return cart;
  }

  function addToCart(product, qty) {
    qty = qty > 0 ? qty : 1;
    var cart = getCart();
    var existing = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id) { existing = cart[i]; break; }
    }
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, icon: product.icon || '🛒', qty: qty });
    }
    return saveCart(cart);
  }

  function removeFromCart(id) {
    var cart = getCart().filter(function (item) { return item.id !== id; });
    return saveCart(cart);
  }

  function setQty(id, qty) {
    if (qty <= 0) { return removeFromCart(id); }
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) { cart[i].qty = qty; break; }
    }
    return saveCart(cart);
  }

  function getCount(cart) {
    cart = cart || getCart();
    return cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function getSubtotal(cart) {
    cart = cart || getCart();
    return cart.reduce(function (sum, item) { return sum + item.qty * item.price; }, 0);
  }

  function formatPrice(n) {
    var fixed = n.toFixed(2);
    return '$' + fixed.replace(/\.00$/, '');
  }

  function updateCartBadge() {
    var badge = document.getElementById('cart-badge');
    if (!badge) { return; }
    var count = getCount();
    badge.textContent = String(count);
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  function wireAddToCartButtons() {
    var buttons = document.querySelectorAll('[data-add-to-cart]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var qty = 1;
        var scope = btn.closest('.buy-row') || btn.parentElement || document;
        var qtySelect = scope.querySelector('.qty-select');
        if (qtySelect) {
          qty = parseInt(qtySelect.value, 10) || 1;
        }

        addToCart({
          id: btn.getAttribute('data-id'),
          name: btn.getAttribute('data-name'),
          price: parseFloat(btn.getAttribute('data-price')),
          icon: btn.getAttribute('data-icon')
        }, qty);

        var original = btn.textContent;
        btn.textContent = 'Added ✓';
        btn.classList.add('added');
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('added');
          btn.disabled = false;
        }, 1200);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateCartBadge();
    wireAddToCartButtons();
  });

  window.RavenCart = {
    getCart: getCart,
    saveCart: saveCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    setQty: setQty,
    getCount: getCount,
    getSubtotal: getSubtotal,
    formatPrice: formatPrice,
    updateCartBadge: updateCartBadge
  };
})();
