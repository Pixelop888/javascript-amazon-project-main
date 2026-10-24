import{addtocart, cart, loadFromStorage} from "../data/cart.js"

describe('test suite : add to cart',()=>{
  it('adds an existing product to cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:1,
      deliveryOptionId:'1',}]);
    });
    loadFromStorage();
    addtocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(2);
    
  });

  it('adds a new item to cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    })
    spyOn(localStorage,'setItem');
    loadFromStorage();
    addtocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
  });
})