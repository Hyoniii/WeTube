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

#### [multer](https://www.npmjs.com/package/multer)
파일의 URL을 반환하는 middleware
```
npm install multer
```
설치 후 관련 form에 entype=multipart/form-data 추가
미들웨어 파일에 임포트하고 관련 코드 작성


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

#### [express.static](http://expressjs.com/ko/starter/static-files.html)
정적인 파일들을 제공한다. 
이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static을 사용하십시오.
주로 front-end에서 쓰이는 js나 css file에 쓰인다.(public)

  - 정적파일
    프로그래밍적으로 만들어진 파일이 동적 파일이고
    사람이 작성한 것이 언제나 똑같이 보이는 것이 정적 파일이다.



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
res.render("템플릿파일","템플릿에 추가할 정보 담긴 객체")
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

* 템플릿에 컨트롤러 정보 추가 // [locals](http://expressjs.com/ko/api.html#app.locals)

미들웨어

- locals를 이용해 전역범위 변수 추가(뷰)
  - 템플릿 전체에 추가하기
  - ex) 헤더라 라우트 객체에 접근
    - locals 미들웨어 만들어 사용 : local 변수를 global 변수로 사용하게 함
      - res.locals.변수명 = 정보
      - pug 파일에서 #{변수명}으로 사용 가능
      - app.locals will be accessible to the application, and res.locals will go directly to the template.

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

- mixin: 웹사이트에서 자주 반복되는 html 코드를 재활용하는 방법

* pug 함수의 일종
  - 인자 1개 필요
    mixin은 pug의 함수의 일종

Mixin is to recycle the same HTML structure and keep it organized on a different file.
A partial is just a part of html that you use over and over again.
A mixin is the same but the data inside of it has to vary.
Q.partials과 mixins의 차이는 무엇인가요? 둘 다 재활용된다는 공통점이 있는 것 같은데..
지금까지 했던 걸 보면 partials은 모든 views에 적용되고 mixins은 부분부분 적용된 거라 생각했는데
맞나요?

A.partials are just the same pieces of HTML blocks.
mixins are HTML blocks with different dynamic content.

get을 쓰는 것들은 url창에 보이고, render를 하기 위한 용도이고,
post를 쓰는 것들은 url창에 안 보이는 다른 작업들 (예를 들면 verify password나 req.body 등)을 하기 위한 것으로 이해했습니다.

Q.
logout 에 대해 궁금한게있어요!
userController.js에서 홈(routes.home)으로 이동시켜주는 기능을 만드는것까지 이해했습니다.

근데 이 const logout(userController에서의)이 header에서 실행되는걸로 알고있는데 header에는 routes.logout으로 즉 "/logout" 로만 실행되는데 이게 어떻게 const logout과 연결되는지 헷갈려서 질문드려요!
정리하자면, userController에서의 const logout이 어떤 원리로 실행되는지 궁금합니다!
A.
header.pug > " a(href=routes.logout) Log Out " a태그를 클릭하게 되면
routes.js 에서 logout에 해당하는 링크로 가라고 안내해줄 것이고
app.js에서 /(home)로 시작하는 주소는 globalRouter를 사용하라고 설정했으니
globalRouter.js > " globalRouter.get(routes.logout, logout); " 구문으로 갈것이고
logout페이지에 대한 요청이 있으면 logout Function을 사용하는 것입니다.
이제 logout Function에는 routes.home로 redirect하라고 했으니 localhost:4000/으로 가는거죠

### mongoDB

NoSQL database

- "mongoDB Community Servere" Download
- 터미널에 mongod 실행
- 터미널에 mongo 실행
- mongo와 js를 연결하는 두가지 방법
  - mongoDB
  - Node.js
- mongoDB와 js를 연결할 땐 adapter가 필요. mongoose가 그 역할. 몽구스는 Node.js를 위한 Object Modeling
- ```bash
  npm install mongoose //몽구스 설치하면 몽고디비는 따라옴
  npm install dotenv
  ```
- 설치 후
  import mongoose from "mongoose"로 임폴트 해주고
  [mongoose.connect()](https://mongoosejs.com/docs/connections.html)
- dotenv는 데이터의 보안을 위한 모듈이다.
  - .env파일을 만들어준다(파일명은 secret도 상관무)
  - 그 파일 안에 변수를 만들어준다.(URL,PORT...)
  - db.js 파일에
    - ````bash
      - import dotenv from "dotenv"
      - dotenv.config
       - ```
      ````
    - dotenv.config함수로 .env파일 안의 정보 가지고 올 수 있다. 찾은 모든 변수들을 process.env.key에 저장.
- 몽고디비 ,제이슨파일
- 몽고디비에게 파일이 어껀 식으로 생겨야할지 알려줘야한다.
- 그게 모델의 형태.
- 모델은 실제 데이터. 스키마는 형태
- [schema](https://www.zerocho.com/category/MongoDB/post/59a1870210b942001853e250)
  - 이러한 문제를 막기 위해 몽구스는 Schema(스키마)를 도입했습니다. 몽구스는 사용자가 작성한 스키마를 기준으로 데이터를 DB에 넣기 전에 먼저 검사합니다. 스키마에 어긋나는 데이터가 있으면 에러를 발생시킵니다.
  - [schema의 required](https://stackoverflow.com/questions/39871236/what-is-the-meaning-required-in-mongoose-schema)
- [schema](https://mongoosejs.com/docs/guide.html) option 보기
- 스키마 생성 할 떄 옵션이 있다면 object(객체), 아니면 one line
- 스키마 정의 후 모델로 변환해야한다.
  - mongoose.model(modelName, schema):
    ```
    //ex
    const Blog = mongoose.model('Blog', blogSchema);
    ```
- 모델 변환 후 init.js 파일에 모델 임포트
- 모델과 모델을 연결하는 법 (https://mongoosejs.com/docs/api.html#types-objectid-js)
  ```bash
  //ex
  video : { //객체생성
    type:mongoose.Schema.Types.ObjectId,
    ref:"Video" //연결할 모델명
  }
  ```
  이 과정에서 객체에 들어갈게 배열이라면 [] 추가

- 그 후 database 생성 [과정](https://velopert.com/457)
  