const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class Categoria extends Model {}
Categoria.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(80), allowNull: false, unique: true },
    descripcion: { type: DataTypes.STRING(255), allowNull: true },
  },
  { sequelize, modelName: "Categoria", tableName: "categorias" }
);
module.exports = Categoria;
