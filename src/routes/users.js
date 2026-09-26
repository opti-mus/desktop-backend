import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { findUserById, listUsers } from "../store/users.js";

export const usersRouter = Router();

usersRouter.use(requireAuth);

usersRouter.get("/", (_req, res) => {
  res.json({ data: listUsers() });
});

usersRouter.get("/:id", (req, res) => {
  const user = findUserById(Number(req.params.id));

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json({
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});