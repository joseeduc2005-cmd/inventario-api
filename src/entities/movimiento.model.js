const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class Movimiento extends Model {}
Movimiento.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tipo: { type: DataTypes.ENUM("ENTRADA", "SALIDA"), allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    nota: { type: DataTypes.STRING(255), allowNull: true },
    productoId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Movimiento", tableName: "movimientos" }
);
module.exports = Movimiento;
