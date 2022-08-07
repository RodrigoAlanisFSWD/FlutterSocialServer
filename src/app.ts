import express, { Express } from "express";
import morgan from "morgan";
import passport from "passport";
import router from "./routers";
import session from 'cookie-session';
import cors from 'cors';
import path from 'path';

require('./passport/jwt')

const app: Express = express();

// middlewares
app.use(morgan("dev"));

// configuration
app.set("port", process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: "localhost"
}))
app.use(passport.initialize())
app.use(session({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ["secret_cookie"]
}))
app.use(passport.session())

// routers
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/api", router);

app.use("/avatar", express.static(path.join(__dirname, "../uploads/")))

export default app;
