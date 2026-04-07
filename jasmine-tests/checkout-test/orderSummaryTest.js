import {displayOrderContentHTML} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, carts} from '../../data/cart.js';

describe ('test suite: displayOrderContentHTML', () => {

  const product1 = "k43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const product2 = "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7";

  beforeEach( ()=>{
        spyOn(localStorage, 'setItem');
                document.querySelector('.js-test-container').innerHTML = `
        <div class = "js-order-summary"> </div>
        <div class = "js-payment-summary"> </div>
        <div class="js-checkout-count"></div>`;
            spyOn(localStorage, 'getItem').and.callFake(
                    ()=>{
                      return JSON.stringify([
                        { productId: product1,
                          quantity: 3,
                          deliveryOptionId : '1'
                        },
                        { productId: product2,
                            quantity: 1,
                            deliveryOptionId: '2'}
                      ]);
                    }
                  );
            loadFromStorage();
            displayOrderContentHTML();
  }

  );
  it ('diplays page', () => {
    /*const product1 = "k43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const product2 = "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7";
    document.querySelector('.js-test-container').innerHTML = `
    <div class = "js-order-summary"> </div>`;
            spyOn(localStorage, 'getItem').and.callFake(
                    ()=>{
                      return JSON.stringify([
                        { productId: product1,
                          quantity: 3,
                          deliveryOptionId : '1'
                        },
                        { productId: product2,
                            quantity: 1,
                            deliveryOptionId: '2'}
                      ]);
                    }
                  );
            loadFromStorage();
            displayOrderContentHTML();
            */
            expect (
              document.querySelectorAll('.js-card-item-container').length
            ).toEqual(2);
            expect (
            document.querySelector(`.js-product-quantity-${product1}`).textContent
            ).toContain('Quantity: 3');
            expect (
            document.querySelector(`.js-product-quantity-${product2}`).textContent
            ).toContain('Quantity: 1');
          document.querySelector('.js-test-container').innerHTML = ''; // to remove display page render after the test

  });
       it ('remove product', () => {
            document.querySelector(`.js-delete-quantity-link-${product1}`).click();

            expect (
              document.querySelectorAll('.js-card-item-container').length
            ).toEqual(1);
          
            expect (
              document.querySelector(`.js-cart-item-container-${product1} `)
            ).toEqual(null);
            expect (
              document.querySelector(`.js-cart-item-container-${product2} `)
            ).not.toEqual(null);

            expect(carts.length).toEqual(1);
            expect(carts[0].productId).toEqual(product2);

             document.querySelector('.js-test-container').innerHTML = ''; // to remove display page render after the test
       });
});