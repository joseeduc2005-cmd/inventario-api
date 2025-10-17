const service = require("../services/producto.service");

module.exports = {
  crear: async (req, res) => {
    try {
      const data = await service.crear(req.validated);
      res.status(201).json(data);
    } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
  },
  listar: async (_req, res) => res.json(await service.listar()),
  obtener: async (req, res) => {
    const p = await service.obtener(req.params.id);
    if (!p) return res.status(404).json({ error: "No encontrado" });
    res.json(p);
  },
  actualizar: async (req, res) => {
    try {
      const p = await service.actualizar(req.params.id, req.validated);
      if (!p) return res.status(404).json({ error: "No encontrado" });
      res.json(p);
    } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
  },
  eliminar: async (req, res) => {
    try {
      const ok = await service.eliminar(req.params.id);
      if (!ok) return res.status(404).json({ error: "No encontrado" });
      res.json({ ok: true });
    } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
  },
  kardex: async (req, res) => {
    const k = await service.kardex(req.params.id);
    if (!k) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(k);
  }
};
