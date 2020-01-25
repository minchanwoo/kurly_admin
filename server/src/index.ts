import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import routes from "./routes";
import jwt from "jsonwebtoken";
import { ApolloServer } from "apollo-server-express";

import { sequelize } from "./models";

import { resolvers } from "./graphql/resolvers";
import { schema } from "./graphql/schema";

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
    cookie: { secure: false },
    name: "KurlyAdmin"
  })
);

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    exposedHeaders: ["Content-Range"]
  })
);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  playground: true,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || "";
    const token = tokenWithBearer.split(" ")[1];

    if (!token) {
      return null;
    }
    const admin = jwt.verify(token, "SECRET");
    return { admin };
  }
});

server.applyMiddleware({ app, path: "/" });
app.use("/", routes);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번에서 대기중~!!");
});
