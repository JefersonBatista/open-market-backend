import { Router } from "express";

import usersRouter from "./usersRouter.js";
import sessionsRouter from "./sessionsRouter.js";

const router = Router();

router.use(usersRouter);
router.use(sessionsRouter);

export default router;
