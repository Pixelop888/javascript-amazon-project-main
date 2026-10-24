import { orders } from "../data/orders.js";
import { products,getProduct,loadProducts } from "../data/products.js";
loadProducts(RenderOrderPageGrid);

function RenderOrderPageGrid(){
   let HTML='';
   
  orders.forEach((orderObject) => {
    let MatchingProduct =
    HTML+= `<div class="order-container">  
            <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${new Date(orderObject.orderTime).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric' 
                })}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(Math.round(orderObject.totalCostCents)/100).toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderObject.id}</div>
            </div>
          </div>

          <div class="order-details-grid js-order-detail-grid">
            ${RenderOrderItemGrid(orderObject)}
          </div>
        </div>`
        

  });
  
    function RenderOrderItemGrid(orderObject){ 
      let OrderItemHtml='';
      orderObject.products.forEach((product)=>{ 
      let matchingitem= getProduct(product.productId);
      
      OrderItemHtml+=`
      <div class="product-image-container">
          <img src="${matchingitem.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
              ${matchingitem.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${new Date(product.estimatedDeliveryTime).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>`
      })
              return OrderItemHtml;
    }
  document.querySelector('.js-order-grid').innerHTML=HTML;

  
}
console.log(orders);
