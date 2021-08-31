# 컨텍스트

자바스크립트에서 this를 핸들링하다보면 도무지 이해가 안가는 경우가 있다.

이렇게 this로 오는 혼란이 자바스크립트 진입에 허들로 작용하는게 아닌가 싶다.

컨텍스트에 대해 알아보자.

## 목차
- [컨텍스트란?](#컨텍스트란?)
- [실행 컨텍스트](#실행-컨텍스트)
- [바인딩](#바인딩)
- [렉시컬 컨텍스트](#렉시컬-컨텍스트)


### 컨텍스트란?

`컨텍스트(Context)`란 무엇일까.

컨텍스트란 자바스크립트에서 ***호출되는 함수의 맥락(this)*** 이 결정되는 것을 의미한다.

크게 두가지의 컨텍스트가 존재한다.

1. **Execution Context (실행 컨텍스트)**
2. **Lexical Context (어휘적 컨텍스트)**


자바스크립트에서는 기본적으로 1번 즉, 실행 컨텍스트에 의해 `this`가 결정된다.


--- 

### 실행 컨텍스트

코드를 보며 `실행 컨텍스트` 에 대한 감을 잡아보자.

```javascript 
favorite = '🃏!함정!🃏';

const Aespa = {
  member: ['winter', 'karina', 'giselle', 'ningning'],
  favorite: 'winter',
  whoIsYourFavorite() {
    return this.favorite;
  }
}
```

`Aespa`라는 객체가 있고 나는 `whoIsYourFavorite`라는 메서드를 통해 내 최애 멤버를 출력하고 싶다.

가장 기본적인 방법은 다음과 같을 것이다.

```javascript 
Aespa.whoIsYourFavorite(); // 'winter'
```

이번엔 최애멤버 메서드를 다른 변수에 담아서 호출해보자.

```javascript 
const myFavorite = Aespa.whoIsYourFavorite;
myFavorite(); // '🃏!함정!🃏'
```

`myFavorite`는 예상과 다르게 함정에 빠졌다...

이 함정의 원인이 바로 `실행 컨텍스트`에 있다.


```javascript 
Aespa.whoIsYourFavorite(); // Aespa라는 실행 컨텍스트를 갖는다.

myFavorite(); // 실행 컨텍스트가 Aespa가 아닌 전역 객체가 된다.
```

실행 컨텍스트에 대해 감이 오는가?

**함수를 호출하는 시점에 결정되는 것** 이 실행 컨텍스트이다.

그렇다면 `myFavorite` 함수를 통해 우리가 원하는 결과를 낼 수는 없는걸까?

*this를 바인딩* 하는 방법에 대해 알아보자.

---

### 바인딩

이전에 함수 파트에 대해 정리할 때 언급했던 함수 호출 방법 두가지가 기억날 지 모르겠다.

함수를 호출하는 방법 중 `call`과 `apply`가 있었다.

이 두 함수는 첫번째 인자를 통해 *실행되는 함수의 this를 고정*시킬 수 있다.

```javascript 
myFavorite.call(Aespa); 
myFavorite.apply(Aespa);
```

> Aespa의 최애를 내놔



*좀 귀찮지 않나?*

이를 위해 애초부터 this를 고정하여 사용하는 `bind` 함수가 있다.

```javascript
const myRealFavorite = myFavorite.bind(Aespa);
myRealFavorite(); // 'winter'
```

bind함수는 인자로 받은 것을 this로 바인딩한 함수를 반환한다.

*한 번 bind에 의해 바인딩된 함수는 다시 bind될 수 없다!*


---

### 렉시컬 컨텍스트


우리는 위에서 실행컨텍스트에 의해 결정되는 this를 의도에 맞게 바인딩하여 사용하고 있다.

반면, 이를 선언되는 시점의 어휘적 맥락에 의해 this를 결정하는 방법이 있다.

그 방법이 `렉시컬 컨텍스트` 이다. 

렉시컬 컨텍스트를 사용하기 위해서는 `화살표 함수`를 사용해야 한다.

이 ***화살표 함수의 특징***은 다음과 같다.  
* 자체적인 this를 가지고 있지 않다.
* 어휘적 맥락에 의해 this가 결정된다. (상위 스코프를 참조한다.)

```javascript
function eatRamen() {
  setTimeout(function (){
    console.log(this.sound);
  }, 2000);
}

const 맛있는라면 = {
  sound: '후루룩 짭짭'
}

eatRamen.call(맛있는라면);
```

위의 코드를 실행하면 `후루룩 짭짭`이 아니라 `undefined`가 나온다.

```javascript
function eatRamen() {
  setTimeout(() => {
    console.log(this.sound);
  }, 2000);
}
```

하지만, 위의 코드를 실행하면 의도했던 대로 `후루룩 짭짭`이 잘 나온다.

------

자, 그럼 각각 `setTimeout` 안에서 가리키고 있는 `this`는 무엇일까 살펴보자.

**1. function 키워드로 넘긴 콜백의 this**

자바스크립트에서는 실행 컨텍스트에 의해 this가 바인딩됐다고 위에서 말했다.

화살표 함수가 아닌 일반 함수인 경우 `window.setTimeout`에 의해 실행되었기 때문에 항상 `window`을 `this`로 갖는다. 
때문에 `window`에서 `sound`라는 속성을 가지고 있지 않으니 `undefined`을 반환하게 된다.



**2. arrow function으로 넘긴 콜백의 this**

arrow function은 *렉시컬 컨텍스트*에 의해 this가 설정된다.
즉, `eatRamen`의 `this`를 가리키고 있을 것이다.

하지만 일반 함수에서의 `this`는 `window`이므로, `eatRamen`의 `this` 역시 `window` 이다. 

이를 `맛있는라면`으로 바인딩해주는 과정이 필요하다. 
```javascript
eatRamen.call(맛있는라면);
```

1번의 경우 바인딩을 해서 호출해도 `undefined` 를 반환한다.
