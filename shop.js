const shopItems = [
    {
        id: 1,
        name: "Smartphone",
        price: 87000.00,
        category: "Electronics",
        description: "Latest model with high-res camera.",
        image: "https://m.media-amazon.com/images/I/71CXhVhpM0L._AC_UF1000,1000_QL80_DpWeblab_.jpg"
    },
    {
        id: 2,
        name: "Ipad",
        price: 89999.00,
        category: "Electronics",
        description: "best one ipad.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPc2d2XKf5ci4YWnWnGy0--bprL3p4hVOsxQ&s"
    },

    {
        id: 3,
        name: "Novel",
        price: 2475.00,
        category: "Books",
        description: "Bestselling mystery novel.",
        image: "https://media.istockphoto.com/id/167222757/photo/old-books-on-white-background.jpg?s=612x612&w=0&k=20&c=Z7id6x2ZtXK4dsRjzJvO2-pq0G3BPE0hMjPkYE8IK6E="
    },
    {
        id: 4,
        name: "Laptop",
        price: 75699.00,
        category: "Electronics",
        description: "Powerful laptop for work and gaming.",
        image: "https://media.istockphoto.com/id/1738752533/photo/a-view-of-a-computer-and-a-mobile-phone-on-an-office-desk.jpg?s=612x612&w=0&k=20&c=yTvkJtnPuFepIvXH2dYDIq72SfnkruvN7Flmy1_OEgs="
    },
    {
        id: 5,
        name: "Jeans",
        price: 1599.00,
        category: "Clothing",
        description: "Stylish denim jeans.",
        image: "https://media.istockphoto.com/id/186870715/photo/blue-jeans.jpg?s=612x612&w=0&k=20&c=MInRLnEABmDYzvxjnEiFBu1V20OaB1zHmgzCqUV5hzk="
    },
    {
        id: 6,
        name: "Textbook",
        price: 599.00,
        category: "Books",
        description: "Comprehensive science textbook.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQghNEAGuOzmNfZB7L7lo2nVbOi8cuPj4ggNA&s"
    },
    {
        id: 7,
        name: "Headphones",
        price: 3254.00,
        category: "Electronics",
        description: "Noise-cancelling wireless headphones.",
        image: "https://avshack.in/cdn/shop/files/sonos-ace-wireless-white-01.jpg?v=1728627115&width=1214"
    },
    {
        id: 8,
        name: "Smart TV ",
        price: 80000.00,
        category: "Electronics",
        description: " TV ",
        image: "https://images.samsung.com/is/image/samsung/assets/levant/tvs/smart-tv/smart/smart-tv-f03-mo002.jpg?$624_376_JPG"
    },
    {
        id: 9,
        name: "E-Reader",
        price: 1789.00,
        category: "Books",
        description: "Lightweight e-reader with long battery life.",
        image: "https://media.istockphoto.com/id/496202626/photo/boy-with-tablet.jpg?s=612x612&w=0&k=20&c=FV7aTM_pLBEVunP32LX237IHd5b8Rh_DhCimD7lm5zc="
    }
];

// Render product cards
function displayProducts(items) {
    const container = document.getElementById('product-list');
    container.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name || 'Product'}" class="product-image">
            <h3 class="product-name">${item.name}</h3>
            <p class="product-price">₹${item.price.toFixed(2)}</p>
        `;

        container.appendChild(card);
    });
}

// Filter and sort items
function getSortedAndFilteredItems() {
    const selectedCategories = Array.from(
        document.querySelectorAll('.category-checkbox:checked')
    ).map(cb => cb.value);

    const sortOption = document.getElementById('sort-options').value;

    let filtered = shopItems.filter(item =>
        selectedCategories.length === 0 || selectedCategories.includes(item.category)
    );

    if (sortOption === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
}

// Initial setup and event listeners
document.addEventListener('DOMContentLoaded', () => {
    const filterToggle = document.getElementById('filter-toggle');
    const filterPanel = document.getElementById('filter-options');
    const applyBtn = document.getElementById('apply-filter');
    const resetBtn = document.getElementById('reset-filter');
    const sortSelect = document.getElementById('sort-options');

    filterToggle.addEventListener('click', () => {
        filterPanel.classList.toggle('hidden');
    });

    applyBtn.addEventListener('click', () => {
        displayProducts(getSortedAndFilteredItems());
        filterPanel.classList.add('hidden');
    });

    sortSelect.addEventListener('change', () => {
        displayProducts(getSortedAndFilteredItems());
    });

    resetBtn.addEventListener('click', () => {
        document.querySelectorAll('.category-checkbox').forEach(cb => cb.checked = true);
        sortSelect.value = 'price-asc';
        displayProducts(getSortedAndFilteredItems());
        filterPanel.classList.add('hidden');
    });

    // Initial load
    displayProducts(getSortedAndFilteredItems());
});
