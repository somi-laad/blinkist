const Sequelize = require("sequelize");

const sequelize = new Sequelize("blinkist", "root", "Password@1", {
  dialect: "mysql",
  host: "localhost",
});


module.exports = sequelize;
