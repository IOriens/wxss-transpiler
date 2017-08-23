/* eslint-env jest */
const transpile = require('../index')
const path = require('path')
const CleanCSS = require('clean-css')
const cleanCSSOpt = {}
const minify = (function () {
  const minifier = new CleanCSS(cleanCSSOpt)
  return function (css) {
    const res = minifier.minify(css)
    if (res.warnings.length) throw res.warnings
    return minifier.minify(css).styles
  }
})()

const wcsc = path.resolve(__dirname, '../lib/wcsc')
const getCMD = function (fileList) {
  const cmd = `${wcsc} -lc ${fileList.join(' ')}`
  return cmd
}

const exec = require('child_process').exec
const execp = function (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(err)
      if (stderr) reject(stderr)
      resolve(stdout)
    })
  })
}

const testFileList = function (fileList) {
  return Promise.all([
    execp(getCMD(fileList)),
    transpile(fileList)
  ]).then(res => {
    expect(minify(res[0])).toEqual(minify(res[1]))
  })
}

beforeAll(() => {
  try {
    process.chdir('test')
  } catch (err) {
    console.error(`chdir: ${err}`)
  }
})

it('compile single file', () => {
  const fileList = ['./css/single.wxss']
  return testFileList(fileList)
})

it('compile imported file', () => {
  const fileList = [
    './css/import/A.wxss',
    './css/import/B.wxss',
    './css/import/C.wxss'
  ]
  return testFileList(fileList)
})

it('throw when enconter circular imported file', () => {
  const fileList = [
    './css/import-circular/A.wxss',
    './css/import-circular/B.wxss',
    './css/import-circular/C.wxss'
  ]
  expect(() => transpile(fileList)).toThrow('Circular Import')
})
