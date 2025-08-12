
// Filter functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
});



// filtering & Sortingthe products
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');

let productItems = Array.from(productsGrid.getElementsByClassName('product-item'));

// ✅ Filter + Sort + Search Combined
function applyFilterSortSearch(filter, sortBy, searchTerm = '') {
    const filteredItems = productItems.filter(product => {
        const category = product.getAttribute('data-category')?.toLowerCase() || '';
        const title = product.querySelector('.product-title')?.textContent.toLowerCase() || '';
        const featureBadges = Array.from(product.querySelectorAll('.product-features .badge'))
            .map(badge => badge.textContent.toLowerCase())
            .join(' ');

        const combinedText = `${title} ${category} ${featureBadges}`;

        const matchesFilter = filter === 'all' || category.includes(filter);
        const matchesSearch = combinedText.includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    const sortedItems = filteredItems.sort((a, b) => {
        const priceA = getPriceFromItem(a);
        const priceB = getPriceFromItem(b);
        const ratingA = getRatingFromItem(a);
        const ratingB = getRatingFromItem(b);

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return ratingB - ratingA;
        return 0; // Popularity
    });

    productsGrid.innerHTML = '';
    sortedItems.forEach(item => {
        productsGrid.appendChild(item);
        item.style.display = 'block';
    });

    productItems.forEach(item => {
        if (!sortedItems.includes(item)) {
            item.style.display = 'none';
        }
    });
}

// ✅ Helper Functions
function getPriceFromItem(item) {
    const priceText = item.querySelector('.current-price')?.textContent.replace(/[^\d.]/g, '') || '0';
    return parseFloat(priceText);
}

function getRatingFromItem(item) {
    const ratingText = item.querySelector('.product-rating span')?.textContent.replace(/[^\d.]/g, '') || '0';
    return parseFloat(ratingText);
}

// ✅ Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedFilter = button.getAttribute('data-filter');
        const searchTerm = searchInput.value.trim().toLowerCase();
        applyFilterSortSearch(selectedFilter, sortSelect.value, searchTerm);
    });
});

sortSelect.addEventListener('change', () => {
    const selectedFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    const searchTerm = searchInput.value.trim().toLowerCase();
    applyFilterSortSearch(selectedFilter, sortSelect.value, searchTerm);
});

searchInput.addEventListener('input', () => {
    const selectedFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    const searchTerm = searchInput.value.trim().toLowerCase();
    applyFilterSortSearch(selectedFilter, sortSelect.value, searchTerm);
});

// ✅ Initial Load
applyFilterSortSearch('all', sortSelect.value, '');















// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cart sidebar functions
function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('show');
        updateCartDisplay();
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('show');
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    if (!cartItemsContainer || !emptyCartMessage) {
        console.log('Cart elements not found');
        return;
    }

    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCartMessage.style.display = 'block';
        updateCartSummary();
        return;
    }

    cartItemsContainer.style.display = 'block';
    emptyCartMessage.style.display = 'none';

    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = createCartItemElement(item, index);
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartSummary();
}

function createCartItemElement(item, index) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <img src="../assets/${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price.toFixed(2)} each</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" 
                       min="1" onchange="updateCartQuantityInput(${index}, this.value)">
                <button class="quantity-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
            </div>
        </div>
        <div class="cart-item-total">₹${(item.price * item.quantity).toFixed(2)}</div>
        <button class="remove-item" onclick="removeCartItem(${index})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    return cartItem;
}

function updateCartQuantity(index, change) {
    if (cart[index].quantity + change < 1) {
        return;
    }

    cart[index].quantity += change;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function updateCartQuantityInput(index, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) {
        updateCartDisplay(); // Reset to current value
        return;
    }

    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function removeCartItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function updateCartSummary() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const totalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (!subtotalElement || !shippingElement || !totalElement || !checkoutBtn) {
        console.log('Cart summary elements not found');
        return;
    }

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 499 ? 0 : 99; // Free shipping over ₹499
    const total = subtotal + shipping;

    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;

    // Enable/disable checkout button
    checkoutBtn.disabled = cart.length === 0;
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // For demo purposes, redirect to cart page
    window.location.href = '/pages/Cart.html';
}

function clearAllCart() {
    if (cart.length === 0) {
        alert('Your cart is already empty!');
        return;
    }

    if (confirm('Are you sure you want to clear all items from your cart?')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
        console.log('All items cleared from cart');
    }
}

// Add to cart functionality
function addToCart(productName, price, image) {
    console.log('Adding to cart:', productName, price, image);

    // Find if product already exists in cart
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart display if sidebar is open
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && cartSidebar.classList.contains('open')) {
        updateCartDisplay();
    }

    // Update cart count in navbar
    updateCartCount();

    // Add animation to cart icon
    const cartIcon = document.querySelector('.cart-icons');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }

    // Show success message
    console.log(`${productName} added to cart!`);
}

// Update cart count in navbar
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
        console.log('Cart count updated:', cartCount);
    } else {
        console.log('Cart count element not found');
    }
}

// Extract product information from product card
function getProductInfo(productCard) {
    const productName = productCard.querySelector('.product-title').textContent.trim();
    const priceElement = productCard.querySelector('.current-price');
    const priceText = priceElement.textContent.trim();
    const price = parseFloat(priceText.replace('₹', '').replace(',', ''));
    const imageElement = productCard.querySelector('.product-image img');
    const imageSrc = imageElement.src;
    const imageName = imageSrc.split('/').pop(); // Get just the filename

    return {
        name: productName,
        price: price,
        image: imageName
    };
}

// Wait for navbar to load before initializing cart
function initializeAfterNavbarLoad() {
    // Check if navbar is loaded
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        console.log('Navbar loaded, initializing cart functionality');
        updateCartCount();
        setupAddToCartButtons();
    } else {
        console.log('Navbar not loaded yet, retrying in 100ms');
        setTimeout(initializeAfterNavbarLoad, 100);
    }
}

// Setup event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, starting initialization');

    // Wait for navbar to load before initializing cart
    setTimeout(initializeAfterNavbarLoad, 500);

    // Setup other functionality with a small delay to ensure DOM is ready
    setTimeout(() => {
        setupFilters();
        setupSearch();
        setupSort();
        setupWishlist();
    }, 100);
});

// Setup Add to Cart buttons
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    console.log('Found', addToCartButtons.length, 'add to cart buttons');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Add to cart button clicked');

            // Find the product card containing this button
            const productCard = this.closest('.product-card');
            if (!productCard) {
                console.log('Product card not found');
                return;
            }

            // Get product information
            const productInfo = getProductInfo(productCard);
            console.log('Product info:', productInfo);

            // Add to cart
            addToCart(productInfo.name, productInfo.price, productInfo.image);

            // Add button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Show success feedback
            this.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
            this.style.background = '#28a745';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart me-2"></i>Add to Cart';
                this.style.background = '';
            }, 1000);
        });
    });
}

// Filter functionality
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    console.log('Setting up filters. Found', filterButtons.length, 'filter buttons and', productItems.length, 'product items');

    if (filterButtons.length === 0) {
        console.error('No filter buttons found!');
        return;
    }

    if (productItems.length === 0) {
        console.error('No product items found!');
        return;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            console.log('Filter clicked:', filter);

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            let visibleCount = 0;

            // Filter products
            productItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.add('fadeIn');
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fadeIn');
                }
            });

            console.log(`Filter "${filter}" applied. Showing ${visibleCount} products.`);

            // Remove fadeIn class after animation
            setTimeout(() => {
                productItems.forEach(item => {
                    item.classList.remove('fadeIn');
                });
            }, 500);
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const productItems = document.querySelectorAll('.product-item');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();

            productItems.forEach(item => {
                const productName = item.querySelector('.product-title').textContent.toLowerCase();
                const productCategory = item.querySelector('.product-category').textContent.toLowerCase();

                if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Sort functionality
function setupSort() {
    const sortSelect = document.getElementById('sortSelect');
    const productsGrid = document.getElementById('productsGrid');

    if (sortSelect && productsGrid) {
        sortSelect.addEventListener('change', function () {
            const sortBy = this.value;
            const productItems = Array.from(document.querySelectorAll('.product-item'));

            productItems.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('₹', ''));
                const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('₹', ''));
                const ratingA = parseFloat(a.querySelector('.product-rating span').textContent.replace('(', '').replace(')', ''));
                const ratingB = parseFloat(b.querySelector('.product-rating span').textContent.replace('(', '').replace(')', ''));

                switch (sortBy) {
                    case 'price-low':
                        return priceA - priceB;
                    case 'price-high':
                        return priceB - priceA;
                    case 'rating':
                        return ratingB - ratingA;
                    default:
                        return 0;
                }
            });

            // Reorder products in the grid
            productItems.forEach(item => {
                productsGrid.appendChild(item);
            });
        });
    }
}

// Wishlist functionality
function setupWishlist() {
    const wishlistButtons = document.querySelectorAll('.product-actions .btn:first-child');

    wishlistButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const icon = this.querySelector('i');
            if (icon.classList.contains('fas')) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '#dc3545';
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#6c757d';
            }
        });
    });
}

// Load more functionality
document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            // For demo purposes, just log a message
            console.log('Load more functionality coming soon!');
        });
    }
});
