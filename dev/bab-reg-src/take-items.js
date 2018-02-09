function generateRandomNumber (existingArray,max) {
  return new Promise(function (resolve, reject) {
    let randomNumber = Math.floor((Math.random() * max) + 1)

    if (existingArray.includes(randomNumber)) {
      reject('number already in array')
    } else {
      resolve(randomNumber)
    }
  })
}


function runGen(inArray,iters,max) {
    generateRandomNumber(inArray,max).then(function(result) {
        checkRets(iters,result)
        }).catch(function(error) {
        // console.log('Error: ' + error)
        checkRets(iters)
    })
}

let outArray = [];
let refArray
let refMax = 1;
let onAllDone
function checkRets(iters,newval) {
    if (newval) {
        outArray.push(newval)
    }
    if (outArray.length < iters) {
        // console.log('run again',outArray.length)
        runGen(outArray,iters,refMax)
    }
    else {
        onAllDone(outArray)
    }
}

function defaultOnAllDone(arrayRef) {
    console.log('defaultOnAllDone',arrayRef)
    let parsedArray = arrayRef.map(n => refArray[n] );
    console.log(parsedArray)
}

function takeItems(iters,thisRefArr,thisOnAllDone = defaultOnAllDone){
    refArray = thisRefArr
    refMax = thisRefArr.length-1
    onAllDone = thisOnAllDone
    checkRets(iters)
}
export default takeItems