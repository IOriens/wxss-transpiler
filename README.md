# wxss-transpiler [![Build Status][ci-img]][ci]

Port of wcsc.exe to Javascript.
> Test only works on macOS, but this transpiler itself works universally, even on linux.

## Usage

```sh
npm i wxss-transpiler
```

```js
const  transpile = require('wxss-transpiler')
const fileList = ['./css/single.wxss']
transpile(fileList).then(res => console.log(res))
```

## Liscense

MIT

[ci-img]:  https://travis-ci.org/IOriens/wxss-transpiler.svg
[ci]:      https://travis-ci.org/IOriens/wxss-transpiler
