// FahriXZ Store - Search functionality
console.log("✅ Search.js loaded!");

// Global search function
window.searchProducts = function() {
  const keyword = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  
  if (!keyword) {
    if (typeof products !== 'undefined') {
      renderProducts(products);
    }
    return;
  }
  
  if (typeof products === 'undefined') return;
  
  const filtered = products.filter(p =>
    (p.name && p.name.toLowerCase().includes(keyword)) ||
    (p.category && p.category.toLowerCase().includes(keyword)) ||
    (p.desc && p.desc.toLowerCase().includes(keyword))
  );
  
  renderProducts(filtered);
};
