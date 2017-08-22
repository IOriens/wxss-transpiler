# wxss-transpiler [![Build Status][ci-img]][ci]

Port of wcsc.exe to Javascript.

[ci-img]:  https://travis-ci.org/IOriens/wxss-transpiler.svg
[ci]:      https://travis-ci.org/IOriens/wxss-transpiler

## Usage

```sh
npm i wxss-transpiler
```

```js
const transpiler = require('wxss-transpiler')
const fileList = ['./css/single.wxss']
transpiler(fileList).then(res => console.log(res))
```

## todo

- support import

## Liscense

MIT