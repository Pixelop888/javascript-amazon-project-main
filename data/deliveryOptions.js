export function getDeliveryOption(deliverOptionId){
  let selectedDeliveryOption;
      deliveryOptionList.forEach((options)=>{
        if(options.deliveryId === deliverOptionId){
          selectedDeliveryOption=options;
        }
      });
      return selectedDeliveryOption;
}
export const deliveryOptionList = [
  {
    deliveryId:'1',
    deliveryDays : 7,
    priceCents:0
  },
  {
    deliveryId:'2',
    deliveryDays : 3,
    priceCents:499
  }
  ,{
    deliveryId:'3',
    deliveryDays : 1,
    priceCents:999
  }
]