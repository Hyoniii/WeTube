# WeTube

Cloning Youtube with Vanilla and NodeJS

## Pages:

- [x] Home
- [x] Join
- [x] Login
- [x] Search
- [x] User Detail
- [x] Edit Profile
- [x] Upload
- [x] Video Detail
- [x] Change Password
- [x] Edit Video

## have to lean

req.user.save() is saving the user that requested the page.
user.save() is saving any user.

## node.js

자바스크립트는 브라우저에 내장 되어있다.
노드는 그런 자바스크립트를 브라우저 바깥으로 가지고 나오는 런타임
자바스크립트를 이용해서 브라우저와는 별도로 작동하는것을 만들수 있다.
백엔드
예들들어 터미널. 터미널에서 콘솔로그를 쓸 수 있게 해주는것도 노드.
그동안 자바스크립트는 브라우저라는 한계가 있었고 브라우저에 맞춰 설계된 언어였다.

노드를 사용하기 좋은 케이스는 데이터베이스 생성, 삭제,
사용자에게 전송하고 이쪽저쪽 저장할때
노드는 데이터를 다루는 성능이 아주 좋다.
다수의 유저들이 메세지를 주고 받는 알림과 실시간 처리에 알맞다.
벗, 데이터 사이언스나 이미지 압푹, 크롭, 필터 적용, 그것을 저장해야하는 경우에는 노드가 알맞지 않다.
바이트 단위의 어려운 작업이나 비디오 인코딩,디코딩에도 ✖︎
실시간 처리를 해야하는 경우에 잘맞다. 비동기 시스템

### express

[express](https://wikibook.co.kr/article/what-is-expressjs/)
[프레임워크](https://blog.gaerae.com/2016/11/what-is-library-and-framework-and-architecture-and-platform.html)
Express는 JavaScript로 작성되고 Node.js 런타임 환경에서 구동되는 인기 있는 웹 프레임워크입니다.
노드로 서버를 만들때 노드에서 작동하는 프레임워크는 익스프레스
html을 전송하고 데이터를 저장하고 폼에서 데이터를 받아오고 등등의 반복이다.
Npm(node package manager)을 이용해서 express설치

### NPM

노드를 설치하면 자동으로 따라옴
npm으로 프로젝트를 시작하려면 init을 해줘야한다.
npm을 실행할때는 프로젝트 폴더 , 꼭 package.json이 있는 폴더에서 설치해야함
설치후 생기는 node-module은 협업할때 같이 안올려줘도 됨
npm install 을 실행하면 자동으로 dependencies를 찾아서 다운로드 함

#### -babel

js 코드를 업데이트 하는데 쓰임
최신의 js코드를 예전 스타일로 바꿔주는거 es6 -> es5로

```bash
npm install @babel/preset-env //설치후
```

.babelrc 파일 생성
바벨을 설정해주는 파일이다. 바벨이 실행되기 전에 이 파일을 찾아보고
설정해둔 파일을 읽고 그 설정에 맞춰 코드 변환

#### -nodemon

변경사항을 저장할때마다 자동으로 서버를 새로 실행

### middleware

Everything in express is a middleware until one returns something.
Either res.render or res.send

```bash
app.get("/",middle,final) //이건

app.use(middle)
app.get("/",final) //로 변환 가능하다. 이 경우에는 globally
```

여기서 중요한건 순서다. 미들웨어가 적용되긴 바라는 순서에 잘 배치 해야한다.
(지금 미들웨어 함수 호출을 보면 라우트가 없다.)
미들웨어에서 res.send(return과 비슷한 역할)를 하면 연결이 끊긴다.
next로 넘어가지 ✖︎

#### -morgan

[morgan](https://www.npmjs.com/package/morgan)은 logging(무슨 일이 어디서 일어났는지를 기록하는)을 도와주는 미들웨어

```bash
npm i morgan //터미널 설치
```

#### -helmet

[helmet](https://www.npmjs.com/package/helmet)
node.js 앱의 보안에 도움을 준다.

#### body-parser

[body-parser](https://www.npmjs.com/package/body-parser)요청의 본문을 해석해주는 미들웨어. 이 모듈 없이는 post, put 요청 메소드의 request.body를 읽어올 수 없다.
보통 폼 데이터나 AJAX 요청의 데이터를 처리한다.
request 정보에서 form이나 json 형태로 된 body 검사.

- [parser에 대한 설명 글](https://velog.io/@yejinh/express-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-bodyParser-%EB%AA%A8%EB%93%88)

#### cookie-parser

[cookie-parser](https://www.npmjs.com/package/cookie-parser)요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어. express의 request(req) 객체에 cookies 속성이 부여된다.
사용자 인증 같은 곳에서 쿠키를 검사할 때 사용.

<import A from "./A.js" 와 import {B} from "./A.js"의 차이>

- import A from "./A.js" means that inside A.js has a "export default A" inside
  import {B} from "A.js" means that inside of A.js has a "export B"
  One is for default export and other one not.

### Route

[basic-route](https://expressjs.com/ko/starter/basic-routing.html)라우팅은 URI(또는 경로) 및 특정한 HTTP 요청 메소드(GET, POST 등)인 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것을 말한다.

```bash
app.METHOD(PATH, HANDLER)
```

- app은 express의 인스턴스입니다.
- METHOD는 HTTP 요청 메소드입니다.
- PATH는 서버에서의 경로입니다.
- HANDLER는 라우트가 일치할 때 실행되는 함수입니다.

가장 기본적인 routing의 예제

```
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
```

[Routing](https://expressjs.com/ko/guide/routing.html)

#### express.Router

express.Router 클래스를 사용하면 모듈식 마운팅 가능한 핸들러를 작성할 수 있다. Router 인스턴스는 완전한 미들웨어이자 라우팅 시스템이며, 따라서 “미니 앱(mini-app)”이라고 불리는 경우가 많다.

라우팅을 이용해 controller,app,view을 구분해주는게 좋다.
더 깔끔한 코드.

### -M(odel) V(iew) C(ontroller)

일종의 pattern.
url은 router
데이터의 모습에 맞게 url(router)와 함수(controller)를 분리.
pug는 express의 view engine. templeted언어

### PUG

pug는 view engine
HTML와 CSS는 프로그래밍 언어가 아니고, 논리적인 작업이 불가능.
그 단점을 보안해준다.
pug는 코드를 간소화, 컴파일한 후에 html문서를 렌더링하는 형식이라 생산성이 높인다.

```
npm install pug
```

[app.set()](http://expressjs.com/ko/api.html#app.set)

app.set("view engine",pug)으로 뷰엔진 확장.
"/view" 폴더 생성하고 그 안에 퍼그 파일들 모두 저장.
이 템플릿을 웹사이트에 보여주려면 controller에서
res.render("템플릿파일")
\*\* Pug : HTML CSS를 논리적으로 작업 가능 & <>대신 들여쓰기 사용

- views 폴더에 layouts 폴더 생성
  - layout 파일 생성
    - main.pug : 공통으로 적용될 html, head, header, footer, css link 등의 코드
      - block : 다른 레이아웃이 들어갈 자리
        - 레이아웃 사용 방법 : block에 들어갈 레이아웃 파일 제일 위에 extension(기본 템플릿을 확장하겠다)
          - extends layouts/main.pug
          - block content에 들여쓰기 해서 내용 작성
          - - partials : 페이지의 일부분
- views 폴더에 partials 폴더 생성
  - footer.pug, header.pug 생성
    - fontawesome 설치 : main.pug head에 코드 복사(git commit 참고)
  - footer.pug 작성 후 main.pug의 footer 자리에 include ../partials/footer

* pug에 자바스크립트 코드 작성하기 : #{ } 안에 쓰기

block / include 차이
(단순히 어떤 파일 또는 코드 덩어리를 미리 만들어놓고 불러온다는 기능만 봤을 때는 block(extends)과 includes는 같습니다.
하지만 차이가 있습니다.

1. block은 ".pug 파일만" 불러올 수 있고 includes는 모든 파일(txt, css, js, ...)을 불러 올 수 있습니다.
   block은 extends로 상속받기 위해서 기본적인 뼈대(layout), 공통적인 부분(블록)을 만드는 것이 목적입니다.
   그래서 당연하게 같은 pug파일을 불러오며(확장) 1번만 불러서 확장하는게 보통입니다.
   includes는 때에 따라서 같은 코드?가 적용되어야 할 때 여러 번 불러오는게 가능합니다.
2. block은 확장 가능하지만 includes는 확장할 수 없습니다.
   includes는 모든 파일을 문자 그대로(=정적 파일) 불러오기 때문에 수정, 재정의(오버라이딩)가 불가능합니다.
   그러나 block은 다른 파일에서 extends로 불러온 후에 재정의하거나 새로 추가할 수 있습니다. (= 동적)

출처: https://jeong-pro.tistory.com/65 [기본기를 쌓는 정아마추어 코딩블로그])
