import { Router } from "express";

export const usersRouter = Router();

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

usersRouter.get("/", (_req, res) => {
  res.json({ data: users });
});

usersRouter.get("/:id", (req, res) => {
  const user = users.find((item) => item.id === Number(req.params.id));

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json({ data: user });
});

usersRouter.post("/", (req, res) => {
  const { name } = req.body ?? {};

  if (!name || typeof name !== "string") {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const user = {
    id: users.length + 1,
    name: name.trim(),
  };

  users.push(user);
  res.status(201).json({ data: user });
});