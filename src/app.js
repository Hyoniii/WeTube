import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose"; //MongDB와의 연결은 mongoose
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddlewares } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session); //이 함수는 session object를 필요로 하기에 agument로 넣어줌.

app.use(helmet()); //보안을 위한 middleware
app.set("view engine", "pug"); //view engine을 undefined(default값)에서 pug로 지정해주는 코드.
//app.use("/uploads", express.static("uploads")); //uploads 디렉토리에 들어있는 파일을 로드할 수 있다.
//app.use("/static", express.static("static")); //uploads 디렉토리에 들어있는 파일을 로드할 수 있다.
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); //logging
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
app.use(passport.session()); // 해독한 쿠키가 passport로 넘어가고 deserializeUser함수 실행해서 사용자 식별, passport.js에서 그래서 deserialize함수로 해독.
//그 후엔 아래 미들웨어와 라우트 요청에 할당.

app.use(localsMiddlewares); //middleware는 웹사이트의 링크 혹은 라우터의 값을 뷰에 띄워주는 용도

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app; //이 파일을 import할 때 app object를 주겠다는 뜻. app object는 이미 설정한 코드들(#13-#21).
