export let cart;
loadFromStorage();
export function loadFromStorage(){
cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart=[];
}
}

function savetostorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtocart (productId){
    let matchingitem;
    cart.forEach((item)=>{
      if(productId === item.productId){
        matchingitem=item;
      }
    });
    if(matchingitem){
      matchingitem.quantity+=1;
    }else{
      cart.push({
      productId:productId,
      quantity:1,
      deliveryOptionId:'1',
    });
    }
    savetostorage();  
    
}

export function removeCartItem(productId){
  const newCart =[];
  
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
        newCart.push(cartItem);
    }
  });
  cart=newCart;
  savetostorage();
}
export  function updateDeliveryOption(productId, deliveryId) {
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.deliveryOptionId = deliveryId;
    }
  });
  savetostorage();
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',()=>{
  console.log('load cart');
  fun();
  })
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}