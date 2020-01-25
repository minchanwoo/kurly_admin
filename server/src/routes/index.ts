import { Router } from "express";
import adminRouter from "./admin";

const router = Router();

router.use("/admins", adminRouter);

router.use((req, res, next) => {
  if (req.session && req.session.user && req.session.user.id) {
    next();
  } else {
    res.status(500).send("not logged in");
  }
});

export default router;
