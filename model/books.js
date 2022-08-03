const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pages: {
        type: Sequelize.INTEGER
    }
});

module.exports = Book;