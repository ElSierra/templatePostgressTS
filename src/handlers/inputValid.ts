import { body, oneOf, validationResult } from "express-validator";

export const updatePutValidator = [
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),

  body("version").optional(),
];
export const postValidator = [
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
];

export const putUpdatePoint = () => [
  body("name").optional().isString(),
  body("description").optional.toString(),
];
export const postUpdatePoint = () => {
  body("name").isString(),
    body("description").toString(),
    body("product").exists();
};
