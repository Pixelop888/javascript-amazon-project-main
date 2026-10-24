import {cart, removeCartItem,updateDeliveryOption} from "../../data/cart.js";
import {getProduct, products} from "../../data/products.js";
import{deliveryOptionList, getDeliveryOption} from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { PlaceOrderSummary } from "../../data/orders.js";

export  function renderPaymentSummary(){
  let totalItemCost = 0;
  let totalShippingCost = 0;
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    let productId = cartItem.productId;
    let deliveryoption = cartItem.deliveryOptionId || 1;
    const selectedDeliveryOption = getDeliveryOption(deliveryoption);
    const selectedItem = getProduct(productId);
    cartQuantity += cartItem.quantity ;
    totalItemCost += (selectedItem.priceCents )* (cartItem.quantity)
    
    totalShippingCost += selectedDeliveryOption.priceCents;
  })
  const totalBeforeTax = totalShippingCost + totalItemCost;
  const taxCalculation = totalBeforeTax*0.1
  const orderTotal = totalBeforeTax+ taxCalculation
  /*console.log(totalItemCost);
    console.log(totalShippingCost);
    console.log(totalBeforeTax);
    console.log(taxCalculation);
    console.log(orderTotal);
  */
   let paymentSummaryHTML = `
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-items">Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalItemCost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(totalShippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCalculation)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
          </div>
          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `

  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;


  document.querySelector('.js-place-order').addEventListener('click',async ()=>{
    try{
      const response =  await fetch('https://supersimplebackend.dev/orders',  {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart:cart
      })
    });
    const order =  await response.json();
    
    PlaceOrderSummary(order);
    console.log(order);
    }catch(error){
      console.log('unexpected error has occured please try again later');
    }
   
    window.location.href= 'orders.html';
    
  })

} 