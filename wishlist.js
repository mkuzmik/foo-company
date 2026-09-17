(function () {
  var STORAGE_KEY = 'ravenridge_wishlist';

  function getList() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveList(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    updateWishlistBadge();
    return list;
  }

  function isInWishlist(id) {
    return getList().some(function (item) { return item.id === id; });
  }

  function addToWishlist(product) {
    var list = getList();
    if (!list.some(function (item) { return item.id === product.id; })) {
      list.push({ id: product.id, name: product.name, price: product.price, icon: product.icon || '🛍️' });
    }
    return saveList(list);
  }

  function removeFromWishlist(id) {
    var list = getList().filter(function (item) { return item.id !== id; });
    return saveList(list);
  }

  function toggleWishlist(product) {
    return isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product);
  }

  function getCount() {
    return getList().length;
  }

  function updateWishlistBadge() {
    var badge = document.getElementById('wishlist-badge');
    if (!badge) { return; }
    var count = getCount();
    badge.textContent = String(count);
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  function setButtonState(btn, saved) {
    btn.classList.toggle('saved', saved);
    btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    var label = btn.querySelector('.wishlist-btn-label');
    if (label) {
      label.textContent = saved ? 'Saved' : 'Save';
    }
  }

  function wireWishlistButtons() {
    var buttons = document.querySelectorAll('[data-add-to-wishlist]');
    buttons.forEach(function (btn) {
      var product = {
        id: btn.getAttribute('data-id'),
        name: btn.getAttribute('data-name'),
        price: parseFloat(btn.getAttribute('data-price')),
        icon: btn.getAttribute('data-icon')
      };
      setButtonState(btn, isInWishlist(product.id));
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
        setButtonState(btn, isInWishlist(product.id));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateWishlistBadge();
    wireWishlistButtons();
  });

  window.RavenWishlist = {
    getList: getList,
    saveList: saveList,
    isInWishlist: isInWishlist,
    addToWishlist: addToWishlist,
    removeFromWishlist: removeFromWishlist,
    toggleWishlist: toggleWishlist,
    getCount: getCount,
    updateWishlistBadge: updateWishlistBadge
  };
})();
