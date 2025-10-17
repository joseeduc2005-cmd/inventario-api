const jwt = require("jsonwebtoken");
const { SECRET } = require("../middlewares/auth");

// Credenciales DEMO para la práctica
const USER = { username: "admin", password: "admin123" };

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body || {};
    if (username !== USER.username || password !== USER.password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const token = jwt.sign({ sub: username, role: "admin" }, SECRET, { expiresIn: "8h" });
    return res.json({ token });
  }
};
