const express = require('express');
const { getBooks } = require('../controllers/books');
const router = express.Router();

const bookData = require('../model/booksDetails');
const util = require('../util/main');

const bookController = require('../controllers/books');

//show list of books
router.get('/', bookController.getBooks);

//search books by autor, catrgory
router.get('/search', bookController.searchBooks);

module.exports = router;
