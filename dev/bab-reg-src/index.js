
import capitalize from './titlelize.js';
import cc from './collection-code';
import * as testdata from './testdata';
import takeItems from './take-items';

  console.log('again')
  console.log(capitalize('howdy'));
  function jsStr(argument) {
    return JSON.stringify(argument,null,2)
  }
  function getSum(total, num) {
      return total + num;
  }
  console.log(cc.filterCC(testdata.people,'name','Ian'))
  let userSelectedColors = ['lightBlue', 'darkBlue'];
  let totalCount = testdata.items.reduce(function(total, obj) {
    return total + userSelectedColors.reduce(function(total, prop) {
      return total + obj[prop];
    }, 0);
  }, 0);
  console.log(totalCount)
  let totals = testdata.numbers.reduce(getSum);
  console.log(totals)
  takeItems(3,testdata.NAMES,function(rets) {
      console.log('custom on all done',rets)
      let parsedArray = rets.map(n => testdata.NAMES[n] );
      console.log(parsedArray)
  })


