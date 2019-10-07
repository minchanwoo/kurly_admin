import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import session from "express-session";

import { sequelize } from "./models";

const app = express();
sequelize.sync();

app.set("port", process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    exposedHeaders: ["Content-Range"]
  })
);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번에서 대기중~!!");
});
