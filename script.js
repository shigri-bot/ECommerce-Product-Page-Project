const products = [
    { id: 1, name: "Laptop", price: 1200, category: "electronics", img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "Smartphone", price: 800, category: "electronics", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, name: "Headphones", price: 150, category: "electronics", img: "https://plus.unsplash.com/premium_photo-1677838847804-4054143fb91a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "T-Shirt", price: 25, category: "fashion", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, name: "Sneakers", price: 90, category: "fashion", img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, name: "Coffee Maker", price: 70, category: "home", img: "https://images.unsplash.com/photo-1625862956143-6a50e41200b9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 7, name: "Sofa", price: 450, category: "home", img: "https://plus.unsplash.com/premium_photo-1664544673662-e80e311da294?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 8, name: "Watch", price: 120, category: "fashion", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

let cart = [];

const productGrid = document.getElementById('productGrid');
const categoryFilter = document.getElementById('categoryFilter');
const sortProducts = document.getElementById('sortProducts');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartCount = document.getElementById('cartCount');

function displayProducts(list) {
    productGrid.innerHTML = '';
    list.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('product-card');
        div.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p>$${p.price}</p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(div);
    });
}

// CART FUNCTIONS
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(c => c.id === id);
    if (cartItem) {
        cartItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;

        const li = document.createElement('li');

        li.innerHTML = `
            <span>${item.name}</span>
            <div class="qty-controls">
                <button onclick="changeQty(${item.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
            <span>$${(item.price * item.qty).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})"><i class="fa fa-trash"></i></button>
        `;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((a, b) => a + b.qty, 0);
}

// Change Quantity Function
function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty < 1) item.qty = 1;
        updateCart();
    }
}


function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// FILTER & SORT
categoryFilter.addEventListener('change', () => {
    let filtered = categoryFilter.value === 'all' ? products : products.filter(p => p.category === categoryFilter.value);
    displayProducts(filtered);
});

sortProducts.addEventListener('change', () => {
    let sorted = [...products];
    const value = sortProducts.value;
    if (value === 'priceLow') sorted.sort((a, b) => a.price - b.price);
    if (value === 'priceHigh') sorted.sort((a, b) => b.price - a.price);
    if (value === 'nameAsc') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (value === 'nameDesc') sorted.sort((a, b) => b.name.localeCompare(a.name)).reverse();
    displayProducts(sorted);
});

// CART MODAL
cartIcon.addEventListener('click', () => { cartModal.style.display = 'block'; });
closeCart.addEventListener('click', () => { cartModal.style.display = 'none'; });
checkoutBtn.addEventListener('click', () => {
    alert('Checkout simulation completed!');
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
});

// INITIAL DISPLAY
displayProducts(products);

const burger = document.querySelector('nav .burger');
const navLinks = document.querySelector('nav ul');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate burger lines
    burger.classList.toggle('toggle');
});
