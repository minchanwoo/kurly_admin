import { Router } from "express";
import adminRouter from "./admin";

const router = Router();

router.use("/admins", adminRouter);

export default router;
