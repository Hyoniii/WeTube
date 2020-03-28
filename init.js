//init으로 분리하는 이유. <init.js는 DB, Models, Express 등을 호출. app.js는 빠른 구성>

import app from "./app";

const PORT = 4000;

const handleListening = () =>
  console.log(`🤟🏾Listening On : http://localhost:${PORT}`);

app.listen(PORT, handleListening);
