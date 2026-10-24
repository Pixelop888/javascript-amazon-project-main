class Cart{
  cartItems=undefined;
  #cartID;//shortcut for undefined items 

  constructor(cartID){
  this.#cartID=cartID;
  this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#cartID));
    if(!this.cartItems){
      this.cartItems=[{productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId:'1',},
        {productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionId:'2',}
      ];
    }
  }
 savetostorage(){
    localStorage.setItem(this.#cartID,JSON.stringify(this.cartItems));
    }

 addtocart (productId){
    let matchingitem;
    this.cartItems.forEach((item)=>{
      if(productId === item.productId){
        matchingitem=item;
      }
    });
    if(matchingitem){
      matchingitem.quantity+=1;
    }else{
      this.cartItems.push({
      productId:productId,
      quantity:1,
      deliveryOptionId:'1',
    });
    }
    this.savetostorage();  
    
}
 removeCartItem(productId){
  const newCart =[];
  
  this.cartItems.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
        newCart.push(cartItem);
    }
  });
  this.cartItems=newCart;
  this.savetostorage();
}

 updateDeliveryOption(productId, deliveryId) {
  this.cartItems.forEach((item) => {
    if (item.productId === productId) {
      item.deliveryOptionId = deliveryId;
    }
  });
  this.savetostorage();
}

}

const cart = new Cart('cart-oops');
const businessCart = new Cart('cart-business');
// iske baad constructor helps in the initialization process


cart.addtocart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

console.log(cart);
console.log(businessCart);
//console.log(cart.#cartID);//private key