import { Router } from "express";

import usersRouter from "./usersRouter.js";
import sessionsRouter from "./sessionsRouter.js";
import productsRouter from "./productsRouter.js";

const router = Router();

router.use(usersRouter);
router.use(sessionsRouter);
router.use(productsRouter);

export default router;
