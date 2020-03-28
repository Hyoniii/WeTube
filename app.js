import express from "express";
const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => {
  console.log(req);
  return res.send("hello from ass");
};

const handleProfile = (req, res) => res.send("You are on my profile");

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
