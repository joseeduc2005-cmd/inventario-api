const { Router } = require("express");
const ctrl = require("../controllers/producto.controller");
const { validate } = require("../middlewares/validate");
const { productoSchema } = require("../middlewares/schemas");
const { authRequired } = require("../middlewares/auth");

const r = Router();
r.post("/", authRequired, validate(productoSchema), ctrl.crear);
r.get("/", ctrl.listar);
r.get("/:id", ctrl.obtener);
r.put("/:id", authRequired, validate(productoSchema), ctrl.actualizar);
r.delete("/:id", authRequired, ctrl.eliminar);
r.get("/:id/kardex", ctrl.kardex);
module.exports = r;
