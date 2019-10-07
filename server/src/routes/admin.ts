import { Router } from "express";
import { Admin } from "../models";
import bcrypt from "bcrypt";

const router = Router();

router.post("/sign_up", async (req, res) => {
  const { nick, password } = req.body;

  const hash = await bcrypt.hash(password, 12);
  const result = await Admin.create({
    nick,
    password: hash
  });
  res.send({ result });
});

router.post("/login", async (req, res) => {
  const { nick, password } = req.body;

  try {
    const result = await Admin.findOne({ where: { nick } });
    if (!result) {
      throw new Error("존재하지 않는 아이디입니다.");
    }
    const compare = await bcrypt.compare(password, result.password);
    if (!compare) {
      throw new Error("비밀번호가 다릅니다.");
    }
    res.send("ok");
    req.session.user = {
      id: result.id,
      nick: result.nick
    };
    req.session.save(() => {});
  } catch (e) {
    res.status(500).send({ errorMessage: e.message });
  }
});

router.post("/check_loggedin", async (req, res) => {
  const { user } = req.session;
  if (user && user.nick) {
    res.send({ nick: user.nick });
  } else {
    res.send({ nick: "" });
  }
});

export default router;
