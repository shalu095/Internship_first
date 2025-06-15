let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function displayCart() {
    const cartContainer = document.getElementById('cart-list');
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="no-items-message">Your cart is empty.</p>';
        updateCartTotal();
        return;
    }
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-image">
            <h3 class="cart-name">${item.name}</h3>
            <p class="cart-price">₹${item.price.toFixed(2)} x ${item.quantity}</p>
            <div class="quantity-controls">
                <button class="quantity-button" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-button" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
    updateCartTotal();
}

function updateQuantity(itemId, change) {
    const cartItem = cart.find(item => item.id === itemId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== itemId);
        }
        saveCart();
        displayCart();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const clearCartButton = document.getElementById('clear-cart');
    const buyCartButton = document.getElementById('buy-cart');

    clearCartButton.addEventListener('click', () => {
        cart = [];
        saveCart();
        displayCart();
    });

    buyCartButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Thank you for your order!');
            cart = [];
            saveCart();
            displayCart();
        }
    });

    displayCart();
});