// Elements
const cartToggle = document.getElementById("cartToggle");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItemsList = document.getElementById("cartItems");
const totalWrapper = document.getElementById("totalWrapper");
const cartCount = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");
const thankYouMessage = document.getElementById("thankYouMessage");
// Donate and About sections
const donateSection = document.querySelector(".donate-now");
const waitingSection = document.getElementById("waitingsection");

let cart = [];

// Cart sidebar
cartToggle.addEventListener("click", () => {
  updateCart();
  cartSidebar.classList.toggle("active");
});
// Close cart
closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});
// Add to cart
document.querySelectorAll(".product-card button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    
    const title = card.dataset.title;
    const price = parseFloat(card.dataset.price);

    const existing = cart.find((item) => item.title === title);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ title, price, quantity: 1 });
    }
    updateCart();
    cartSidebar.classList.add("active");
  });
});
// Update cart
function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span>${item.title} (€${item.price}) x ${item.quantity}</span>
        <div>
          <button class="btn btn-sm btn-secondary minus" data-index="${index}">-</button>
          <button class="btn btn-sm btn-secondary plus" data-index="${index}">+</button>
          <button class="btn btn-sm btn-danger remove" data-index="${index}">x</button>
        </div>
      </div>
    `;
    cartItemsList.appendChild(li);
  });

  let finalTotal = total;
  // Discount 10%
  if (count > 2) {
    finalTotal = total * 0.9;
    totalWrapper.innerHTML = `<b>Total: <s style="color:grey">€${total.toFixed(2)}</s> <span style="color:red">€${finalTotal.toFixed(2)}</span></b>`;
  } else {
    totalWrapper.innerHTML = `<b>Total: €<span>${total.toFixed(2)}</span></b>`;
  }

  cartCount.innerText = count;
  // Buttons for +- and delete
  attachCartEvents(); 
}

function attachCartEvents() {
    cartItemsList.querySelectorAll(".plus").forEach((btn) => {
        btn.addEventListener("click", () => {
          cart[btn.dataset.index].quantity++;
          updateCart();
        });
      });
    
      cartItemsList.querySelectorAll(".minus").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (cart[btn.dataset.index].quantity > 1) cart[btn.dataset.index].quantity--;
          updateCart();
        });
      });
    
      cartItemsList.querySelectorAll(".remove").forEach((btn) => {
        btn.addEventListener("click", () => {
          cart.splice(btn.dataset.index, 1);
          updateCart();
        });
      });
}
// Checkout
checkoutBtn.addEventListener("click", () => {
  checkoutModal.classList.add("active");
});
closeCheckout.addEventListener("click", () => {
  checkoutModal.classList.remove("active");
});
// Payment form
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutModal.classList.remove("active");
  cartSidebar.classList.remove("active");
  cart = [];
  updateCart();
  thankYouMessage.style.display = "block";
  setTimeout(() => {
    thankYouMessage.style.display = "none";
  }, 3000);
});
// Scroll donate buttons
document.querySelectorAll(".photo-button, .card-photo .donate-button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    donateSection.scrollIntoView({ behavior: "smooth" });
  });
});
// Scroll to waiting section 
document.querySelectorAll('.nav-link[href="#waitingsection"]').forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    waitingSection.scrollIntoView({ behavior: "smooth" });
  });
});