const service = require("../services/movimiento.service");

module.exports = {
  registrar: async (req, res) => {
    try {
      const result = await service.registrar(req.validated);
      res.status(201).json(result);
    } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
  },
  listar: async (_req, res) => res.json(await service.listar()),
  porProducto: async (req, res) =>
    res.json(await service.obtenerPorProducto(req.params.productoId)),
};
