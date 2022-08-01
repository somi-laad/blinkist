const Book = require('../model/book/books');
const Author = require("../model/book/author");
const Category = require("../model/book/category");

exports.addAutor = async function (req, res, next) {

    const author = {
        name: req.body.name
    };

    try {
        const newAuthor = Author.create(author);
        res.statusMessage = "Author Added";
        return res.status(200).send();
    } catch (err) {
        const error = new Error(err);
        return next(error);
    }


};

exports.addCategoty = async function (req, res, next) {

    console.log(req.body);

    const category = {
        name: req.body.name
    };

    try {
        const newCategory = Category.create(category);
        res.statusMessage = "Category Added";
        return res.status(200).send();
    } catch (err) {
        const error = new Error(err);
        return next(error);
    }

};

const getBooks = async function (req, res, next) {
    try {
        const books = await Book.findAll()

        const allBooks = JSON.stringify(books, null, 2);

        return res.status(200).send(allBooks);
    } catch (err) {
        const error = new Error(err);
        return next(error);
    }
}

exports.searchBooks = async function (req, res, next) {

    const categoryId = req.query.category;
    const authorId = req.query.author;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array()[0].msg);
    }

    const constraint = {};

    if (categoryId != undefined) {
        constraint.categoryId = categoryId;
    }

    if (authorId != undefined) {
        constraint.authorId = authorId;
    }

    try {
        const books = await Book.findAll({
            where: constraint
        });

        const searchResult = JSON.stringify(books, null, 2);
        return res.status(200).send(searchResult);
    } catch (err) {
        const error = new Error(err);
        return next(error);
    }

}

exports.addBook = async function (req, res, next) {

    const book = {
        title: req.body.title,
        authorId: req.body.authorId,
        categoryId: req.body.categoryId,
        pages: req.body.pages
    };

    try {
        const newBook = await Book.create(book);

        const allBooks = await getBooks(req, res);

        return allBooks;
    } catch (err) {
        const error = new Error(err);
        return next(error);
    }
}

exports.getBooks = getBooks;

