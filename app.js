import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

import ErrorMiddleware from "./middlewares/Error.js";
import cors from "cors";
config({
  path: "./config/config.env",
});
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URl_DASHBOARD,
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
import course from "./routes/courseRoutes.js";
import blog from "./routes/blogRoutes.js";

app.use("/api/v1", course);

app.use("/api/v1", blog);

app.get("/", (req, res) => {
  res.send(
    `<h1>Server is Working Fine. Please Click <a href=${process.env.FRONTEND_URL}>here</a> to visit the Frontend </h1>`
  );
});

app.use(ErrorMiddleware);
export default app;
