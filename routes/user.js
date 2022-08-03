const express = require('express');
const router = express.Router();

const validator = require('express-validator');

const userController = require("../controllers/user");

const UserBooks = require("../model/userBooks");


//get all users
router.get("/users", userController.getAllUsers);

//add books to saved books
router.post('/user/book/add',
    validator.body('bookId')
        .isNumeric()
        .withMessage("Book id must be numeric")
        .custom((value, { req }) => {
            const userId = JSON.parse(JSON.stringify(req.user)).id;
            return UserBooks.findOne({
                where: {
                    userId: userId,
                    bookId: value
                }
            }).then(bookdata => {
                if (bookdata) {
                    return Promise.reject("Book already added");
                }
            });
        }),
    userController.addBook
);

// filter by reading status 'currently reading' 'finished reading'
router.get('/user/filterBooks',
    validator.query(['isCurrent', 'isFinished'])
        .isBoolean()
        .withMessage("isCurrent and isFinished should be boolean"),
    userController.filterByStatus
);


// see saved books
router.get('/user/books', userController.getAllUserBooks);

//update status of a book 
router.post('/user/book/update',
    validator.body(['isCurrent', 'isFinished'])
        .isBoolean()
        .withMessage("isCurrent and isFinished should be boolean"),
    validator.body('bookId')
        .isNumeric()
        .withMessage("Book id must be numeric"),
    userController.updateBookStatus
);

module.exports = router;