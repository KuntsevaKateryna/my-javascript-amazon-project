import {addToCartBasic, carts, loadFromStorage} from '../../data/cart.js';

describe('Test suite: add to cart:',
  () => {
    it('add 1 product to cart',
       () => {
          spyOn(localStorage, 'setItem');
          spyOn(localStorage, 'getItem').and.callFake(
                ()=>{
                  return JSON.stringify([]);
                }
              );
              loadFromStorage();
             

        addToCartBasic('k43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(carts.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(carts[0].productId).toEqual('k43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(carts[0].quantity).toEqual(1);
       });

    it('add an existing product to cart',
       () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(
                ()=>{
                  return JSON.stringify([
                    { productId: "k43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                      quantity: 1,
                      deliveryOptionId : '1'
                    }
                  ]);
                }
              );
        loadFromStorage();
        addToCartBasic('k43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(carts.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(carts[0].productId).toEqual('k43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(carts[0].quantity).toEqual(2);
       });
       
  }
);


