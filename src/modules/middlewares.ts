import { NextFunction, Response } from "express";
import { Request } from "express";
import { validationResult } from "express-validator";

export const handleErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json( errors);
  } else {
    next();
  }
};
