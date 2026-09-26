const users = [];
let nextId = 1;

export function toPublicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export function listUsers() {
  return users.map(toPublicUser);
}

export function findUserById(id) {
  return users.find((user) => user.id === id) ?? null;
}

export function findUserByEmail(email) {
  return users.find((user) => user.email === email.toLowerCase()) ?? null;
}

export function createUser({ email, name, passwordHash }) {
  const user = {
    id: nextId++,
    email: email.toLowerCase().trim(),
    name: name.trim(),
    passwordHash,
  };

  users.push(user);
  return user;
}
