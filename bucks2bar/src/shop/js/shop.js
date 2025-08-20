// =================== DOM Elements ===================
const loginSection = document.getElementById('loginSection');
const shopSection = document.getElementById('shopSection');
const adminSection = document.getElementById('adminSection');
const loginBtn = document.getElementById('loginBtn');
const loginMsg = document.getElementById('loginMsg');
const productList = document.getElementById('productList');
const offerProducts = document.getElementById('offerProducts');
const adminProductList = document.getElementById('adminProductList');

let loggedInUser = null;
let loginMode = null; // "user" or "admin"

// =================== Dummy credentials ===================
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];
const admins = [
  { username: 'admin', password: 'admin123' }
];

// =================== Login Mode ===================
function setLoginMode(mode) {
  loginMode = mode;
  const loginTitle = document.getElementById('loginTitle');
  loginTitle.textContent = mode === "admin" ? "Admin Login" : "User Login";

  loginSection.style.display = 'block';
  shopSection.style.display = 'none';
  adminSection.style.display = 'none';
  loginMsg.textContent = '';

  loginBtn.onclick = handleLogin;
}

// =================== Login Handler ===================
function handleLogin() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (loginMode === "user") {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      loggedInUser = user;
      loginSection.style.display = 'none';
      shopSection.style.display = 'block';
      loadProducts();
    } else {
      loginMsg.textContent = '❌ Invalid user credentials';
    }
  } else if (loginMode === "admin") {
    const admin = admins.find(a => a.username === username && a.password === password);
    if (admin) {
      loggedInUser = admin;
      loginSection.style.display = 'none';
      adminSection.style.display = 'block';
      loadAdminProducts();
    } else {
      loginMsg.textContent = '❌ Invalid admin credentials';
    }
  } else {
    loginMsg.textContent = '⚠️ Please select login mode first';
  }
}

// =================== Load Products ===================
async function loadProducts() {
  try {
    const res = await fetch('./products.json');
    const products = await res.json();

    // ===== Offers Section (first 4 products with offer = true) =====
    offerProducts.innerHTML = '';
    products.filter(p => p.offer).slice(0, 4).forEach(product => {
      const div = document.createElement('div');
      div.className = 'col-md-3';
      div.innerHTML = `
        <div class="card h-100 p-2 shadow-sm">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p><span class="price">$${product.offerPrice}</span>
            <span class="old-price text-muted text-decoration-line-through">$${product.price}</span></p>
            <button class="btn btn-success w-100" onclick="purchase(${product.id})">Buy Now</button>
          </div>
        </div>
      `;
      offerProducts.appendChild(div);
    });

    // ===== All Products Section (approved only) =====
    productList.innerHTML = '';
    products.filter(p => p.approved).forEach(product => {
      const div = document.createElement('div');
      div.className = 'col-md-3';
      div.innerHTML = `
        <div class="card h-100 p-2 shadow-sm">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p><span class="price">$${product.price}</span></p>
            <button class="btn btn-primary w-100" onclick="purchase(${product.id})">Add to Cart</button>
          </div>
        </div>
      `;
      productList.appendChild(div);
    });

  } catch (err) {
    console.error("Error loading products:", err);
  }
}

// =================== Load Admin Products ===================
async function loadAdminProducts() {
  try {
    const res = await fetch('./products.json');
    const products = await res.json();

    adminProductList.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'col-md-4';
      div.innerHTML = `
        <div class="card p-3 shadow-sm">
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <p><strong>Price:</strong> $${product.price}</p>
          <p><strong>Approved:</strong> ${product.approved ? '✅ Yes' : '❌ No'}</p>
        </div>
      `;
      adminProductList.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading admin products:", err);
  }
}

// =================== Purchase Action ===================
function purchase(productId) {
  alert(`✅ Purchase successful for product ID ${productId}!`);
}

// =================== Call on page load ===================
window.onload = loadProducts;
