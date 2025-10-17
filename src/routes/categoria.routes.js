const { Router } = require("express");
const ctrl = require("../controllers/categoria.controller");
const { validate } = require("../middlewares/validate");
const { categoriaSchema } = require("../middlewares/schemas");
const { authRequired } = require("../middlewares/auth");

const r = Router();
r.post("/", authRequired, validate(categoriaSchema), ctrl.crear);
r.get("/", ctrl.listar);
r.get("/:id", ctrl.obtener);
r.put("/:id", authRequired, validate(categoriaSchema), ctrl.actualizar);
r.delete("/:id", authRequired, ctrl.eliminar);
module.exports = r;
