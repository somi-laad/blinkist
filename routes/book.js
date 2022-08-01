const express = require('express');
const router = express.Router();

const validator = require('express-validator');

const bookController = require('../controllers/books');

//show list of books
router.get('/books', bookController.getBooks);

//search books by author, catrgory
router.get('/books/search',
    validator.body(['category', 'author']).isBoolean(),
    bookController.searchBooks
);

router.post('/book/add', bookController.addBook);

router.post('/author/add', bookController.addAutor);
router.post('/category/add', bookController.addCategoty);

module.exports = router;
