# wxss-transpiler [![Build Status][ci-img]][ci]
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FIOriens%2Fwxss-transpiler.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FIOriens%2Fwxss-transpiler?ref=badge_shield)

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


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FIOriens%2Fwxss-transpiler.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FIOriens%2Fwxss-transpiler?ref=badge_large)