import { Router } from "express";

import validateSchema from "../middlewares/schemaValidation.js";
import userSchema from "../schemas/userSchema.js";
import { signUp } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.post("/users", validateSchema(userSchema), signUp);

export default usersRouter;
