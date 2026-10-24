import { renderOrderSummary } from "../scripts/checkout/ordersummary.js";
import{loadFromStorage} from "../data/cart.js";
import { loadProducts } from "../data/products.js";

  describe('Test Suite : renderOrderSummary',()=>{
    beforeEach(()=>{
         document.querySelector('.js-test-container').innerHTML=`<div class="js-order-summary"></div>  <div class="js-checkout-quantity"></div>`;
        
          spyOn(localStorage,'setItem');
          spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:1,
            deliveryOptionId:'1',}]);
          });
      });
       beforeAll((done)=>{//jab tk done not called tb tk wo ruka rehta hai 
        loadProducts(()=>{//yha load krte time jab sab load hoga tab fun called hota which is done then only before all ends
          done();
        });
      })
    it('displays the cart',()=>{     
          loadFromStorage();
          renderOrderSummary();// this is why test failed
          console.log('.js-test-container');
          expect(document.querySelectorAll('.js-item-container').length).toEqual(1);
    });
  })