import { createNewUser, signIn } from "./handlers/user";
import { protect } from "./modules/auth";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: any, res, next) => {
  req.shhhhh = "this is a scret";
  next();
});

app.get('/', (req,res, next)=>{
  res.json({message: 'hello'})
})
app.post("/register", createNewUser);
app.post("/login", signIn);

app.use("/api", protect, router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.type);
  if (err.type === "auth") {
    res.status(401).json({ message: "unathorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid input" });
  } else {
    res.status(500).json({ message: "that's on us" });
  }
});

export default app;
