// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    setupEventListeners();
});

// Load cart items from localStorage
function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartDiv = document.getElementById('empty-cart');
    
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCartDiv.style.display = 'block';
        updateSummary();
        return;
    }
    
    cartItemsContainer.style.display = 'block';
    emptyCartDiv.style.display = 'none';
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = createCartItemElement(item, index);
        cartItemsContainer.appendChild(cartItem);
    });
    
    updateSummary();
}

// Create cart item element
function createCartItemElement(item, index) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <img src="../assets/${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price.toFixed(2)} each</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" 
                       min="1" onchange="updateQuantityInput(${index}, this.value)">
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
        </div>
        <div class="cart-item-total">₹${(item.price * item.quantity).toFixed(2)}</div>
        <button class="remove-item" onclick="removeItem(${index})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    return cartItem;
}

// Update quantity with +/- buttons
function updateQuantity(index, change) {
    if (cart[index].quantity + change < 1) {
        showNotification('Quantity cannot be less than 1', 'warning');
        return;
    }
    
    cart[index].quantity += change;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    showNotification('Cart updated!', 'success');
}

// Update quantity with input field
function updateQuantityInput(index, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) {
        showNotification('Please enter a valid quantity', 'warning');
        loadCart(); // Reload to reset invalid input
        return;
    }
    
    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    showNotification('Cart updated!', 'success');
}

// Remove item from cart
function removeItem(index) {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    showNotification(`${itemName} removed from cart`, 'info');
}

// Update cart summary
function updateSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 499 ? 0 : 99; // Free shipping over ₹499
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
    
    // Enable/disable checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = cart.length === 0;
}

// Clear entire cart
function clearCart() {
    if (cart.length === 0) {
        showNotification('Cart is already empty', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        showNotification('Cart cleared!', 'success');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Clear cart button
    document.getElementById('clear-cart').addEventListener('click', clearCart);
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty', 'warning');
            return;
        }
        
        // For demo purposes, show a success message
        showNotification('Checkout functionality coming soon!', 'info');
        // In a real app, this would redirect to a checkout page
        // window.location.href = '/checkout';
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Update cart count in navbar (if available)
function updateNavbarCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.querySelector('.cart-count');
    if (cartIcon) {
        cartIcon.textContent = cartCount;
        cartIcon.style.display = cartCount > 0 ? 'block' : 'none';
    }
}

// Call this when cart is updated
function updateCartCount() {
    updateNavbarCartCount();
}
