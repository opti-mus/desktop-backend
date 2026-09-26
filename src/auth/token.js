import jwt from "jsonwebtoken";

const TOKEN_TTL = "7d";

function getSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  return secret;
}

export function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, getSecret(), {
    expiresIn: TOKEN_TTL,
  });
}

export function verifyToken(token) {
  return jwt.verify(token, getSecret());
}
