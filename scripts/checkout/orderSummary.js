import {carts, removeProductFromCart, updateDeliveryDate} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {getMoneyFormat} from '../utils/moneyFormat.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {displayPaymentContentHTML} from './paymentSummary.js';

export function displayOrderContentHTML() {
  let cartSummaryHTML = '';
  carts.forEach((cartItem) => {
    let matchedProduct = getProduct(cartItem.productId);
    const deliveryOption_ = cartItem.deliveryOptionId;
    const deliveryOptionn = getDeliveryOption(deliveryOption_); //associated with the suitable option of deliveryOptions array
    /*deliveryOptions.forEach(
      (option) => {
        if(deliveryOption_ === option.id) 
          deliveryOptionn = option;
      }
    );*/
    

    //repeated code:
    const today = dayjs();
        const deliveryDay = today.add(
          deliveryOptionn.deliveryDays, 
          'days'
        );
        const deliveryString1 = deliveryDay.format('dddd, MMMM D');
        //console.log(`deliveryString1: ${deliveryString1}`);

    cartSummaryHTML +=
    `          <div class="cart-item-container 
                js-cart-item-container-${matchedProduct.id} 
                js-card-item-container"
                
          >
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
                  <div class="product-quantity  js-product-quantity-${matchedProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link
                    js-delete-quantity-link-${matchedProduct.id}"
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
          <div class="delivery-option js-delivery-option1"
                data-product-id = "${matchedProduct.id}"
                data-delivery-option-id = "${deliverOption1.id}">
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

    //console.log(cartSummaryHTML);
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
              displayPaymentContentHTML();
            }
          )
        }
      );

      document.querySelectorAll(".js-delivery-option1")
      .forEach(
        (element)=> {
            element.addEventListener(
              'click',
              ()=> {
                //const {productId, deliveryOptionId} = element.dataset;
                const productId1 = element.dataset.productId;
                const deliveryOptionId1 = element.dataset.deliveryOptionId;


                console.log(`productId1= ${productId1} deliveryOptionId1 = ${deliveryOptionId1}`);
                updateDeliveryDate(productId1, deliveryOptionId1);
                displayOrderContentHTML();
                displayPaymentContentHTML();
              }
            );
        }
      );

      function updateCartQuantity() {
        let cartQuantity = 0;
        carts.forEach(
          (cartItem) =>{
            cartQuantity = cartQuantity + cartItem.quantity
          }
        );
        console.log(`cartQuantity : ${cartQuantity}`);
        document.querySelector(".js-checkout-count").innerHTML =  `${cartQuantity} items`;

      }
}


