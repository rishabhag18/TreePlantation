// main.js

document.addEventListener('DOMContentLoaded', function () {
    // Example: Adding a product to the cart
    const addToCartButtons = document.querySelectorAll('.btn-success');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            alert('Item added to cart!');
        });
    });

    // Form validation example
    const checkoutForm = document.querySelector('form');
    checkoutForm.addEventListener('submit', function (event) {
        if (!checkoutForm.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        checkoutForm.classList.add('was-validated');
    });
});
