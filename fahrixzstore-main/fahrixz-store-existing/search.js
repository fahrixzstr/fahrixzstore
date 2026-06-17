// js/search.js
// Search Functions

/* Filter Data */
window.filterData = function(data, keyword) {
  return data.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );
};

/* Search Products */
window.searchProducts = function() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const grid = document.getElementById('productGrid');

  if (!keyword) {
    renderProducts(products);
    return;
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword) ||
    p.category.toLowerCase().includes(keyword) ||
    p.desc.toLowerCase().includes(keyword)
  );

  renderProducts(filtered);
};

console.log("✅ Search.js loaded!");