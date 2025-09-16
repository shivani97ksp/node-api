import fs from "fs";
const DATA_FILE = "./MOCK_DATA.json";

// Helper to read users
function readUsers() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

// Helper to write users
function writeUsers(users, res, callback) {
  fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), (err) => {
    if (err) return res.status(500).json({ error: "Failed to save data" });
    callback();
  });
}

export function getAllUsers(req, res) {
  const users = readUsers();
  res.json(users);
}

export function getUserById(req, res) {
  const users = readUsers();
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

export function createUser(req, res) {
  const users = readUsers();
  const user = req.body;
  user.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(user);
  writeUsers(users, res, () => res.status(201).json(user));
}

export function updateUser(req, res) {
  const users = readUsers();
  const idx = users.findIndex(u => u.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  users[idx] = { ...users[idx], ...req.body, id: users[idx].id };
  writeUsers(users, res, () => res.json(users[idx]));
}

export function deleteUser(req, res) {
  let users = readUsers();
  const idx = users.findIndex(u => u.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  const deleted = users[idx];
  users.splice(idx, 1);
  writeUsers(users, res, () => res.json(deleted));
}