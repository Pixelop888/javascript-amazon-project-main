
import { loadCart } from "../data/cart.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";

//import "../data/cart-class.js";
// import "../data/back-end.js";


async function loadPage() {
  try{
    await loadProductsFetch(); //only used inside async function 
    const value =await new Promise((resolve)=>{
    loadCart(()=>{
      console.log('loadcart loaded');
      resolve('value-cart');
    });
  });
  }catch (error) {
    console.log('unexpected error has occured , please try again later');   
  }
  renderOrderSummary();
  renderPaymentSummary()
}

loadPage();

