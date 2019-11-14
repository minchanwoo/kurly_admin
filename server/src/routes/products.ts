import { Router } from "express";
import { Product, User } from "../models";

const router = Router();

router.get("/", async (req, res) => {
  const { offset, limit } = req.query;
  const result = await Product.findAll({
    order: [["ID", "DESC"]],
    offset: Number(offset),
    limit: Number(limit)
  });
  const count = await Product.count();
  res.send({ result, count });
});

export default router;
