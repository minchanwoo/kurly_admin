import { Router } from "express";
import adminRouter from "./admin";
import userRouter from "./users";
import productRouter from "./products";

const router = Router();

router.use("/admins", adminRouter);

router.use((req, res, next) => {
  if (req.session && req.session.user && req.session.user.id) {
    next();
  } else {
    res.status(500).send("not logged in");
  }
});

router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;
