import { getUP, updateUP, createUP, deleteUP } from "./handlers/updatePoint";
import {
  updateUpdate,
  getUpdate,
  createUpdate,
  getOneUpdate,
} from "./handlers/update";
import {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./handlers/product";
import { handleErrors } from "./modules/middlewares";
import {
  postUpdatePoint,
  postValidator,
  putUpdatePoint,
  updatePutValidator,
} from "./handlers/inputValid";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

const router = Router();
console.log(updatePutValidator);
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleErrors,
  updateProduct
);
router.post("/product", body("name").isString(), handleErrors, createProduct);
router.delete("/product/:id", deleteProduct);

router.get("/update", getUpdate);
router.get("/update/:id", getOneUpdate);
router.put("/update/:id", updatePutValidator, handleErrors, updateUpdate);
router.post("/update", postValidator, handleErrors, createUpdate);
router.delete("/update/:id", deleteProduct);

router.get("/updatepoint", getUP);
router.get("/updatepoint/:id", getOneUpdate);
router.put("/updatepoint/:id", putUpdatePoint, handleErrors, updateUP);
router.post("/updatepoint", postUpdatePoint, handleErrors, createUP);
router.delete("/updatepoint/:id", deleteUP);
export default router;
