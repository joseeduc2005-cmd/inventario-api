const service = require("../services/categoria.service");

module.exports = {
  crear: async (req, res) => {
    try {
      const data = await service.crear(req.validated);
      res.status(201).json(data);
    } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
  },
  listar: async (_req, res) => res.json(await service.listar()),
  obtener: async (req, res) => {
    const c = await service.obtener(req.params.id);
    if (!c) return res.status(404).json({ error: "No encontrado" });
    res.json(c);
  },
  actualizar: async (req, res) => {
    try {
      const c = await service.actualizar(req.params.id, req.validated);
      if (!c) return res.status(404).json({ error: "No encontrado" });
      res.json(c);
    } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
  },
  eliminar: async (req, res) => {
    try {
      const ok = await service.eliminar(req.params.id);
      if (!ok) return res.status(404).json({ error: "No encontrado" });
      res.json({ ok: true });
    } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
  }
};
