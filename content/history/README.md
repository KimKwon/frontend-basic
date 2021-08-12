# History API

SPA에서는 어떻게 라우터를 구성할까?

리액트에서는 `react-router-dom` 같은 라이브러리가 존재하는데 이는 내부적으로 `History API` 로 구현되어있다.

브라우저가 제공하는 History API를 사용하여 주소를 바꿀 수 있다는 것인데, 한번 자세히 알아보자.

## 목차
- [History란?](#history란?)
- [주요 Methods](#주요-methods)


### History란?

`History`란 무엇일까.

다들 주소창에서 뒤로가기, 앞으로가기 등의 기능을 사용해봤을 것이다.

브라우저에서는 방문한 주소의 내역을 마치 주소록처럼 보관하고 있는데 이 주소록이 `History` 이다. 

우리는 이 주소록 안에서 앞으로갔다가~ 뒤로갔다가~ 브라우저가 제공하는 `History API`를 사용해서 이동하고 있는 것이다.

그럼 이 History API 안에는 어떤 메서드들이 있는지 알아보자.


--- 


### 주요 Methods

* *history.pushState()*
    * ***@params (state, title, url?)***
    * state: 푸시하는 새로운 state의 정보를 나타내는 객체.
    * title: 대부분의 브라우저가 이 매개변수를 무시한다고 한다. 빈 문자열을 넘기자.
    * url?: 푸시하는 새로운 state의 URL이다. 상대 URL을 지정할 수 있음.


현재 `localhost:3000` 에 위치하고 있다고 가정해보자.

```javascript
history.pushState({ name: 'Jin' }, '', 'happy');
```

위의 코드를 실행하면 주소창에 변화가 생긴다.
`localhost:3000/happy` 가 되었을 것이다.

그럼 한번 더 해보자.

```javascript
history.pushState({ name: 'Thomas' }, '', 'hungry');
```
`localhost:3000/hungry` 가 되었을 것이다.


자. 주소창의 URL이 `pushState` 를 통해 변경되는 것을 알게 되었다.

> 그럼 pushState의 첫번째 파라미터인 `state` 는 무슨 역할을 하는걸까? 
이는 밑에서 window의 이벤트  `onpopstate` 에 대해 얘기하며 같이 살펴보자.

--- 

* *history.replaceState()*
    * ***@params (state, title, url?)***
    * state: 푸시하는 새로운 state의 정보를 나타내는 객체.
    * title: 대부분의 브라우저가 이 매개변수를 무시한다고 한다. 빈 문자열을 넘기자.
    * url?: 푸시하는 새로운 state의 URL이다. 상대 URL을 지정할 수 있음.

pushState와 유사하나 **중요한 차이점**이 있다.

`pushState`의 경우 주소록 즉, `history`에 새로운 state를 **추가**하는 것이다.
반면, `replaceState`의 경우 현재 history의 state를 다른 것으로 **대체**하는 것이다.


아까와 같은 예시로 `localhost:3000` 에 위치하고 있다고 가정해보자.

```javascript
history.replaceState({ name: 'Jin' }, '', 'happy');
```
위의 코드를 실행해보자.
아까와 달리 차이점이 있다. 무엇일까?

`뒤로가기` 버튼을 눌러보길 바란다.

차이가 이해가 되는가?

`replaceState` 를 사용하면 현재 url에서 happy로 대체되는 것이다.

--- 

* *history.back()*
    * 뒤로가기
* *history.go(index)*
    * 특정 인덱스로 이동하기
* *history.forward()*
    * 앞으로가기

위의 메서드들은 window의 `onpopstate` 이벤트를 발생시킨다.
*반면 `pushState`와 `replaceState`는 발생시키지 않는다.*

```javascript
window.onpopstate = (e) => console.log(e.state);
```

`onpopstate` 이벤트가 발생하면 `e.state`를 출력하는 코드이다.
여기서 *`e.state`* 가 `pushState`와 `replaceState` 에서 **첫번째 파라미터로 전달한 값**이 된다.

위의 코드를 입력한 뒤, `history.back()` 혹은 `history.forward()` 을 실행시켜보자.

콘솔 창에 아까 **첫번째 파라미터로 입력했던 값**이 출력될 것이다.

> 이를 이용해 history의 state에 따라 화면을 구성하는 SPA 라우팅을 구현할 수 있다.
> state에 따라 구성하고자 하는 화면에 대한 정보를 담아 처리하는 방법을 사용하면 된다!



---
 
[맨 위로 가기](#history-api)

--- 
