import {cart, removeCartItem,updateDeliveryOption} from "../../data/cart.js";
import {getProduct, products} from "../../data/products.js";
import{hello} from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js"; // what is the difference between these 
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import{deliveryOptionList, getDeliveryOption} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentsummary.js";


export function renderOrderSummary(){
  
  let checkoutListHtml ='';

  cart.forEach((item)=>{
    let productId = item.productId;
    let matchingitem = getProduct(productId);

    let deliverOptionId= item.deliveryOptionId;
    let selectedDeliveryOption = getDeliveryOption(deliverOptionId);
    const today = dayjs();
    const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, 'days');
    const deliveryString = deliveryDate.format('dddd, MMM D');

    checkoutListHtml += `
    <div class="cart-item-container js-item-container js-item-container-${matchingitem.id}">
        <div class="delivery-date">
          Delivery date: ${deliveryString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingitem.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingitem.name}
            </div>
            <div class="product-price">
              $${(matchingitem.getPriceCents())}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-item" data-product-id="${matchingitem.id}">
                Update
              </span>
              <div class="is-updating-div update-container-${matchingitem.id}"> 
              <input type="number" class="js-update-quantity css-input-update-quantity">
              
              <span class="link-primary is-updating-quantity">
                Save
              </span>
              </div>
              <span class="delete-quantity-link link-primary js-remove-item" data-product-id="${matchingitem.id}" >
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptions(matchingitem,item)}
          </div>
        </div>
      </div>
    `  
   });

  
  document.querySelector('.js-order-summary').innerHTML=checkoutListHtml;

  updateCartQuantity();
  
  function deliveryOptions(matchingitem,item) {
    const today = dayjs();
    let html ='';
    deliveryOptionList.forEach((delivery) => {
      const deliveryDate = today.add(delivery.deliveryDays, 'days');
      const deliveryString = deliveryDate.format('dddd, MMM D');
      const deliveryCost = delivery.priceCents===0? 'Free': `$${(delivery.priceCents/100).toFixed(2)}`;
      const isChecked = delivery.deliveryId===item.deliveryOptionId; 
      html += `
        <div class="delivery-option">
          <input type="radio" ${isChecked? 'checked': ''}
            class="delivery-option-input"
              data-product-id="${matchingitem.id}"
              data-delivery-id="${delivery.deliveryId}"
            name="delivery-${matchingitem.id}">
          <div>
            <div class="delivery-option-date">
              ${deliveryString}
            </div>
            <div class="delivery-option-price">
              ${deliveryCost} Shipping
            </div>
          </div>
        </div>
      `
      
    });
    return html;
    }

  document.querySelectorAll('.delivery-option-input').forEach((radio)=>{
    radio.addEventListener('change',()=>{
      const productId = radio.dataset.productId;
      const deliveryId = radio.dataset.deliveryId;
      updateDeliveryOption(productId, deliveryId);
      renderOrderSummary();
      renderPaymentSummary();
    })
    })


  document.querySelectorAll('.js-remove-item').forEach((deletebutton)=>{
    deletebutton.addEventListener('click',()=>{
      const productId =deletebutton.dataset.productId;
      console.log(productId);
      removeCartItem(productId); //imported from cart.js
      renderOrderSummary();
      console.log(cart); 
      renderPaymentSummary();
    })
    });
    
  document.querySelectorAll('.js-update-item').forEach((updatebutton)=>{
    updatebutton.addEventListener('click',()=>{
      const productId =updatebutton.dataset.productId;
      
      const update =document.querySelector(`.update-container-${productId}`);

    })
    });

}


  function updateCartQuantity(){
    let cartQuantity =0;
    cart.forEach((item)=>{
    cartQuantity++;
  });
    document.querySelector('.js-checkout-quantity').innerHTML = cartQuantity;
    console.log(cartQuantity);
}

