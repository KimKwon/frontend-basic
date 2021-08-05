## Next.js + Typescript Path Alias 설정하기

#### Issue
` import ModuleName from '../../[path]'` 와 같이 import 상대경로의 길이가 길어지는 문제를 해결하기 위함.

#### Path Alias 설정

```javascript
// next.config.js
module.exports = {
  ....
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      [설정하고 싶은 Path Alias]: [실제 경로 ex) (./components) ],
    }
    return config;
  }
}
```
`next.config.js` 에서 `webpack`의 설정을 커스텀할 수 있다.
`resolve.alias` 속성을 수정함으로 path alias를 지정할 수 있음.

```javascript
// .babelrc
{
  ...
  "plugins": [
    ...
    [
      "module-resolver",
      {
        "alias": {
          [설정하고 싶은 Path Alias]: [실제 경로 ex) './components' ],
        }
      }
    ]
  ]
}

```
`webpack`을 통한 번들링 중 `Babel`이 해당 경로를 이해할 수 있도록 설정 추가. 

```javascript
// tsconfig.json
{
  "compilerOptions": {
    ...
    "paths": {
      "@components/*": ["./components/*"],
    }
  },
  ...
}
```
Typescript => Javascript 트랜스파일링 과정에서 path를 온전히 변환할 수 있도록 설정.


----

> 3가지 파일이나 변경해줘야해서 조금 복잡하다... 
