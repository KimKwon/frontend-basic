# 템플릿 리터럴

`Template Literals` 즉, 템플릿 리터럴은 기존의 자바스크립트 문자열보다 편리하고 강력한 기능을 제공한다. 내장 표현식, `tagged template` 등.

## 목차
- [Multiline](#multiline)
- [내장 표현식](#내장-표현식)
- [Tagged template](#tagged-template)

### Multiline
기존의 `""`나 ` '' `을 사용한 문자열로 여러 줄의 문자, 즉 개행을 표현하기는 여간 번거로운 일이 아니었다.
```javascript
const multiline = "Hello\nMy name is\nJin";
const multiline2 = "Hello\n" + "My name is \n" + "Jin";

// Hello
// My name is
// Jin
```

하지만 위의 문자열을 백틱(` `` `)을 활용한 템플릿 리터럴을 사용하면 다음과 같이 표현할 수 있다.
```javascript
const multiline = `Hello
My name is 
Jin `;
```
----

### 내장 표현식

위에서 사용한 문자열에서 `Jin` 이 아니라 이름을 변수로 받아 문자열을 출력하고 싶다면 어떻게 해야할까?

기존의 문자열로 변수가 포함된 문자열을 출력하기 위해서는 다음과 같이 표현했다.

```javascript
const name = 'Hyuk';
const str = "Hello My name is " + name;
// "Hello My name is Hyuk"
```

템플릿 리터럴을 사용한다면 다음과 같이 백틱 안에 표현식을 내장시켜 표현할 수 있다.

```javascript 
const name = 'Hyuk';
const str = `Hello My name is ${name}`;
```

`${ 표현식 }` 달러 사인과 brace 사이에 표현식을 넣어 사용한다.
다음과 같이 다양한 표현식을 넣어 사용 가능하다.

```javascript
console.log(`오늘은 ${new Date().toDateString()} 입니다.`)
// Today is Sun Jul 11 2021
```
----

### Tagged Template

템플릿 리터럴을 사용해서 함수를 호출하고 그 인자까지 전달해줄 수 있는 기능이다. 

```javascript

function tagTest(str, ...args) {
    return `${args[0]}은 ${args[1]}살이며 ${args[2]}이다.`;
}    
const name = 'Jin';
const age = '25';
const sex = '남자';

tagTest`${name}${age}${sex}`;
// "Jin은 25살이며 남자이다."
```

위와 같이 첫번째 인자로 `template literal` 문자열을 넘겨 주고 템플릿 리터럴 안의 변수를 인자로 전달할 수 있다.
