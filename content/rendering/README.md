# 브라우저 렌더링

브라우저의 렌더링 과정에 대해서 알아보자.
이 과정을 잘 이해하고 있어야 웹페이지의 렌더링 성능에 대한 개선점을 찾기 수월할 것이다.

## 목차
- [렌더링 엔진](#렌더링-엔진)
- [DOM트리와 CSSOM트리](#dom트리와-cssom트리)
- [렌더링 트리](#렌더링-트리)
- [전체적 렌더링 과정](#전체적-렌더링-과정)

### 렌더링 엔진

각 브라우저는 렌더링을 수행하는 `렌더링 엔진`을 갖고 있다.
이 렌더링 엔진은 브라우저 별로 상이할 수 있다.

| 이름 | 설명 |
| - | - |
게코(Gecko)|	모질라 재단에서 만든 레이아웃 엔진으로 파이어폭스, 모질라 선더버드, 시몽키 등이 이를 탑재하고 있다.|
블링크(Blink) |	웹키트에서 파생된 레이아웃 엔진으로 크롬, 오페라 등이 이를 탑재하고 있다.
트라이던트(Trident) |	마이크로소프트의 레이아웃 엔진으로 인터넷 익스플로러, 아웃룩 익스프레스, 마이크로소프트 아웃룩, 그리고 윈앰프, 리얼플레이어의 미니 브라우저 등이 이를 탑재하고 있다. |
프레스토(Presto) |	오페라 소프트웨어의 사유 엔진으로 오페라가 탑재하고 있었으나, 오페라 15부터는 블링크로 교체되었다.
KHTML |	KDE의 컨커러가 탑재하고 있다.
웹키트(Webkit) |	KHTML에서 파생된 레이아웃 엔진으로 사파리 등이 탑재하고 있다.
태즈먼(Tasman) |	마이크로소프트의 레이아웃 엔진으로 맥용 인터넷 익스플로러가 탑재하고 있다.
EdgeHTML|	트라이던트에서 파생된 마이크로소프트의 레이아웃 엔진으로 마이크로소프트 엣지 스파르탄(~2019) 버전에 탑재하고 있었으나, 마이크로소프트 엣지 애너하임(2019~)부터는 블링크로 교체되었다.

> reference: [위키백과 - 브라우저 렌더링](https://ko.wikipedia.org/wiki/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%EC%97%94%EC%A7%84)

위와 같이 다양한 렌더링 엔진들이 브라우저의 렌더링을 담당하여 수행한다.

---

### DOM트리와 CSSOM트리

브라우저의 요청에 대하여 서버의 응답으로부터 HTML과 CSS 파일을 다운로드 받는다. HTML과 CSS파일은 텍스트 파일이므로 이를 `Object Model`로 변환한다. 
- HTML을 변환한 것이 `Document Object Model(=DOM)` 이다.
- CSS를 변환한 것이 `CSS Object Model (=CSSOM)` 이다.


#### DOM 트리
<p align="center">
  <img src="https://web-dev.imgix.net/image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/XNtLYpXIK4zOXj9AgG5Y.png?auto=format&w=1532" alt="dom-tree"  />
</p>


HTML 마크업을 위와 같은 트리 형태로 변환 시킨 것을 `DOM 트리`라고 한다.
브라우저는 이 DOM 트리를 사용하여 화면을 그리게 된다.

HTML의 각 노드들은 노드 간 상하구조를 가지고 있는데 이 역시 반영되어 있다. 위 트리를 기반으로 한 마크업은 다음과 같을 것이다.
```htmlembedded=
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Browser Rendering</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="how-to-render.jpg"></div>
  </body>
</html> 
```
--- 


#### CSSOM 트리
<p align="center">
  <img src="https://web-dev.imgix.net/image/C47gYyWYVMMhDmtYSLOWazuyePF2/keK3wDv9k2KzJA9QubFx.png?auto=format&w=1164" alt="cssom-tree"  />
</p>


CSSOM 트리 역시 트리구조로 이루어져있는데 이는 CSS의 적용이 하향식으로 되기 때문이다. 
`body` 노드의 하위 노드들은 모두 `font-size: 16px`을 가지지만, 하위 노드를 탐색하며 더욱 상세한 규칙을 정의할 수 있다.

가령 `body` 하위 노드 중 `p` 노드를 제외한 모든 노드가 `font-size: 16px`이고 `p`노드는 18px로 설정하고 싶다면 다음과 같이 설정할 것이다.

```css
body {
    font-size: 16px;
}

p {
    font-size: 18px;
}
```

위와 같은 계층적 스타일 규칙들을 적용하기 위해 하향식으로 CSSOM 트리를 탐색한다.


> reference : [구글 개발자 문서](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model?hl=ko)

---

### 렌더링 트리

렌더링 엔진은 위에서 언급한 `DOM 트리`와 `CSSOM 트리`를 기반으로 `렌더링 트리`를 만든다.

![](https://user-images.githubusercontent.com/22493971/202092409-0b7592f6-c7c9-46a1-b314-de19cde139d9.png)


여기서 렌더링 트리에는 실제로 **화면 상에 나타나게 되는 노드**만 포함한다. 
즉, css에 `display: none` 속성이 부여된 노드는 렌더링 트리에 포함되지 않는다는 것이다.


또한, 렌더링 트리는 각 노드들에 스타일 규칙이 적용되어 있다.

최종적으로 이 렌더링 트리를 활용해서 화면 상에 요소들을 그리게 되는데 아직 한단계가 더 남아있다.

이러한 스타일이 적용된 노드들을 실제 화면 상(브라우저 영역 = `viewport`)에 어떤 위치에 두어야하는지 결정하는 `레이아웃` 단계를 거쳐야한다.

`레이아웃` 단계는 `리플로우(reflow)` 단계라고도 불리우며 `viewport` 내에 요소들의 위치를 계산한다고 볼 수 있다.

---
### 전체적 렌더링 과정
자, 이제 렌더링하기위한 모든 준비가 끝났다.
`레이아웃` 단계까지 거친 이후에는 실제 화면에 노드들을 그리기만 하면 된다.

이러한 과정을 `페인트(paint)` 과정이라고 한다.

정리해보자.

#### 브라우저의 렌더링! 과정!
1. 서버로부터 받은 HTML, CSS파일을 다운로드한다.
2. 이를 기반으로 DOM트리, CSSOM트리를 생성한다.
3. DOM트리와 CSSOM트리를 결합하여 렌더링트리를 생성한다.
4. 렌더링 트리를 통해 레이아웃을 실행한다.
5. 화면에 페인트한다.



> 렌더링 최적화에 대해서는 다음 게시글에서 알아보자.
