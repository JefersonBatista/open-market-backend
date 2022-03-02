import { Router } from "express";

import validateSchema from "../middlewares/schemaValidation.js";
import signInSchema from "../schemas/signInSchema.js";
import { signIn } from "../controllers/sessionsController.js";

const sessionsRouter = Router();

sessionsRouter.post("/sessions", validateSchema(signInSchema), signIn);

export default sessionsRouter;
