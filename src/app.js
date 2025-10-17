const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { swaggerUi, swaggerSpec } = require("./docs/swagger");
const categoriaRoutes = require("./routes/categoria.routes");
const productoRoutes = require("./routes/producto.routes");
const movimientoRoutes = require("./routes/movimiento.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/movimientos", movimientoRoutes);
app.use("/api/auth", authRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => res.json({ ok: true, name: "Inventario API" }));

app.use((req, res) =>
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` })
);

module.exports = app;
