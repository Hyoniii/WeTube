import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import { localsMiddlewares } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

app.use(helmet()); //보안을 위한 middleware
app.set("view engine", "pug"); //view engine을 undefined(default값)에서 pug로 지정해주는 코드.
app.use("/uploads", express.static("uploads")); //uploads 디렉토리에 들어있는 파일을 로드할 수 있다.
app.use("/static", express.static("static")); //uploads 디렉토리에 들어있는 파일을 로드할 수 있다.

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); //logging
app.use(localsMiddlewares);
app.use(passport.initialize()); //cookieparser 후 routes 전에 위치,passport.initialize() returns the middleware that is going to check for the cookies and find the user and all that.
app.use(passport.session());

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; //이 파일을 import할 때 app object를 주겠다는 뜻. app object는 이미 설정한 코드들(#13-#21).
