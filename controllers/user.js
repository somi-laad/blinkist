const Sequelize = require("sequelize");
const Book = require("../model/books");
const UserBooks = require("../model/userBooks");
const User = require("../model/users");

const { validationResult } = require('express-validator');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll()

        const allUsers = JSON.parse(JSON.stringify(users, null, 2));

        return res.status(200).send(allUsers);
    } catch (err) {
        const error = new Error(err);
        return next(error);
    }
}

exports.addBook = async (req, res, next) => {

    const bookId = req.body.bookId;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array()[0].msg);
    }

    try {
        const book = await Book.findByPk(bookId);

        req.user.addBook(book, { through: UserBooks }).then(() => {
            res.statusMessage = "Book added"
            return res.status(201).send();
        }).catch(err => {
            res.statusMessage = "Book not added"
            res.redirect(400, '/user/books');
        });
    } catch (err) {
        const error = new Error(err);
        return next(error);
    }


};

exports.filterByStatus = async (req, res, next) => {

    const isCurrent = req.query.isCurrent;
    const isFinished = req.query.isFinished;

    const userId = JSON.parse(JSON.stringify(req.user)).id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array()[0].msg);
    }

    User.findAll({
        where: { id: userId },
        include: [{
            model: Book,
            through: {
                where: {
                    isCurrent: isCurrent,
                    isFinished: isFinished
                },
                attributes: ['isCurrent', 'isFinished'],
                as: 'status'
            },
        }],
        attributes: ['books.id']
    })
        .then(booksByFilter => {
            return res.status(200).send(JSON.parse(JSON.stringify(booksByFilter)));
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        });
};

exports.getAllUserBooks = async (req, res, next) => {
    try {
        const books = await req.user.getBooks();
        return res.status(200).send(JSON.parse(JSON.stringify(books)));
    }
    catch (err) {
        const error = new Error(err);
        return next(error);
    }
}

exports.updateBookStatus = async (req, res, next) => {
    const bookId = req.body.bookId;
    const updatedCurrent = req.body.isCurrent;
    const updatedFinished = req.body.isFinished;

    const userId = JSON.parse(JSON.stringify(req.user)).id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array()[0].msg);
    }

    UserBooks.findOne({
        where: {
            userId: userId,
            bookId: bookId
        }
    })
        .then(userBook => {

            if (updatedCurrent != undefined) {
                userBook.isCurrent = updatedCurrent;
            }

            if (updatedFinished != undefined) {
                userBook.isFinished = updatedFinished;
            }

            return userBook.save();
        })
        .then(result => {
            res.statusMessage = "Book Status Updated"
            return res.status(201).redirect('/user/books');
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        });


}
