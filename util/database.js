const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'blinkist',
    password: 'Password@1'
});

module.exports = pool.promise();