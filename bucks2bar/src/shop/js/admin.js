let products = [];

// Load all products (for admin)
async function loadAdminProducts() {
  try {
    const res = await fetch('./products.json');
    products = await res.json();
    renderAdminProducts();
  } catch (err) {
    console.error('Error loading products for admin:', err);
  }
}

function renderAdminProducts() {
  adminProductList.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'col-md-3';
    div.innerHTML = `
      <div class="card h-100 p-3 shadow-sm">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p>Status: ${product.approved ? "✅ Approved" : "❌ Pending"}</p>
        <button class="btn btn-primary" onclick="toggleApproval(${product.id})">
          ${product.approved ? "Unapprove" : "Approve"}
        </button>
      </div>
    `;
    adminProductList.appendChild(div);
  });
}

function toggleApproval(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.approved = !product.approved;
    renderAdminProducts();
    alert(`Product "${product.name}" is now ${product.approved ? "Approved ✅" : "Pending ❌"}`);
  }
}
