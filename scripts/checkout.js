import {carts, removeProductFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {getMoneyFormat} from './utils/moneyFormat.js';

let cartSummaryHTML = '';
carts.forEach((cartItem) => {
  let matchedProduct;

  products.forEach(
    (productItem) => {
    if (cartItem.productId === productItem.id)
      matchedProduct = productItem;
  });
  console.log(matchedProduct);

  cartSummaryHTML +=
  `          <div class="cart-item-container
              js-cart-item-container-${matchedProduct.id}">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchedProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchedProduct.name}
                </div>
                <div class="product-price">
                  $${getMoneyFormat(matchedProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link"
                  data-product-id = "${matchedProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${matchedProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-${matchedProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${matchedProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
});

  console.log(cartSummaryHTML);
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  document.querySelectorAll('.js-delete-quantity-link')
    .forEach (
      function (linka) { //linka is an association with object with this class = .js-delete-quantity-link
        linka.addEventListener(
          'click',
          () =>{
            console.log('delete');
            const productId = linka.dataset.productId; // because property = data-product-id, so productId
            removeProductFromCart(productId);
            console.log(carts);

            const containerItem = document.querySelector(`.js-cart-item-container-${productId}`);
            containerItem.remove();
            //document.querySelector(".js-checkout-count").innerHTML = `${carts.length} items`;
            document.querySelector(".js-checkout-count").innerHTML = `${updateCartQuantity_checkout()} items`;
          }
        )
      }
    );

    //document.querySelector(".js-checkout-count").innerHTML = `${carts.length} items`;

    function updateCartQuantity_checkout() {
      let cartQuantity = 0;
      carts.forEach(
        //function() {
        //}
        (cartItem) =>{
          cartQuantity = cartQuantity + cartItem.quantity
        }
      );
      console.log(`cartQuantity : ${cartQuantity}`);
     // document.querySelector(".js-checkout-count").innerHTML = cartQuantity;
     return cartQuantity;
    }

    document.querySelector(".js-checkout-count").innerHTML = updateCartQuantity_checkout() ;