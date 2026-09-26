import { Router } from "express";
import { authRouter } from "./auth.js";
import { healthRouter } from "./health.js";
import { usersRouter } from "./users.js";

export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json({
    message: "API is running",
    version: "1.0.0",
  });
});

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);