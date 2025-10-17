const { Router } = require("express");
const ctrl = require("../controllers/auth.controller");
const r = Router();

// Login (dev): obtener token
r.post("/login", ctrl.login);

module.exports = r;
