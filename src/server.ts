import express from "express";
import bodyParser from "body-parser";
import ip from "ip";

const app = express();

app.use(bodyParser.json());
app.set("trust proxy", true);
app.get("/", (req, res) => {
  res.status(200);
  res.json({ msg: "Hello" });
});

export default app;

