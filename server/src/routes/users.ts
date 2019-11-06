import { Router } from "express";
import { User } from "../models";

const router = Router();

router.get("/", async (req, res) => {
  const { offset, limit } = req.query;
  const users = await User.findAll({
    order: [["ID", "DESC"]],
    offset: Number(offset),
    limit: Number(limit)
  });
  const count = await User.count();
  res.send({ users, count });
});

export default router;
