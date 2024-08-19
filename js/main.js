// // main.js

// document.addEventListener('DOMContentLoaded', function () {
//     // Example: Adding a product to the cart
//     const addToCartButtons = document.querySelectorAll('.btn-success');
//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             alert('Item added to cart!');
//         });
//     });

//     // Form validation example
//     const checkoutForm = document.querySelector('form');
//     checkoutForm.addEventListener('submit', function (event) {
//         if (!checkoutForm.checkValidity()) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//         checkoutForm.classList.add('was-validated');
//     });
// });


// main.js

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSummaryContainer = document.querySelector('.cart-summary');

    if (cartItemsContainer && cartSummaryContainer) {
        cartItemsContainer.innerHTML = '';  // Clear current items
        let totalItems = 0;

        cart.forEach((item, index) => {
            totalItems += item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${item.image}" class="img-fluid" alt="${item.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">Quantity: ${item.quantity}</p>
                                <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        cartSummaryContainer.innerHTML = `
            <h5 class="card-title">Summary</h5>
            <p class="card-text">Total Trees: ${totalItems}</p>
            <a href="checkout.html" class="btn btn-primary">Proceed to Checkout</a>
        `;
    }
}

// Function to add an item to the cart
function addToCart(treeName, treeImage) {
    const existingItemIndex = cart.findIndex(item => item.name === treeName);

    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ name: treeName, image: treeImage, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Checkout form validation
document.addEventListener('DOMContentLoaded', function () {
    const checkoutForm = document.querySelector('form');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (event) {
            if (!checkoutForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            checkoutForm.classList.add('was-validated');
        });
    }

    updateCartDisplay();
});

// Example: Adding a product to the cart from the details page
document.querySelectorAll('.btn-success').forEach(button => {
    button.addEventListener('click', function (event) {
        const treeName = event.target.closest('.card-body').querySelector('h2').innerText;
        const treeImage = event.target.closest('.row').querySelector('img').src;

        addToCart(treeName, treeImage);
    });
});

