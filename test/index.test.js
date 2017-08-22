/* eslint-env jest */
const transpiler = require('../index')
const path = require('path')
const CleanCSS = require('clean-css')
const cleanCSSOpt = {}
const minify = (function () {
  const minifier = new CleanCSS(cleanCSSOpt)
  return function (css) {
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
    transpiler(fileList),
    execp(getCMD(fileList))
  ]).then(res => {
    console.log(res)
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
