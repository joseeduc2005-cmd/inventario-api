const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class Producto extends Model {}
Producto.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sku: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    nombre: { type: DataTypes.STRING(120), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    precio: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0.00 },
    categoriaId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Producto", tableName: "productos" }
);
module.exports = Producto;
