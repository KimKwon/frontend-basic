# 호이스팅 (Hoisting)

호이스팅에 대해 알아보자.

## 목차
- [호이스팅이란?](#호이스팅이란?)
- [호이스팅 예제](#호이스팅-예제)
- [let과 const의 호이스팅](#let과-const의-호이스팅)

---

### 호이스팅이란?

호이스팅(Hoisting)이란 단어 뜻 그대로 끌어올리는 역할을 한다.
자바스크립트에서 변수나 함수의 선언이 `유효범위`의 최상단으로 끌어올려지는 것을 의미한다.
> 실제로는 최상단으로 끌어올려지지 않고 작성한 위치에 그대로 있다.
> 외부적으로 끌어올려지는 것처럼 보일 뿐.

호이스팅을 사용하면 
1. 선언하지 않은 변수에 접근할 수 있다는 장점아닌 장점을 가지고 있다.
2. 코드 상에서 아직 선언되지 않은 함수를 실행할 수도 있다.

코드를 통해 자세히 알아보자.

---

### 호이스팅 예제

```javascript 
console.log(simple())
function simple() {
  return 'simple';
}

console.log(simple2())
var simple2 = function() {
  return 'simple2';
}

console.log(simple3())
const simple3 = function() {
  return 'simple3';
}


```

5개의 출력의 결과값은 각각 어떻게 될까?

1. 
```javascript 
console.log(simple()) // 'simple'
function simple() {
  return 'simple';
}
```

가장 일반적인 구조의 함수 선언식이다.
`function` 지시어를 통해 선언한 함수는 유효범위의 최상단으로 호이스팅되어 `simple`을 반환한다.

---

2. 
```javascript
console.log(simple2()) // TypeError: simple2 is not a function
var simple2 = function() {
  return 'simple2';
}
```

위의 코드는 호이스팅에 의해 다음과 같은 모습이 될 것이다.

```javascript
var simple2;
console.log(simple2()) // TypeError: simple2 is not a function
simple2 = function() {
  return 'simple2';
}
```

최상단으로 끌어올려진 `simple2` 변수는 초기화가 되어있지 않아 `undefined` 값을 갖는다.
결과적으로 TypeError을 발생시킨다.

---

3. 
```javascript
console.log(simple3()) // ReferenceError: Cannot access 'simple3' before initialization
const simple3 = function() {
  return 'simple3';
}
```
2번의 코드에서 `var` -> `const`로 바꾸었다.
const는 var와 달리 ReferenceError을 낸다. 

`simple2는 함수가 아니다.` 라는 에러와 `simple3가 초기화 되기 전에는 접근할 수 없다.`

후자가 에러의 원인을 더 쉽게 찾을 수 있지 않을까?

***그나저나 `const`는 호이스팅이 일어난걸까?***

`let과 const의 호이스팅`에 대해서는 밑에서 다루겠다.


---

### let과 const의 호이스팅

위의 3번 예제에서 `let, const`도 호이스팅이 발생하는가에 대한 의문을 가지게 되었다.
다음의 코드를 살펴보자.

```javascript
const x = 'global';
function test() {
  console.log(x); 
  const x = 'local';
};

test(); // ReferenceError: Cannot access 'x' before initialization
```

위 test 함수를 실행하면 레퍼런스 에러가 발생한다. 왜 그럴까?
const가 호이스팅이 발생하지 않는다면 `'global'`이 출력되어야만 한다. 

**즉, const에서도 호이스팅이 일어났음을 알 수 있다.**

추가적으로 변수의 선언과 변수에 값을 할당하는 과정 사이에 `TDZ(Temporal Dead Zone)`라는 것이 존재한다.

위 코드에서 3번라인에서 x를 출력하려는 시도는 아직 TDZ에 해당하는 x에 대해 접근했기 때문에 레퍼런스 에러가 발생한 것이다. *(초기화, 즉 const의 경우 할당이 일어나기 전의 접근은 차단한다)*

---

