const postcss = require('postcss')
const wxssPlugin = require('postcss-wxss')
const fs = require('fs')

module.exports = function (files, opts) {
  const fileList = files.slice()
  const initFile = fileList.shift()
  const initSource = fs.readFileSync(initFile)
  const cssSource = initSource
  return postcss([wxssPlugin(opts)]).process(cssSource).then(res => res.css)
}
