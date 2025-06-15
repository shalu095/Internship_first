const shopItems = [
    { id: 1, name: "Smartphone", price: 62999.00, category: "Electronics", description: "Latest model with high-res camera.", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRKj8NxFZGTq2Duw3kub7bAM6b-7zsd_1oF5GkGsknP4ex-A8Dk" },
    { id: 2, name: "T-Shirt", price: 899.00, category: "Clothing", description: "Comfortable cotton t-shirt.", image: "https://www.uppstring.in/cdn/shop/files/animeprintedtshirtwomenblack.jpg?v=1690611873" },
    { id: 3, name: "Novel", price: 2475.00, category: "Books", description: "Bestselling mystery novel.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ajJRH50T5WPE7KdCFBdniWmYpc_X8x2qj0_FZzONCRIKjJ-umJAlWZ9lXyWGBYoqvYQ&usqp=CAU" },
    { id: 4, name: "Laptop", price: 100000.00, category: "Electronics", description: "Powerful laptop for work and gaming.", image: "https://images.unsplash.com/photo-1491472253230-a044054ca35f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D" },
    { id: 5, name: "Jeans", price: 1599.00, category: "Clothing", description: "Stylish denim jeans.", image: "https://media.istockphoto.com/id/186870715/photo/blue-jeans.jpg?s=612x612&w=0&k=20&c=MInRLnEABmDYzvxjnEiFBu1V20OaB1zHmgzCqUV5hzk=" },
    { id: 6, name: "Jacket", price: 4256.00, category: "Clothing", description: "Warm winter jacket.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1LJfHj471g0H9nV1zk-7T0RfHHryNx0MNVw&s" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(itemId) {
    const item = shopItems.find(product => product.id === itemId);
    if (item) {
        const cartItem = cart.find(cartItem => cartItem.id === itemId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        saveCart();
        alert(`${item.name} added to cart!`);
    }
}

function displayProducts(items) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';
    if (items.length === 0) {
        productContainer.innerHTML = '<p class="no-items-message">Item not available at the current moment.</p>';
        return;
    }
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <h3 class="product-name">${item.name}</h3>
            <p class="product-price">₹${item.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        productContainer.appendChild(card);
    });
}

function getSortedAndFilteredItems() {
    const selectedCategories = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(checkbox => checkbox.value);
    const sortChoice = document.getElementById('sort-options').value;
    const searchQuery = document.getElementById('search-input')?.value.toLowerCase() || '';

    let filteredItems = shopItems.filter(item =>
        (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
        (item.name.toLowerCase().includes(searchQuery) ||
         item.description.toLowerCase().includes(searchQuery) ||
         item.category.toLowerCase().includes(searchQuery))
    );

    if (sortChoice === 'price-asc') {
        filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortChoice === 'price-desc') {
        filteredItems.sort((a, b) => b.price - a.price);
    }

    return filteredItems;
}

document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.getElementById('filter-toggle');
    const filterMenu = document.getElementById('filter-options');
    const applyButton = document.getElementById('apply-filter');
    const resetButton = document.getElementById('reset-filter');
    const sortDropdown = document.getElementById('sort-options');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    filterButton.addEventListener('click', () => {
        filterMenu.classList.toggle('hidden');
    });

    applyButton.addEventListener('click', () => {
        displayProducts(getSortedAndFilteredItems());
        filterMenu.classList.add('hidden');
    });

    sortDropdown.addEventListener('change', () => {
        displayProducts(getSortedAndFilteredItems());
    });

    searchButton.addEventListener('click', () => {
        displayProducts(getSortedAndFilteredItems());
    });

    searchInput.addEventListener('input', () => {
        displayProducts(getSortedAndFilteredItems());
    });

    resetButton.addEventListener('click', () => {
        document.querySelectorAll('.category-checkbox').forEach(checkbox => checkbox.checked = true);
        sortDropdown.value = 'price-asc';
        searchInput.value = '';
        displayProducts(getSortedAndFilteredItems());
        filterMenu.classList.add('hidden');
    });

    displayProducts(getSortedAndFilteredItems());
});