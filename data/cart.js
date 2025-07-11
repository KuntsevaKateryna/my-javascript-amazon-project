export let carts = JSON.parse(localStorage.getItem('cartStorage'));
if (!carts) {
  carts = 
  [
    { productId: "k43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId : '1'
    },
    { productId: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
        quantity: 1,
        deliveryOptionId: '2'}
  ];
}

function saveToCart() {
  localStorage.setItem('cartStorage', JSON.stringify(carts));
}

export function addToCart(productId, button) {
  const quantitySelector = Number(
    document.querySelector(`.js-quantity-selector-${button.dataset.productId}`)
    .value);
          let matchingItem = carts.find(item => item.productId === productId);
    
          if (matchingItem) {
            //matchingItem.quantity = Number(matchingItem.quantity) + Number(matchingItem.quantity) //* Number(quantitySelector);
            matchingItem.quantity *= (1 + quantitySelector);
          } else {
            carts.push({
              productId: productId,
              quantity: quantitySelector,
              deliveryOptionId : '2'
            });
          }
          console.log(carts);
          saveToCart();
}

export function removeProductFromCart (productId) {

  let newCart = [];

  carts.forEach(element => {
    if (productId !== element.productId) {
      newCart.push(element);
    }
  });

  carts = newCart;
  saveToCart();
}