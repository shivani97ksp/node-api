import express from "express";
import users from "./MOCK_DATA.json" assert { type: "json" };
const app = express();
app.use(express.json());

// CREATE
app.post("/users", (req, res) => {
	const user = req.body;
	user.id = users.length ? users[users.length - 1].id + 1 : 1;
	users.push(user);
	res.status(201).json(user);
});

// READ ALL
app.get("/users", (req, res) => {
	res.json(users);
});

// READ ONE
app.get("/users/:id", (req, res) => {
	const user = users.find(u => u.id === parseInt(req.params.id));
	if (!user) return res.status(404).json({ error: "User not found" });
	res.json(user);
});

// UPDATE
app.put("/users/:id", (req, res) => {
	const idx = users.findIndex(u => u.id === parseInt(req.params.id));
	if (idx === -1) return res.status(404).json({ error: "User not found" });
	users[idx] = { ...users[idx], ...req.body };
	res.json(users[idx]);
});

// DELETE
app.delete("/users/:id", (req, res) => {
	const idx = users.findIndex(u => u.id === parseInt(req.params.id));
	if (idx === -1) return res.status(404).json({ error: "User not found" });
	const deleted = users.splice(idx, 1);
	res.json(deleted[0]);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});