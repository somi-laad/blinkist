const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isCurrent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isFinished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = User;
