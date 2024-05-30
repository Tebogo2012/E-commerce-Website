let currentImageIndex = 0;
const imageSources = [
  'images/image-product-1.jpg',
  'images/image-product-2.jpg',
  'images/image-product-3.jpg',
  'images/image-product-4.jpg'
];

function changeMainImage(imageSrc) {
  const mainImage = document.getElementById('mainImage');
  mainImage.src = imageSrc;
}

function incrementQuantity() {
  const quantityInput = document.getElementById('quantityInput');
  let quantity = parseInt(quantityInput.value);
  quantityInput.value = quantity + 1;
  updateTotalPrice(quantity + 1);
}

function decrementQuantity() {
  const quantityInput = document.getElementById('quantityInput');
  let quantity = parseInt(quantityInput.value);
  if (quantity > 1) {
    quantityInput.value = quantity - 1;
    updateTotalPrice(quantity - 1);
  }
}

function updateTotalPrice(quantity) {
  const discountPriceElement = document.getElementById('discountPrice');
  const totalPrice = quantity * 125.00;
  discountPriceElement.textContent = '$' + totalPrice.toFixed(2);
}

const cartItems = []; // Array to store items in the cart

function addToCart() {
  const quantityInput = document.getElementById('quantityInput');
  const quantity = parseInt(quantityInput.value);
  const newItem = {
    name: "Fall Limited Edition Sneakers",
    price: 125.00,
    quantity: quantity,
    imageSrc: imageSources[currentImageIndex]
  };
  cartItems.push(newItem);
  updateCartIcon();
  updateCartContent();
}

function updateCartIcon() {
  const cartIcon = document.getElementById('cartIcon');
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartIcon.style.setProperty('--after-content', `'${cartQuantity}'`);
}

function updateCartContent() {
  const cartWrapper = document.querySelector('.cart-wrapper');
  cartWrapper.innerHTML = '';

  if (cartItems.length === 0) {
    cartWrapper.textContent = 'Your cart is empty.';
  } else {
    let totalAmount = 0;
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      const image = document.createElement('img');
      image.src = item.imageSrc;

      const details = document.createElement('div');
      details.classList.add('details');

      const name = document.createElement('p');
      name.textContent = item.name;

      const price = document.createElement('span');
      price.classList.add('price');
      price.textContent = '$' + item.price.toFixed(2);

      const quantity = document.createElement('span');
      quantity.classList.add('quantiti');
      quantity.textContent = ' x ' + item.quantity;

      const subtotal = document.createElement('span');
      subtotal.classList.add('subtotal');
      subtotal.textContent = '$' + (item.price * item.quantity).toFixed(2);

      details.appendChild(name);
      details.appendChild(price);
      details.appendChild(document.createTextNode(' '));
      details.appendChild(quantity);
      details.appendChild(document.createTextNode(' '));
      details.appendChild(subtotal);

      const deleteBtn = document.createElement('div');
      deleteBtn.classList.add('delete');
      const deleteIcon = document.createElement('img');
      deleteIcon.src = 'images/icon-delete.svg';
      deleteIcon.addEventListener('click', () => removeCartItem(index));
      deleteBtn.appendChild(deleteIcon);

      cartItem.appendChild(image);
      cartItem.appendChild(details);
      cartItem.appendChild(deleteBtn);
      cartWrapper.appendChild(cartItem);

      totalAmount += item.price * item.quantity;
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('total');
    totalElement.textContent = 'Total: $' + totalAmount.toFixed(2);
    cartWrapper.appendChild(totalElement);
  }
}

function removeCartItem(index) {
  cartItems.splice(index, 1);
  updateCartIcon();
  updateCartContent();
}

function toggleCart() {
  const cartWindow = document.querySelector('.whole-cart-window');
  cartWindow.classList.toggle('hide');
}

let isLoggedIn = false;

function toggleLogin() {
  isLoggedIn = !isLoggedIn;
  updateLoginStatus();
}

function updateLoginStatus() {
  let loginButton = document.querySelector('.login img');
  if (isLoggedIn) {
    loginButton.src = 'images/icon-logout.svg';
    // Add logic here to handle logout actions
  } else {
    loginButton.src = 'images/image-avatar.png';
    // Add logic here to handle login actions
  }
}

document.querySelector('.login img').addEventListener('click', function() {
  window.location.href = 'login.html';
});
