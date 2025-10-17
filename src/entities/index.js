const { sequelize } = require("../config/db");
const Categoria = require("./categoria.model");
const Producto = require("./producto.model");
const Movimiento = require("./movimiento.model");

Categoria.hasMany(Producto, { foreignKey: "categoriaId", onDelete: "RESTRICT" });
Producto.belongsTo(Categoria, { foreignKey: "categoriaId" });

Producto.hasMany(Movimiento, { foreignKey: "productoId", onDelete: "RESTRICT" });
Movimiento.belongsTo(Producto, { foreignKey: "productoId" });

const syncModels = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = { Categoria, Producto, Movimiento, syncModels };
