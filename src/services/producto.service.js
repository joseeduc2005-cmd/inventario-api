const { Producto, Categoria, Movimiento } = require("../entities");

const crear = async (data) => {
  const cat = await Categoria.findByPk(data.categoriaId);
  if (!cat) {
    const e = new Error("La categoría no existe");
    e.status = 400;
    throw e;
  }
  return Producto.create(data);
};

const listar = async () => Producto.findAll({ include: Categoria });
const obtener = async (id) => Producto.findByPk(id, { include: Categoria });

const actualizar = async (id, data) => {
  const prod = await Producto.findByPk(id);
  if (!prod) return null;
  if (data.categoriaId) {
    const cat = await Categoria.findByPk(data.categoriaId);
    if (!cat) {
      const e = new Error("La categoría no existe");
      e.status = 400;
      throw e;
    }
  }
  await prod.update(data);
  return prod;
};

const eliminar = async (id) => {
  const movs = await Movimiento.count({ where: { productoId: id } });
  if (movs > 0) {
    const e = new Error("No se puede eliminar producto con movimientos registrados");
    e.status = 409;
    throw e;
  }
  const prod = await Producto.findByPk(id);
  if (!prod) return null;
  await prod.destroy();
  return true;
};

const kardex = async (id) => {
  const prod = await Producto.findByPk(id);
  if (!prod) return null;
  const movs = await Movimiento.findAll({ where: { productoId: id }, order: [["id","ASC"]] });
  let saldo = 0;
  const detalle = movs.map(m => {
    saldo += (m.tipo === "ENTRADA" ? m.cantidad : -m.cantidad);
    return { id: m.id, tipo: m.tipo, cantidad: m.cantidad, nota: m.nota || "", saldo };
  });
  return { producto: prod, movimientos: detalle, saldoFinal: saldo };
};

module.exports = { crear, listar, obtener, actualizar, eliminar, kardex };
