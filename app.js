import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); //보안을 위한 middleware
app.use(morgan("dev")); //logging

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app; //이 파일을 import할 때 app object를 주겠다는 뜻. app object는 이미 설정한 코드들(#13-#21).
