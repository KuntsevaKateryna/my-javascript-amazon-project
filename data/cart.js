export const carts = [];

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
              quantity: quantitySelector
            });
          }
          console.log(carts);
}