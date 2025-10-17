const { Movimiento, Producto } = require("../entities");
const { sequelize } = require("../config/db");

const registrar = async ({ productoId, tipo, cantidad, nota }) => {
  return await sequelize.transaction(async (t) => {
    const prod = await Producto.findByPk(productoId, { transaction: t, lock: t.LOCK.UPDATE });
    if (!prod) {
      const e = new Error("El producto no existe");
      e.status = 400;
      throw e;
    }
    if (tipo === "SALIDA" && prod.stock < cantidad) {
      const e = new Error("Stock insuficiente para salida");
      e.status = 409;
      throw e;
    }
    const nuevoStock = tipo === "ENTRADA" ? prod.stock + cantidad : prod.stock - cantidad;
    await prod.update({ stock: nuevoStock }, { transaction: t });
    const mov = await Movimiento.create({ productoId, tipo, cantidad, nota }, { transaction: t });
    return { movimiento: mov, stock: nuevoStock };
  });
};

const listar = async () => Movimiento.findAll();
const obtenerPorProducto = async (productoId) => Movimiento.findAll({ where: { productoId } });

module.exports = { registrar, listar, obtenerPorProducto };
