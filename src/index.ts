require("dotenv").config({ path: __dirname + "/.env" });
import MongoStore = require("connect-mongo");
import express = require("express");
import session = require("express-session");
import cors = require("cors");
import cookieParser = require("cookie-parser");
import { connectToDb } from "./utils/connect";
import router from "./routes";
const app = express();

connectToDb(process.env.MONGO_URL as string);

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  ttl: 1000 * 60 * 60 * 24 * 7,
  collectionName: "cookieSessions",
});

app.use(
  session({
    secret: "samsoong",
    resave: true,
    saveUninitialized: false,
    cookie: {
      // maxAge: 3600000, // 1 hour
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
  })
);
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3002",
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
  })
);

app.use(express.json());

app.use(router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const port: number = Number(process.env.PORT);

app.listen(port || 4000, () => {
  console.log("app is running");
});
