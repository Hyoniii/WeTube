//init으로 분리하는 이유. <init.js는 DB, Models, Express 등을 호출. app.js는 빠른 구성(express만)>
import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`🤟🏾Listening On : http://localhost:${PORT}`);

app.listen(PORT, handleListening);
