import { NextFunction, Response } from "express";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { nextTick } from "process";
import bcrypt from 'bcrypt';
import { Hash } from "crypto";
export const comparePasswords = (password:string, hash:string) =>{
  return bcrypt.compare(password,hash);

}
export const hashPassword = (password:string) => {
  return bcrypt.hash(password,5);

}

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || ""
  );
  return token;
};

export const protect = (req: any, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;


  if (!bearer) {
    res.status(401);
    res.json({ message: "Unauthorized access" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Invalid token" });
    return;
  }
  try { 
    const user = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = user;
    next();
  } catch (e) {
    console.error(e);

    res.status(401);
    res.json({ message: "not valid" });
    return;
  }
};
