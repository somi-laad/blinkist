const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");

const errorController = require("./controllers/error");

//creates table for models
const sequelize = require("./util/database");
const Sequelize = require('sequelize');

const Book = require('./model/book/books');
const Category = require('./model/book/category');
const Author = require('./model/book/author');
const User = require("./model/user");

Category.hasMany(Book)
Category.belongsTo(Book, {
    foreignKey: 'id'
});

Author.hasMany(Book)
Author.belongsTo(Book, {
    foreignKey: 'id'
});


User.belongsToMany(Book, { through: 'User_Books' });
Book.belongsToMany(User, { through: 'User_Books' })

sequelize.sync()
    .then((result) => {
        app.listen(3001);
    }).catch(err => {
        console.log(err);
    });


//add data to db
// Category.create({ name: 'si-fi' });
// Author.create({ name: 'F. Scott Fitzgerald' });

//Book.create({ title: "Great Gatsby", pages: 320, categoryId: 1, authorId: 3 });

//User.create({ name: "Somi" });

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRouter);
app.use(bookRouter);

app.use(errorController.get404Error);



