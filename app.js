import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddlewares } from "./middlewares";

const app = express();

app.use(helmet()); //보안을 위한 middleware
app.set("view engine", "pug"); //view engine을 undefined(default값)에서 pug로 지정해주는 코드.
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); //logging

app.use(localsMiddlewares);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; //이 파일을 import할 때 app object를 주겠다는 뜻. app object는 이미 설정한 코드들(#13-#21).
