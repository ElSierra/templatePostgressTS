import { hashPassword, createJWT, comparePasswords } from "./../modules/auth";
import e, { Response } from "express";
import { Request, NextFunction } from "express";
import prisma from "../db";

export const createNewUser = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.userName,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error: any) {
    error.type = "input";
    next(error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.userName,
    },
  });

  if (user) {
    const isValid = await comparePasswords(req.body.password, user.password);

    if (isValid) {
      console.log("yes");
      const token = createJWT(user);
      res.json({ token });
    } else {
      res.status(401);
      res.json({ message: "Incorrect Password" });
    }
  } else {
    res.status(501);
    res.json({ message: "Incorrect Password or account doesnot exeist" });
  }
};
