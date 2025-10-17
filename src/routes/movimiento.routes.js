const { Router } = require("express");
const ctrl = require("../controllers/movimiento.controller");
const { validate } = require("../middlewares/validate");
const { movimientoSchema } = require("../middlewares/schemas");
const { authRequired } = require("../middlewares/auth");

const r = Router();
r.post("/", authRequired, validate(movimientoSchema), ctrl.registrar);
r.get("/", ctrl.listar);
r.get("/producto/:productoId", ctrl.porProducto);
module.exports = r;
