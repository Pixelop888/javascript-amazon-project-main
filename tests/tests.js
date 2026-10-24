import {formatCurrency} from "../scripts/utils/money.js";

console.log('test-suite');
console.log('convert price in cents to dollar ');
if(formatCurrency(2095)==='20.95'){
  console.log('passed');
}else{
  console.log('failed');
}
console.log('effect of 0');
if(formatCurrency(0)==='0.00'){
  console.log('passed');
}else{
  console.log('failed');
}
console.log('convert price in cents to dollar ');
if(formatCurrency(2000.5)==='20.01'){
  console.log('passed');
}else{
  console.log('failed');
}