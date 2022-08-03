const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");

const errorController = require("./controllers/error");

//creates table for models
const sequelize = require("./util/database");
const Sequelize = require('sequelize');

const Book = require('./model/books');
const Category = require('./model/category');
const Author = require('./model/author');
const User = require("./model/users");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', (req, res, next) => {
    User.findByPk(6)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            const error = new Error(err);
            next(error);
        });
});

app.use(userRouter);
app.use(bookRouter);

app.use(errorController.get404Error);

app.use((error, req, res, next) => {
    return res.status(500).send(error.message);
});

Category.hasMany(Book)
Category.belongsTo(Book, {
    foreignKey: 'id'
});

Author.hasMany(Book)
Author.belongsTo(Book, {
    foreignKey: 'id'
});

User.belongsToMany(Book, { through: 'userBooks' });
Book.belongsToMany(User, { through: 'userBooks' });

sequelize.sync()
    .then(() => {
        app.listen(3001);
    }).catch(err => {
        console.log(err);
    });
