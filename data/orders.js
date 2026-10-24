export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function PlaceOrderSummary(order){
  orders.unshift(order);
  savetoStorage();
}

function savetoStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
}

