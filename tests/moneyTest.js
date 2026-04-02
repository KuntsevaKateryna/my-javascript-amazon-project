import {getMoneyFormat} from '../scripts/utils/moneyFormat.js';
console.log(`Test suite: getMoneyFormat:`);
console.log(`works with 0:`);
if (getMoneyFormat(0) === '0.00')
  {console.log('passed');
} else {
  console.log('failed');
}

console.log(`Rounds up to the nearest cent:`);
console.log(`test: ${getMoneyFormat(2000.5)}`);
if (getMoneyFormat(2000.5) === '20.01')
  {console.log('passed');
} else {
  console.log('failed');
}

console.log(`test: ${getMoneyFormat(2000.4)}`);
if (getMoneyFormat(2000.4) === '20.00')
  {console.log('passed');
} else {
  console.log('failed');
}
