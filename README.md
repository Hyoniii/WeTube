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

#### [regular expressions](https://regex101.com/)

정규 표현식은 주어진 패턴에 일치하는 문자열을 찾기 위해 하용하는 검색 패턴이다.
정규 표현식 은 formal language 이며, regular expression 혹은 rational expression 라 부르며, 약어로 regexp, regex 로 부른다.
formal language 은 특정한 법칙 들로 구성된 문자열 들의 집합 을 의미한다.
정규 표현식은 문자열에 나타는 특정 문자 조합과 대응시키기 위해 사용되는 패턴. 자바스크립트에서, 정규 표현식 또한 객체이다.

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

### [webpack](https://webpack.js.org/)

webpack은 module bundler이다.
옛날 자바스크립트는 모듈 개념이 없었기 때문에 파일이 나누어져 있어도 변수 스코프를 생각하면서 개발을 해야했다.
(중복되면 변수끼리 충돌을 일으키기 때문에)
이런 문제를 해결하기위해 최신 자바스크립트부터는 모듈 개념이 생겼는데 모던 자바스크립트를 지원을 안하는 브라우저들도 있기 때문에 브라우저들이 지원할 수 있는 코드로 변환해 줘야한다. 그 역할을 하는게 모듈 번들러 => 웹팩이다.
모듈 번들러는 여러개의 자바스크립트 파일을 하나의 파일로 묶어서 한 번의 요청을 통해 가지고 올 수 있게 해준다.
또 최신 자바스크립트 문법을 브라우저에서 사용할 수 있게 해준다.

[기본개념](https://velog.io/@hih0327/Webpack-%EA%B8%B0%EC%B4%88)

- Webpack
  웹팩(Webpack)은 자바스크립트 정적 모듈 번들러(Static Module Bundler)이다
  웹팩에서 모든 것은 모듈이다. 자바스크립트, 스타일시트, 이미지 등 모든 것을 자바스크립트 모듈로 로딩해서 사용한다.
  웹팩의 주요 네 가지 개념으로 Entry, Output, Loader, Plugin이 있다.
- 1. Entry
     의존성 그래프의 시작점을 웹팩에서는 엔트리(Entry)라고 한다.
     웹팩은 엔트리를 통해서 필요한 모듈을 로딩하고 하나의 파일로 묶는다.
     여러개의 엔트리가 존재할 수 있다.
- 2. Output
     엔트리에 설정한 자바스크립트 파일을 시작으로 하나로 묶는다. 그후 번들된 결과물을 처리할 위치를 output에 기록한다.
- 3. Loader
     웹팩은 오직 JavaScript와 Json만 이해할 수 있다.
     로더는 다른 Type의 파일(img, font, stylesheet 등)을 웹팩이 이해하고 처리 가능한 모듈로 변환 시키는 작업을 한다.
- 4. Plugin
     로더가 파일단위로 처리하는 반면 플러그인은 번들된 결과물을 처리한다.
     로더가 변환하는 동안 플러그인은 bundle optimization, asset management and injection of environment과 같은 일을 진행할 수 있다.

##### 1. package.json 파일 생성

```
npm init -y
```

##### 2. webpack 및 사용할 라이브러리 설치

```
//블로그 예시로 블로거가 사용하는 라이브러리가 포함 되어있다.
npm install -save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader clean-webpack-plugin css-loader html-loader html-webpack-plugin mini-css-extract-plugin node-sass react react-dom sass-loader style-loader webpack webpack-cli webpack-dev-server
```

##### 3. ./src/test.js 생성

```
// ./src/test.js

console.log("webpack test");
```

##### 4. ./webpack.config.js 생성

```
// ./webpack.config.js

const path = require("path");

module.exports = {
  entry: "./src/test.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build")
  },
  mode: "none"
};
```

##### 5. ./package.json에 내용 수정

```
"scripts": {
    "build": "webpack"
  },
```

##### 6. Build 하기

```
npm run-script build
```

정상적으로 실행이 되었다면 build 폴더와 bundle.js 파일이 생성된다.

##### 7. Webpack으로 HTML 빌드하기

웹팩은 js 파일뿐만 아니라 다른 파일도 모듈로 관리 할 수 있다.
그것을 해주는게 loader

```
//로더 사용법
module : {
rules: {
   test: '가지고올 파일 정규식',
   use: [
       {
           loader: '사용할 로더 이름',
           options: { 사용할 로더 옵션 }
       }
   ]
}
}
```

- 1 ) ./public/index.html 생성

```
<!-- ./public/index.html -->
<!DOCTYPE html>
<html lang="kr">
  <head>
    <meta charset="utf-8" />
    <title>WEBPACK4-REACT</title>
  </head>
  <body>
    <noscript>스크립트가 작동되지 않습니다!</noscript>
    <div id="root"></div>
  </body>
</html>
```

- 2 ) ./webpack.config.js 수정

```
// ./webpack.config.js

const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/test.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build")  //현재 파일 경로와 "내가 원하는 최종 하위경로" 예는 build폴더
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
            template: './public/index.html', // public/index.html 파일을 읽는다.
      filename: 'index.html' // output으로 출력할 파일은 index.html 이다.
    })
  ]
};
```

HtmlWebPackPlugin 은 웹팩이 html 파일을 읽어서 html 파일을 빌드할 수 있게 해준다.

loader 는 html 파일을 읽었을 때 html-loader를 실행하여 웹팩이 이해할 수 있게 하고 options 로는 minimize라는 코드 최적화 옵션을 사용하고 있다.

- 3 ) Build 하기

```
npm run-script build
```

정상적으로 실행이 되었다면 ./build/index.html 파일이 생성된다

#### path.join vs path.resolve

[차이점](https://programming119.tistory.com/106)

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
  mongoose.connect() 메서드를 사용하면 mongoDB 서버와 연결된다
  mongoDB는 JSON 형식으로 데이터를 저장하지만, mongoose를 사용하여 모델의 형태를 정할 수 있다
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
- 몽고디비에게 파일이 어떤 식으로 생겨야할지 알려줘야한다.
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

mongoose와 passport의 연결.
그 흐름. mongoStore와 session.

### passport

쿠키는 브라우저에 저장할 수 있는 것들이다.
쿠키에는 요청(request)에 대해서 백엔드로 전송될 정보들이 담겨있다.오토매틱.
예를들어 클라이언트(웹브라우저)에 쿠키가 있을때 서버에 뭔가 요청할 때마다(로그인,가입,홈으로 가기등등 이것들이 요청이다) 브라우저가 자동적으로 그 쿠키들을 서버로 전송해준다.
이 과정에서 passport는 쿠키를 생성하고 브라우저에 저장시켜주고 유저에게 해당 쿠키를 주는 역할을 한다.

passport 는 인증(authentication) 절차를 로직을 편하게 작업할 수 있게 도와주는 Node.js 미들웨어이다.

npm i passport-local-mongoose
use model의 기본적인 사용자 인증을 도와줌(만들어줌).
mongoose,mongoDB와 함께 쓰기 좋은 모듈

- 유저모델 생성 -> passport 선언 -> passport-local 기본설정 -> 사용

유저 모델 생성할때 passportLocalMongoose plugin을 사용한다.
{ usernameField : 'email'} 은 옵션 중 하나로 username으로 email을 보여주겠다는 뜻이다.

```
UserSchema.plugin(passLocalMongoose,{})
```

문서 [참고](https://github.com/saintedlama/passport-local-mongoose)

위의 작업을 했다고 인증까지 되었다는건 아니다.
사용자 인증을 위한 작업을 해야한다.
passport.js 파일 생성 후

```
npm i passport passport-local //설치
```

passport는 passport
passport-local은 username과 passport를 쓰는 사용자 인증 방식(strategy)

passport.js 파일에
model(User)와 passport를 import하고
passport.use(User.createStretagy())👉🏽createStrategy()는 이미 구성이 된 passport-local의 localstrategy를 생성한다.
stretagy => 로그인 하는 방식
ex.username과 password 이용, github, facebook...등이 있다.
위의 예시 코드에서는 username과 password 이용하는 방식을 만들었다.(passport-local)

[참고](https://www.npmjs.com/package/passport-local-mongoose)
Simplified Passport/Passport-Local Configuration
Starting with version 0.2.1 passport-local-mongoose adds a helper method createStrategy as static method to your schema. The createStrategy is responsible to setup passport-local LocalStrategy with the correct options.

- serialization
  👉🏽어떤 정보를 쿠키에게 주느냐. 지금 클라이언트(웹브라우저)에 있는 사용자에 개해서 어떤 정보를 가질수 있느냐.
  어떤 field가 쿠키에 포함될 것인지 알려주는 역할. req.session 객체에 무엇을 저장할 것인지를 선택합니다. 세션에 모든 정보를 저장하는 것은 세션의 용량을 너무 크게 만드므로 대개 user의 id만을 저장합니다. deserialize는 serialize를 통해 받은 유저의 id를 이용해 이용자를 식별하는 것이다. 조회한 정보는 req.user 객체에 저장됩니다. 로그인 후에 다시 웹페이지에 접속했을 때 해당 이용자가 어떤 이용자인지 식별해내는 역할을 한다.
- desetialize
  👉🏽그 쿠키의 정보를 어떻게 사용자로 전환하는가.

```
const User = require('./models/user');

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());  //어떤 필드가 쿠키에 포함될 것인지 알려주는 역할
passport.deserializeUser(User.deserializeUser());  //어느 사용자인지 어떻게 찾는가. 쿠키 안의 정보를 어떻게 변환하는가.
```

The reason for this functionality is that when using the usernameField option to specify an alternative usernameField name, for example "email" passport-local would still expect your frontend login form to contain an input field with name "username" instead of email. This can be configured for passport-local but this is double the work. So we got this shortcut implemented.

- Model.register (user, password, cb) 지정된 암호로 새 사용자 인스턴스를 등록하는 편리한 방법입니다.
  model.create 와 model.regidter의 차이점👉🏽We use register when we want to encrypt the password and we use create when we don't really care about password, for example when the user logs in with Github.

#### passport의 middleware

```
passport.initialize()
passport.session()
```

In a Connect or Express-based application, passport.initialize() middleware is required to initialize Passport. If your application uses persistent login sessions, passport.session() middleware must also be used.
(Connect 또는 Express 기반 응용 프로그램에서 Passport를 초기화하려면 passport.initialize () 미들웨어가 필요합니다. 응용 프로그램에서 영구 로그인 세션을 사용하는 경우 passport.session () 미들웨어도 사용해야합니다.)

initialize => passport. initialize() is a middle-ware that initialises Passport. Middlewares are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.(passport. initialize()는 Passport를 초기화하는 미들웨어입니다. 미들웨어는 요청 오브젝트 (req), 응답 오브젝트 (res) 및 애플리케이션의 요청-응답주기에서 다음 미들웨어 기능에 액세스 할 수있는 기능입니다.)

session은 사용하려면 [express-session](https://www.npmjs.com/package/express-session)을 설치해야한다.
[참고](https://velopert.com/406)
[참고1](https://darrengwon.tistory.com/186)

#### session

1. 세션이란?
   쿠키는 웹 브라우저에 저장되는 '키-밸류' 타입의 데이터라고 언급했습니다. 따라서 누구나 키에 따른 밸류를 확인할 수 있으므로 비밀정보를 쿠키로 보낸다면 비밀 정보를 아주 쉽게 탈취당할 수 있습니다.
   세션은 이러한 문제점을 고려해서, 쿠키를 업그레이드 한 것이라 보면 됩니다. 쿠키와 달리 서버에 데이터를 저장하고 웹 브라우저는 Session ID만을 가지고 있기 때문에 비교적 안전합니다.

세션의 동작을 요약하면 다음과 같습니다.

1. 서버는 웹 브라우저에게 세션 값을 보내줍니다. (sid 라고 하며, 아무런 의미도 없는 단순 식별자입니다.)

2. 클라이언트는 접속할 때 자신이 가지고 있는 sid를 서버에게 전달합니다.

3. 서버는 클라이언트가 보내준 sid를 가지고, 해당 유저를 식별합니다.

session에서 secret 옵션은 .env에 변수로 넣어주는게 좋다. 보안을 위한 옵션이니까.

- [session을 사용하는 이유](https://www.it-swarm.dev/ko/node.js/passportsession-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%84%ED%95%A9%EB%8B%88%EA%B9%8C/1045245130/)

app.js 파일에서

```
app.use(
  session({
    //session은 쿠키를 해독함
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }), //이 쿠키저장소에 저장하겠다.이 코드가 몽구스가 저장소를 몽고디비와 연결해준다.
  })
);
app.use(passport.initialize()); //cookieparser 후 routes 전에 위치,passport.initialize() returns the middleware that is going to check for the cookies and find the user and all that.
app.use(passport.session()); // 해독한 쿠키가 passport로 넘어가고 deserializeUser함수 실행해서 사용자 식별
//그 후엔 아래 미들웨어와 라우트 요청에 할당.
```

코드 입력을 해야한다.
맨 윗줄은 express-session을 사용하는 코드
[connect-mongo](https://www.npmjs.com/package/connect-mongo)를 써서 session에게 데이터를 mongostore에 저장하게
mongoDB의 세션스토어에 express와 mongoose connection으로 연결되어 있을 때, 서버를 재시작하면 연결이 끊어진다. 이럴 때 connect-mongo를 사용하면 연결을 유지할 수 있다. https://velog.io/@ground4ekd/nodejs-mongodb
새로운 저장소에 세션을 저장.[참고](https://darrengwon.tistory.com/189)

마지막 passport.session()은 req 객체를 변경하고 현재 클라이언트 아이디에서 세션 아이디 인 'user'값을 deserialized 된 실제 사용자 객체로 변경하는 미들웨어 역할을합니다.

즉, express-session으로 쿠키가 express에 보내지고
session을 이용함으로서 쿠키를 이용할 수 있다.
그리고 passport를 통해서 세션을 이용하는데(즉, 세션이 가진 쿠키를 이용)그 패스포트로 deserialize를 진행하는 것.

connect-mongo를 설치하고 용하면
세션에게 데이터를 저장소에 저장하라고 알려줄 수 있다.
app.js폴더에

1. import MongoStore from "connect-mongo", 몽구스 임포트
2. const cookieStore = MongoStore(session); 변수저장
3. app.use(session{}) 안에 store : new CookieStore({mongooseConnection:mongoose.connection}) 키:밸류 저장

[참고](https://darrengwon.tistory.com/189)
