import express from "express";
import fs from "fs";
const router = express.Router();

// Load users from file
let users = JSON.parse(fs.readFileSync("./MOCK_DATA.json", "utf-8"));

// Middleware: basic validation
function validateUser(req, res, next) {
  const { first_name, last_name, email, gender, job_title } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  next();
}

// CREATE
router.post("/", validateUser, (req, res, next) => {
  try {
    const user = req.body;
    user.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(user);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), err => {
      if (err) return next(err);
      res.status(201).json(user);
    });
  } catch (err) {
    next(err);
  }
});

// READ ALL
router.get("/", (req, res, next) => {
  try {
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// READ ONE
router.get("/:id", (req, res, next) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put("/:id", validateUser, (req, res, next) => {
  try {
    const idx = users.findIndex(u => u.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: "User not found" });
    users[idx] = { ...users[idx], ...req.body, id: users[idx].id };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), err => {
      if (err) return next(err);
      res.json(users[idx]);
    });
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", (req, res, next) => {
  try {
    const idx = users.findIndex(u => u.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: "User not found" });
    const deleted = users.splice(idx, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), err => {
      if (err) return next(err);
      res.json(deleted[0]);
    });
  } catch (err) {
    next(err);
  }
});

export default router;
