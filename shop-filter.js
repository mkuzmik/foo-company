(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('products-grid');
    var sortSelect = document.getElementById('shop-sort');
    var filterGroup = document.getElementById('shop-filters');
    var emptyMsg = document.getElementById('shop-empty');
    if (!grid || !sortSelect || !filterGroup) { return; }

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.product-card'));
    var originalOrder = cards.slice();
    var activeFilter = 'all';

    function applyFilterAndSort() {
      var visibleCount = 0;

      var sorted = originalOrder.slice();
      var sortValue = sortSelect.value;
      if (sortValue === 'price-asc') {
        sorted.sort(function (a, b) { return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price')); });
      } else if (sortValue === 'price-desc') {
        sorted.sort(function (a, b) { return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price')); });
      } else if (sortValue === 'rating-desc') {
        sorted.sort(function (a, b) { return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating')); });
      }

      sorted.forEach(function (card) {
        grid.appendChild(card);
        var matches = activeFilter === 'all' || card.getAttribute('data-category') === activeFilter;
        card.style.display = matches ? '' : 'none';
        if (matches) { visibleCount++; }
      });

      if (emptyMsg) {
        emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    filterGroup.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.filter-pill') : null;
      if (!btn) { return; }
      activeFilter = btn.getAttribute('data-filter');
      var pills = filterGroup.querySelectorAll('.filter-pill');
      for (var i = 0; i < pills.length; i++) {
        pills[i].classList.toggle('active', pills[i] === btn);
      }
      applyFilterAndSort();
    });

    sortSelect.addEventListener('change', applyFilterAndSort);
  });
})();
