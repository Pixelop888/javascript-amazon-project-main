export function formatCurrency(priceCents){
  let formatedCurrency = (Math.round(priceCents)/100).toFixed(2);
  return formatedCurrency;
}