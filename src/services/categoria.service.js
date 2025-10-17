const { Categoria, Producto } = require("../entities");

const crear = async (data) => Categoria.create(data);
const listar = async () => Categoria.findAll();
const obtener = async (id) => Categoria.findByPk(id);
const actualizar = async (id, data) => {
  const cat = await obtener(id);
  if (!cat) return null;
  await cat.update(data);
  return cat;
};
const eliminar = async (id) => {
  const countProd = await Producto.count({ where: { categoriaId: id } });
  if (countProd > 0) {
    const err = new Error("No se puede eliminar categoría con productos asociados");
    err.status = 409;
    throw err;
  }
  const cat = await obtener(id);
  if (!cat) return null;
  await cat.destroy();
  return true;
};

module.exports = { crear, listar, obtener, actualizar, eliminar };
