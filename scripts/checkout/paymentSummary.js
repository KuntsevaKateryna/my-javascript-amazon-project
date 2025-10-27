import {carts} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {getMoneyFormat} from '../utils/moneyFormat.js';

export function displayPaymentContentHTML() {
  var costOfProducts  = 0;
  var shippingPrice  = 0;
  var beforeTaxSummary = 0;
  var taxSummary = 0;
  var totalSummary = 0;
  console.log('payment page!');
  carts.forEach(cartItem => {
    const product = getProduct(cartItem.productId);
    costOfProducts +=  product.priceCents * cartItem.quantity;
    shippingPrice += getDeliveryOption(cartItem.deliveryOptionId).priceCents;
  });
  
  beforeTaxSummary = costOfProducts + shippingPrice;
  taxSummary = beforeTaxSummary * 0.1;
  totalSummary = beforeTaxSummary + taxSummary;
  const paymentHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${carts.length}):</div>
            <div class="payment-summary-money">$${getMoneyFormat(costOfProducts)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${getMoneyFormat(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${getMoneyFormat(beforeTaxSummary)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${getMoneyFormat(taxSummary)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${getMoneyFormat(totalSummary)}</div>
          </div>
          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentHTML;
}

