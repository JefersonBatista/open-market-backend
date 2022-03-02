import { Router } from "express";

import { createProduct } from "../controllers/productsController.js";
import validateSchema from "../middlewares/schemaValidation.js";
import productSchema from "../schemas/productSchema.js";
import validateAuth from "../middlewares/authValidation.js";

const productsRouter = Router();

productsRouter.post(
  "/products",
  validateSchema(productSchema),
  validateAuth,
  createProduct
);

export default productsRouter;
