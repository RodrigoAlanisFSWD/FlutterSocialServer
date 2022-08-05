import express, { Express } from "express";
import morgan from "morgan";
import router from "./routers";

const app: Express = express();

// middlewares
app.use(morgan("dev"));

// configuration
app.set("port", process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/api", router);

export default app;
