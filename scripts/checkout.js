import {carts, removeProductFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {getMoneyFormat} from './utils/moneyFormat.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';


/*console.log(dayjs());
const today = dayjs();
const deliveryDay = today.add(7, 'days');

console.log(deliveryDay.format('dddd MMMM D'));
*/

let cartSummaryHTML = '';
carts.forEach((cartItem) => {
  let matchedProduct;

  products.forEach(
    (productItem) => {
    if (cartItem.productId === productItem.id)
      matchedProduct = productItem;
  });
  console.log(matchedProduct);

  const deliveryOption_ = cartItem.deliveryOptionId;
  
  let deliveryOptionn; //accosicated with the suitable option of deliveryOptions array
  deliveryOptions.forEach(
    (option) => {
      if(deliveryOption_ === option.id) 
        deliveryOptionn = option;
    }
  );
  console.log(`deliveryOptionn: ${deliveryOptionn}`);
  
  //repeated code:
  const today = dayjs();
      const deliveryDay = today.add(
        deliveryOptionn.deliveryDays, 
        'days'
      );
      const deliveryString1 = deliveryDay.format('dddd, MMMM D');
      console.log(`deliveryString1: ${deliveryString1}`);

  cartSummaryHTML +=
  `          <div class="cart-item-container
              js-cart-item-container-${matchedProduct.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryString1}
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
                ${deliveryOptionsHTML(matchedProduct, cartItem)}
              </div></div></div>
  `;
});

function deliveryOptionsHTML(matchedProduct, cartItem) {
  let html = '';
  deliveryOptions.forEach(
     (deliverOption1) => 
      {
      
      const today = dayjs();
      const deliveryDay = today.add(
        deliverOption1.deliveryDays, 
        'days'
      );
      const deliveryString = deliveryDay.format('dddd, MMMM D');
      const priceString =
      deliverOption1.deliveryDays === 7
      ? 'FREE'
      : `$${getMoneyFormat(deliverOption1.priceCents)} -`;
      const isChecked = 
        cartItem.deliveryOptionId === deliverOption1.id
        ? 'checked'
        : ''
      ;

      html += 
      `
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchedProduct.id}"
            ${isChecked} >
          <div>
            <div class="delivery-option-date">
              ${deliveryString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    }
  );
  return html;
}

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
            updateCartQuantity() ;
            //document.querySelector(".js-checkout-count").innerHTML = `${carts.length} items`;
            //document.querySelector(".js-checkout-count").innerHTML = `${updateCartQuantity()} items`;
          }
        )
      }
    );

    //document.querySelector(".js-checkout-count").innerHTML = `${carts.length} items`;

    /*function updateCartQuantity_checkout() {
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
    } */

    /* let var1 = updateCartQuantity() ;
    document.querySelector(".js-checkout-count").innerHTML = var1 ;
    console.log(`updateCartQuantity() ${var1}`);
    */

    function updateCartQuantity() {
      let cartQuantity = 0;
      carts.forEach(
        (cartItem) =>{
          cartQuantity = cartQuantity + cartItem.quantity
        }
      );
      console.log(`cartQuantity : ${cartQuantity}`);
      document.querySelector(".js-checkout-count").innerHTML =  `${cartQuantity} items`;
      //return cartQuantity;
    }


    updateCartQuantity() ;
