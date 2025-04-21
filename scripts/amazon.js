console.log('Hello amazon');
import {carts, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {getMoneyFormat} from './utils/moneyFormat.js';




function updateCartQuantity() {
  let cartQuantity = 0;
  carts.forEach(
    //function() {
    //}
    (cartItem) =>{
      cartQuantity = cartQuantity + cartItem.quantity
    }
  );
  //console.log(`cartQuantity : ${cartQuantity}`);
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}


let productsHTML = '';
products.forEach(
  (product) =>{
    productsHTML += 
      `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
          $${getMoneyFormat(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class ="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-card-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-name="${product.name}"
          data-product-id="${product.id}"
          data-product-priceCents="${product.priceCents}"
          >
            Add to Cart
          </button>
        </div>
      `;
  }
);

document.querySelector(".js-product-grid").innerHTML = productsHTML;
document.querySelectorAll(".js-add-to-cart")
  .forEach(
    function(button) {
      button.addEventListener(
        'click',
        function() {
          const productName = button.dataset.productName;
          const productId = button.dataset.productId;
         // const quantitySelector = document.querySelector(`.js-quantity-selector-${button.dataset.productId}`);
          
          addToCart(productId, button);
          updateCartQuantity();
    
          //message 'Added' appears and disappears after 1.5 sec:
         let addedProduct = document.querySelector(`.js-added-to-card-${productId}`);
         addedProduct.classList.add("added-to-cart_clicked");
         setTimeout( 
          () => addedProduct.classList.remove("added-to-cart_clicked"),
      1500
   );           
        });
      });