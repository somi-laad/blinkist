const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserBooks = sequelize.define('userBooks', {
    isCurrent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isFinished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = UserBooks;
