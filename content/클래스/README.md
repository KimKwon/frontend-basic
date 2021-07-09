# 클래스

모던 Javascript에서 객체를 보다 정교하게 만들 수 있게 하는 틀과 같다. 메서드와 속성으로 구성된다.

## 목차
- [클래스](#클래스)
- [상속](#상속)
- [오버라이딩](#오버라이딩)

### 클래스

```javascript
class Person {
    constructor() {
        // something
    }
}
```
기본적으로 위와 같은 틀을 갖는다.
`class`라는 키워드를 통해 선언이 가능하다.
`constructor`는 생성자 메서드로 객체의 초기화(init)을 담당한다.
```javascript
const person = new Person(); // person -> 인스턴스
```
다음과 같이 `new` 를 통해 객체를 생성할 수 있다.
`new`를 통해 객체를 생성하면 자동으로 `constructor`가 실행되어 초기화까지 가능하다.

```javascript
class Person {
    constructor(age, sex, name) {
        this.age = age;
        this.sex = sex;
        this.name = name;
    }
    
    talk() {
        return `My name is ${this.name}.`;
    }
}
```

위 코드에서 `age`, `sex`, `name` 은 속성(프로퍼티)이고 
`talk`는 메서드가 된다.

```javascript
const person = new Person(20, 'male', 'Jin');
console.log(person.age); // 20
console.log(person.sex); // 'male'
console.log(person.name); // 'Jin'

console.log(person.talk()) // 'My name is Jin'
```
---

### 상속
하나의 클래스를 이용하여 다른 클래스로 확장하는 개념이다

`extends` 키워드를 사용하여 상속한다.
`A extends B`와 같은 관계에서 A는 B의 속성과 메서드를 갖는다.

`extends`는 `prototype` 을 사용하여 동작한다.
`prototype`의 상세한 내용은 다른 파트에서 정리 해보겠다.
간단하게 B의 프로토타입을 A로 설정한다고 생각하면 된다.


```javascript
class Developer extends Person {

    constructor(age, sex, name, part = 'FrontEnd') {
        super(age, sex, name);
        this.part = part;
    }

    coding() {
        return `${this.part} coding...`;
    }
}
```
위 예제는 `Person` 클래스를 상속한 `Developer` 클래스이다.

`super()` 는 상위 클래스 즉, `Person` 클래스의 `constructor`을 실행시키는 역할을 한다. 상속 클래스의 경우 **반드시 `super()`을 호출해주어야 한다.** 




```javascript
const developer = new Developer(20, 'male', 'James');
console.log(developer.age); // 20
console.log(developer.sex); // 'male'
console.log(developer.name); // 'Jin'
console.log(developer.part); // 'FrontEnd'

console.log(developer.coding()); // 'FrontEnd coding...'
console.log(developer.talk()) // 'My name is James'
```

여기서 `Developer` 클래스 에는 `talk`메서드가 정의되어 있지 않은데 왜 정상동작할까? 

-> *`prototype chaining`* 을 사용해 Developer의 프로토타입을 참조하여 Person 클래스에 있는 talk를 추적하는 과정이 있었기 때문이다. 
즉, Developer 클래스에서는 Person 클래스에 정의된 메서드에 접근할 수 있음.
> 프로토타입 체이닝을 통해 프로토타입 추적 과정을 거친 후 찾지 못했을 경우 최종적으로 `undefined` 를 반환하게 된다.

---

### 오버라이딩

오버라이딩이란 상위 클래스에서 제공받은 메서드, 속성을 재정의하는 것을 의미한다.

(가정)
1. `talk` 메서드 호출 시 내 이름을 말하고 난 항상 배고파!!!라고 하고싶다.
2. 성별을 'male' , 'female'이 아닌 '남', '여'로 바꾸고 싶다.

```javascript
class Developer extends Person {

    constructor(age, sex, name, part = 'FrontEnd') {
        super(age, sex, name);
        this.part = part;
        this.sex = this.sex === 'male' ? '남' : '여';
    }
    
    talk() {
        return `${super.talk()} But, I am always hungry...`;
    }

    coding() {
        return `${this.part} coding...`;
    }
}
```

`talk` 메서드는 Person의 talk가 아닌 Developer에서 재정의한 talk를 참조하게 된다.

super.`메서드이름` 으로 상위 클래스의 메소드를 부분적으로 호출할 수도 있다.
