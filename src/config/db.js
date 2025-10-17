const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'inventario.sqlite',
  logging: false
});

module.exports = { sequelize };
