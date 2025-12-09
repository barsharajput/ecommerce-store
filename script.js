function formatPrice(num) {
  return "₹" + num.toLocaleString("en-IN");
}

const products = [
  {
    id: 1,
    name: "Oppo Smartphone",
    price: 25000,
    rating: 4.6,
    category: "Electronics",
    image: "images/smartphone.png",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: 2000,
    rating: 4.4,
    category: "Electronics",
    image: "images/speaker.png",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 1999,
    rating: 4.6,
    category: "Electronics",
    image: "images/gamingmouse.png",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 799,
    rating: 4.7,
    category: "Electronics",
    image: "images/mechanicalkeyboard.png",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 899,
    rating: 4.3,
    category: "Electronics",
    image: "images/wirelessearbuds.png",
  },
  {
    id: 6,
    name: "Handheld Vacuum",
    price: 1299,
    rating: 4.0,
    category: "Electronics",
    image: "images/handheldvacuum.png",
  },

  {
    id: 7,
    name: "Running Shoes",
    price: 1200,
    rating: 4.3,
    category: "Fashion",
    image: "images/shoes.png",
  },
  {
    id: 8,
    name: "Women Jacket",
    price: 1850,
    rating: 4.5,
    category: "Fashion",
    image: "images/jacket.png",
  },
  {
    id: 9,
    name: "Sunglasses",
    price: 200,
    rating: 4.1,
    category: "Fashion",
    image: "images/sunglasses.png",
  },
  {
    id: 10,
    name: "Backpack",
    price: 289,
    rating: 4.2,
    category: "Fashion",
    image: "images/backpack.png",
  },
  {
    id: 11,
    name: "Leather Wallet",
    price: 149,
    rating: 4.4,
    category: "Fashion",
    image: "images/wallet.png",
  },

  {
    id: 12,
    name: "Air Fryer",
    price: 1299,
    rating: 4.3,
    category: "Home",
    image: "images/airfryer.png",
  },
  {
    id: 13,
    name: "Coffee Maker",
    price: 2999,
    rating: 4.1,
    category: "Home",
    image: "images/coffeemaker.png",
  },
  {
    id: 14,
    name: "Desk Plant",
    price: 582,
    rating: 4.5,
    category: "Home",
    image: "images/deskplant.png",
  },
  {
    id: 15,
    name: "Table Lamp",
    price: 356,
    rating: 4.0,
    category: "Home",
    image: "images/tablelamp.png",
  },
  {
    id: 16,
    name: "Vacuum Cleaner",
    price: 3400,
    rating: 4.5,
    category: "Home",
    image: "images/vacuum.png",
  },

  {
    id: 17,
    name: "Travel Duffel Bag",
    price: 1234,
    rating: 4.2,
    category: "Fashion",
    image: "images/traveldufflebag.png",
  },

  {
    id: 18,
    name: "Gaming Chair",
    price: 2900,
    rating: 4.5,
    category: "Gaming",
    image: "images/gamingchair.png",
  },
  {
    id: 19,
    name: "Game Controller",
    price: 340,
    rating: 4.3,
    category: "Gaming",
    image: "images/gamecontroller.png",
  },

  {
    id: 20,
    name: "Mechanical Keyboard (Extra)",
    price: 459,
    rating: 4.7,
    category: "Electronics",
    image: "images/mechanicalkeyboard.png",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  let total = 0;
  cart.forEach((item) => (total += item.quantity));
  cartCount.textContent = total;
}

const productGrid = document.getElementById("product-grid");

function showProducts(list) {
  productGrid.innerHTML = "";

  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Price: ${formatPrice(p.price)}</p>
            <p>Rating: ⭐ ${p.rating}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;

    productGrid.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const exists = cart.find((c) => c.id === id);

  if (exists) {
    exists.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartCount();
  showToast(); // popup message
}

const filterCat = document.getElementById("category-filter");
const filterPrice = document.getElementById("price-filter");
const filterRating = document.getElementById("rating-filter");

// Populate category filter
const categories = [...new Set(products.map((p) => p.category))];
categories.forEach((cat) => {
  const opt = document.createElement("option");
  opt.value = cat;
  opt.textContent = cat;
  filterCat.appendChild(opt);
});

function applyFilters() {
  let list = [...products];

  if (filterCat.value !== "all") {
    list = list.filter((p) => p.category === filterCat.value);
  }

  if (filterRating.value !== "all") {
    list = list.filter((p) => p.rating >= Number(filterRating.value));
  }

  if (filterPrice.value === "low") {
    list.sort((a, b) => a.price - b.price);
  } else if (filterPrice.value === "high") {
    list.sort((a, b) => b.price - a.price);
  }

  showProducts(list);
}

// Filter listeners
filterCat.addEventListener("change", applyFilters);
filterPrice.addEventListener("change", applyFilters);
filterRating.addEventListener("change", applyFilters);

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", function () {
  const text = this.value.toLowerCase();

  const results = products.filter((p) => p.name.toLowerCase().includes(text));

  showProducts(results);
});

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  themeBtn.textContent = document.body.classList.contains("light-theme")
    ? "🌞"
    : "🌙";
});

function showToast() {
  const t = document.getElementById("toast");
  t.style.opacity = "1";
  t.style.transform = "translateY(0)";

  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transform = "translateY(20px)";
  }, 1500);
}

showProducts(products);
updateCartCount();
