const glob = require('glob')

const { join, resolve } = require('path')


glob.sync(resolve(__dirname, 'pages/**/app.js')).forEach(path => {
  const chunk = path.split('/pages/')[1].split('/app.js')[0]
  // console.log(path)
  // console.log(chunk)
})
glob.sync('./pages/**/app.js').forEach(path => {
  const chunk = path.split('./pages/')[1].split('/app.js')[0]
  console.log(path)
  // console.log(chunk)
})