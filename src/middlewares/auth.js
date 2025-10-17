const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "dev-super-secreto";

const authRequired = (req, res, next) => {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = { authRequired, SECRET };
