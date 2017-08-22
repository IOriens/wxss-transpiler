# wxss-transpiler

Port of wcsc.exe to Javascript.

## Usage

```sh
npm i wxss-transpiler
```

```js
const transpiler = require('../index')
const fileList = ['./css/single.wxss']
transpiler(fileList).then(res => console.log(res))
```

## todo

- support import

## Liscense

MIT