const cc = {
  filterCC: function (targarr, reqkey, reqval) {
    let filter1 = targarr.filter(function (el) {
      return el[reqkey] === reqval
    })
    return filter1
  },
  indexCC: function (targarr, reqkey, reqval) {
    let indexes = targarr.map(function (obj, index) {
      if (obj[reqkey] == reqval) {
        return index
      }
    }).filter(isFinite)
    return indexes
  }
}


export default cc;