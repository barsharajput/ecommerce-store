// =====================================================
// CART PAGE SCRIPT (Uses only localStorage cart data)
// =====================================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBox = document.getElementById("cart-items");
const totalBox = document.getElementById("total-price");

// Show cart items on cart.html
function loadCart() {
  cartBox.innerHTML = "";

  // If cart is empty
  if (cart.length === 0) {
    cartBox.innerHTML = "<p>Your cart is empty.</p>";
    totalBox.textContent = "₹0";
    return;
  }

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
            <div style="display:flex; gap:20px; align-items:center;">
                <img src="${item.image}"
                     style="width:100px; height:100px; object-fit:cover; border-radius:6px;">

                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>

                    <p>
                        Quantity:
                        <button onclick="decreaseQty(${item.id})">-</button>
                        ${item.quantity}
                        <button onclick="increaseQty(${item.id})">+</button>
                    </p>

                    <button onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>
        `;

    cartBox.appendChild(div);
  });

  updateTotal();
}

// Increase quantity
function increaseQty(id) {
  const item = cart.find((p) => p.id === id);
  if (item) {
    item.quantity++;
    saveCart();
    loadCart();
  }
}

// Decrease quantity
function decreaseQty(id) {
  const item = cart.find((p) => p.id === id);

  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cart = cart.filter((p) => p.id !== id);
    }
    saveCart();
    loadCart();
  }
}

// Remove item from cart
function removeItem(id) {
  cart = cart.filter((p) => p.id !== id);
  saveCart();
  loadCart();
}

// Update total price
function updateTotal() {
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  totalBox.textContent = "₹" + total.toFixed(2);
}

// Save updated cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Checkout button
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Thank you for your purchase!");
  cart = [];
  saveCart();
  loadCart();
});

// Initial load
loadCart();
