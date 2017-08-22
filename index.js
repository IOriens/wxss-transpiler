const postcss = require('postcss')
const wxssPlugin = require('postcss-wxss')

module.exports = function (fileList, opts) {
  postcss([wxssPlugin]).process('input{}').then(result => {
    console.log(result.css)
    console.log(result.warnings().length)
  })
}

