//init으로 분리하는 이유. <init.js는 DB, Models, Express 등을 호출. app.js는 express만>
//The init.js calls the DB, Models, Express and all that.
//app.js is only express configuration.
import "@babel/polyfill";
import cool from "cool-ascii-faces";
import dotenv from "dotenv";
import "./db"; //Importing just "./db" will execute the whole file!
import app from "./app";

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`🤟🏾Listening On : http://localhost:${PORT}`);

app.get("/cool", (req, res) => res.send(cool()));
app.listen(PORT, handleListening);
