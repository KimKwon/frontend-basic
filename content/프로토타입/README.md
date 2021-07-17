# 프로토타입

Javascript는 프로토타입 기반 언어이다. 
ES2015부터 지원하는 클래스 문법이 있지만, 내부적으로는 프로토타입을 기반으로 동작한다.

## 목차
- [프로토타입이란?](#프로토타입이란?)
- [프로토타입 체이닝](#프로토타입-체이닝)
- [함수의 프로토타입](#함수의-프로토타입)
- [프로토타입을 활용한 상속](#프로토타입을-활용한-상속)

### 프로토타입이란?

각각의 객체가 가지고 있는 `[[Prototype]]`이라는 private 속성을 의미한다.
이는 자신의 프로토타입이 되는 다른 객체를 가리킨다.

이러한 프로토타입은 객체를 상속받기 위한 *(내부의 속성이나 메서드까지)* 일종의 템플릿의 역할을 한다.

하나의 객체를 생성해보자.
```javascript 
let obj1 = {
    name: 'Peter',
    age: 20,
    say(){
        return '안녕';
    }
}

console.log(obj1.__proto__)
```

여기서 `__proto__` 속성은 해당 객체의 프로토타입을 가리키고 있다.
즉 `obj1.__proto__`는 obj1 객체의 프로토타입을 의미한다.

> `__proto__`는 모든 일반객체가 가지고 있다.
> MDN에 따르면 Deprecated 된 속성이다. 
> Object.getPrototypeOf() 로 대체되었음.

그렇다면 obj1의 프로토타입은 무엇일까?
상속받지 않은 일반 객체의 경우 자바스크립트의 최상위 객체인 `Object` 를 가리키게 된다.
> 실제로는 Object를 가리키는게 아닌 Object.prototype을 가리키고 있다.

---

### 프로토타입 체이닝

위의 `obj1` 객체가 갖고 있지 않은 메서드를 실행해보자.
```javascript
obj1.toString()
```

obj1에는 `toString`이라는 메서드가 없으니 에러를 발생하지 않을까~? 
싶겠지만 그렇지 않다.

obj1에는 `toString` 메서드가 존재하지 않지만 `Object`의 프로토타입에 `toString`이 존재한다. 

이렇게 상위 프로토타입으로 **계속 탐색해나가는 행위를 `프로토타입 체이닝`** 이라고 한다.

----

객체 2개를 생성해보자.

```javascript 
let obj2 = {
    name: 'Alice',
    age: 21,
    eat() {
        return '쩝쩝';
    }
}

let obj3 = {
    name: 'Tom',
    age: 23,
    move() {
        return '슝슝';
    }
}

```

두 객체 모두 `__proto__`를 가지고 있고 Object의 prototype을 가리키고 있다.

한 번 obj2의 `__proto__`가 obj3을 가리키도록 해보자.
```javascript 
obj2.__proto__ = obj3;
```

```javascript 
console.log(obj2.eat()); // '쩝쩝'
console.log(obj2.move()); // '슝슝'
```

obj2에는 `move`라는 메서드가 없기 때문에 obj2의 프로토타입을 참조하게 된다. 
이 때 obj2의 프로토타입은 obj3이므로 obj3에서 `move`라는 메서드를 발견하고 실행하게 되는 것이다.

---

```javascript 
console.log(obj2.foo); // undefined
```
`프로토타입 체이닝`을 통해 연결된 최상위 프로토타입까지 탐색한 뒤에 찾을 수 없다면 그 때 `undefined` 를 출력한다. 

아까 최상위 객체가 `Object`라고 했는데, 이 `Object`의 프로토타입은 `null`이다. 
즉, 프로토타입 체이닝 중 `null`이 나타난다면 그 때 해당 속성/메서드는 최종적으로 `undefined`가 되는 것이다.

---- 

### 함수의 프로토타입 

javascript에서 객체를 생성하는 방법은 대충 3가지 정도 되는데
앞에서 언급한 생성방법은 `객체 리터럴`을 사용해서 생성하는 방법이다.

> 1. 객체 리터럴
> 2. Object.create()
> 3. 생성자 함수

다른 방법 중 하나인 `생성자 함수`를 사용해서 객체를 생성해보자.

```javascript 
function Parent() {
    this.name = 'Donald',
    this.sayHello = function() {
        return `Hello, I'm ${this.name}`;
    }
}
```

이러한 함수 객체와 일반 객체의 차이점은 `prototype`이라는 속성을 갖는 것이다.

```javascript
console.log(Parent.prototype);
```

`prototype` 속성은 생성자의 속성으로 `__proto__`와는 다르다는 것을 확실히 이해해야한다.

우선, `Parent` 생성자를 이용해 `parent`라는 인스턴스를 만들어보자.

```javascript 
const parent = new Parent();

// parent.__proto__ === Parent.prototype
```
`Parent` 생성자로부터 생성된 인스턴스 `parent`의 `__proto__` 는 `Parent.prototype`과 같다.

즉, `prototype` 은 생성자의 속성으로 **상속하고자 할 속성이나 메소드들을 가지고 있다.** 

---

### 프로토타입을 활용한 상속

##### 프로토타입에 새로운 메서드를 추가해보자.

```javascript 
Parent.prototype.whoru = function() {
    return this;
}

parent.whoru(); // Parent {}
```

*그럼 함수 내부에 정의하는 것과 `prototype`에 정의하는 것이 무슨 차이일까?*


#### 아래와 같이 Child라는 객체를 생성해보자.

```javascript 
function Child() {
    
}
```
`Parent` 객체를 `Child`에서 상속받고 싶다고하자.
Child의 prototype이 Parent의 prototype이 되어야할 것이다.
```javascript 
Child.prototype = Object.create(Parent.prototype);

Child.prototype.constructor = Child;
// Child의 생성자를 설정해준다.
```
이를 기반으로 Child의 인스턴스를 생성해보자.
```javascript
const child = new Child();
console.log(child.name); // undefined
console.log(child.sayHello()) // ERR: not a function

console.log(child.whoru()) // CC {}
```

*어라? 왜 `name`과 `sayHello`에 접근할 수 없을까?*
분명 `Parent`에 `name`과 `sayHello`가 정의되어있지 않았는가!

!! 

그 이유는 `name`과 `sayHello`는 Parent 자체에 정의된 속성이지, prototype에 정의된 속성이 아니기 때문이다. 그래서 `child.whoru()`는 올바르게 동작한다.

***그럼 어떻게 해야하나요? 접근할 수 없나요?***

```javascript 
function Child() {
    Parent.call(this); // Parent 생성자 호출
}
```

상속받고자 하는 객체의 생성자를 호출해주면 된다.

```javascript
const child = new Child();
console.log(child.name); // 'Donald'
console.log(child.sayHello()) // 'Hello, I'm Donald'

console.log(child.whoru()) // Child {}
```
