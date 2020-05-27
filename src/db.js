import mongoose from "mongoose";
import dotenv from "dotenv"; //내장 모듈을 import함으로 따로 파일에서 임포트 안해도 된다.
dotenv.config(); //.env안의 정보를 가져올 수 있는 함수

mongoose.connect(
  //배포의 경우는 URL 아닌 경우는 URL_
  process.env.PRODUCTION ? process.env.MONGO_URL : process.env.MONGO_URL_,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log("⭕️Connected to DB");
const handleError = (error) => console.log(`❌Error on DB Connection ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
