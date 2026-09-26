import { verifyToken } from "../auth/token.js";
import { findUserById } from "../store/users.js";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ error: "Authorization required" });
    return;
  }

  try {
    const payload = verifyToken(token);
    const user = findUserById(Number(payload.sub));

    if (!user) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
