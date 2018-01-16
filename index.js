const postcss = require('postcss')
const wxssPlugin = require('postcss-wxss')
const clean = require('postcss-clean')
const fs = require('fs')
const path = require('path')

// Todo: ignore imports in comments
const importRegx = /@import\s+(?:'(.+\.wxss)'|"(.+\.wxss)");?/g

let fileStack = []

/**
 * construct fullpath from path url
 *
 * @param {string} file
 * @returns {string} fullPath
 */
const constructPath = function (file) {
  let dir
  const isAbsolutePath = path.isAbsolute(file)
  const lastFile = fileStack.slice(-1)[0]
  if (lastFile && !isAbsolutePath) {
    dir = path.dirname(lastFile)
  } else {
    dir = process.cwd()
  }
  const fullPath = isAbsolutePath
    ? path.join(dir, file)
    : path.resolve(dir, file)

  if (fileStack.indexOf(fullPath) === -1) {
    fileStack.push(fullPath)
  } else {
    throw new Error('Circular Import')
  }
  return fullPath
}

/**
 * getContent from first file and insert templates into it
 *
 * @param {string} file
 * @returns {string} fileContent
 */
const getContent = function (file) {
  const content = fs.readFileSync(constructPath(file))
  return content.toString().replace(importRegx, function (str, p1, p2) {
    const childPath = p1 || p2
    const res = getContent(childPath)
    fileStack.pop()
    return res
  })
}

module.exports = function (files, opts) {
  fileStack = []
  const fileList = files.slice()
  const initFile = fileList.shift()
  const cssFileContent = getContent(initFile)

  // remove "//" to remove single line comment, default: true
  const cssSource = opts && opts.keepSlash
    ? cssFileContent
    : cssFileContent.replace(/\/\//g, ' ')

  return postcss([clean(), wxssPlugin(opts)])
    .process(cssSource, { from: constructPath(initFile) })
    .then(res => res.css)
    .catch(err => console.log('Postcss Error:', err))
}
