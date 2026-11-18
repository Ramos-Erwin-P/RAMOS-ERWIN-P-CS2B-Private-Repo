// CART STORAGE
let cart = [];

// SHIPPING FEE
const SHIPPING_FEE = 100;

// NOTIFICATION MESSAGE
function showMessage(message) {
    const messageBox = document.getElementById("shop-message");

    if (messageBox) {
        messageBox.textContent = message;
        messageBox.classList.add("show");
    }
}

// OPEN AND CLOSE CART
function openCart() {
    const cartPanel = document.getElementById("cart-panel");
    const cartOverlay = document.getElementById("cart-overlay");
    const cartDot = document.getElementById("cart-dot");

    if (cartPanel) cartPanel.classList.add("active");
    if (cartOverlay) cartOverlay.classList.add("active");

    // Hide red notification dot when cart is opened
    if (cartDot) cartDot.classList.remove("show");
}

function closeCart() {
    const cartPanel = document.getElementById("cart-panel");
    const cartOverlay = document.getElementById("cart-overlay");

    if (cartPanel) cartPanel.classList.remove("active");
    if (cartOverlay) cartOverlay.classList.remove("active");
}

// CART NOTIFICATION
function updateCartNotification() {
    const cartDot = document.getElementById("cart-dot");

    if (!cartDot) return;

    if (cart.length > 0) {
        cartDot.classList.add("show");
    } else {
        cartDot.classList.remove("show");
    }
}

// FLYING PRODUCT ANIMATION
function animateToCart(button) {

    if (!button) return;

    const productCard = button.closest(".product-card");
    const productImage = productCard?.querySelector("img");
    const cartIcon = document.getElementById("cart-toggle");

    if (!productImage || !cartIcon) return;

    const flyingImage = productImage.cloneNode(true);

    const start = productImage.getBoundingClientRect();
    const end = cartIcon.getBoundingClientRect();

    flyingImage.classList.add("flying-product");

    flyingImage.style.left = start.left + "px";
    flyingImage.style.top = start.top + "px";
    flyingImage.style.width = start.width + "px";
    flyingImage.style.height = start.height + "px";

    document.body.appendChild(flyingImage);

    // Start animation
    flyingImage.getBoundingClientRect();

    flyingImage.style.left = (end.left + end.width / 2) + "px";
    flyingImage.style.top = (end.top + end.height / 2) + "px";
    flyingImage.style.width = "20px";
    flyingImage.style.height = "20px";
    flyingImage.style.opacity = "0";
    flyingImage.style.transform = "scale(0.2)";

    setTimeout(() => {
        flyingImage.remove();
    }, 750);

    // Cart bounce animation
    cartIcon.classList.remove("cart-bounce");

    void cartIcon.offsetWidth;

    cartIcon.classList.add("cart-bounce");

    setTimeout(() => {
        cartIcon.classList.remove("cart-bounce");
    }, 400);
}

// ADD TO CART
function addToCart(id, name, price, button) {

    price = Number(price);

    if (!Number.isFinite(price) || price < 0) {
        showMessage("Invalid product price.");
        return;
    }

    // Play flying product animation
    animateToCart(button);

    // Check if product already exists
    const existingProduct = cart.find(
        item => String(item.id) === String(id)
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    showMessage(name + " added to cart!");
}


// UPDATE CART DISPLAY
function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const subtotalElement = document.getElementById("subtotal");
    const shippingElement = document.getElementById("shipping");
    const totalElement = document.getElementById("total");

    const cartCount = document.getElementById("cart-count");

    let subtotal = 0;
    let totalQuantity = 0;

    if (cartItems) {

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            const emptyMessage = document.createElement("p");

            emptyMessage.textContent = "Your cart is currently empty.";

            emptyMessage.classList.add("empty-cart-message");

            cartItems.appendChild(emptyMessage);

        }

        cart.forEach(item => {

            const itemTotal = item.price * item.quantity;

            subtotal += itemTotal;
            totalQuantity += item.quantity;

            const cartItem = document.createElement("div");

            cartItem.classList.add("cart-item");

            // Product details
            const productDetails = document.createElement("div");

            productDetails.classList.add("cart-item-details");

            const productName = document.createElement("h4");

            productName.textContent = item.name;

            const productPrice = document.createElement("p");

            productPrice.textContent =
                "₱" + item.price.toFixed(2);

            const productQuantity = document.createElement("p");

            productQuantity.textContent =
                "Quantity: " + item.quantity;

            const productTotal = document.createElement("p");

            productTotal.textContent =
                "Total: ₱" + itemTotal.toFixed(2);

            // Remove button
            const removeButton = document.createElement("button");

            removeButton.textContent = "Remove";

            removeButton.type = "button";

            removeButton.classList.add("remove-button");

            removeButton.onclick = function () {
                removeFromCart(item.id);
            };

            productDetails.appendChild(productName);
            productDetails.appendChild(productPrice);
            productDetails.appendChild(productQuantity);
            productDetails.appendChild(productTotal);

            cartItem.appendChild(productDetails);
            cartItem.appendChild(removeButton);

            cartItems.appendChild(cartItem);

        });

    } else {

        // Still calculate cart values if the cart panel is missing
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            totalQuantity += item.quantity;
        });

    }

    // Calculate shipping and total
    const shipping = subtotal > 0 ? SHIPPING_FEE : 0;

    const total = subtotal + shipping;

    // Update cart count
    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    // Update subtotal
    if (subtotalElement) {
        subtotalElement.textContent =
            "₱" + subtotal.toFixed(2);
    }

    // Update shipping
    if (shippingElement) {
        shippingElement.textContent =
            "₱" + shipping.toFixed(2);
    }

    // Update total
    if (totalElement) {
        totalElement.textContent =
            "₱" + total.toFixed(2);
    }

    updateCartNotification();
}

// REMOVE PRODUCT FROM CART
function removeFromCart(id) {

    const product = cart.find(
        item => String(item.id) === String(id)
    );

    if (!product) return;

    const productName = product.name;

    cart = cart.filter(
        item => String(item.id) !== String(id)
    );

    updateCart();

    showMessage(productName + " removed from cart.");
}

// CHECKOUT
function checkout() {

    if (cart.length === 0) {

        showMessage("Your shopping cart is empty.");

        return;
    }

    const subtotal = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    const shipping = SHIPPING_FEE;

    const total = subtotal + shipping;

    // Clear cart after demo checkout
    cart = [];

    updateCart();

    showMessage(
        "Order summary complete! Total: ₱" +
        total.toFixed(2)
    );

}

// INITIALIZE CART EVENTS
document.addEventListener("DOMContentLoaded", function () {

    const cartToggle = document.getElementById("cart-toggle");

    const closeButton = document.getElementById("close-cart");

    const cartOverlay = document.getElementById("cart-overlay");

    // Open cart
    if (cartToggle) {
        cartToggle.addEventListener("click", openCart);
    }

    // Close cart
    if (closeButton) {
        closeButton.addEventListener("click", closeCart);
    }

    // Close cart when clicking outside
    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeCart);
    }

    // Initial cart display
    updateCart();

});