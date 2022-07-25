const express = require('express');
const router = express.Router();

const util = require('../util/main');
const userController = require("../controllers/user");


//add books to saved books
router.post('/add-book', userController.addBook);

// filter by reading status 'currently reading' 'finished reading'
router.get('/reading-status', userController.filterByStatus);


// see saved books
router.get('/books', userController.getBooks);

//update status of a book 
router.post('/update-book', userController.updateBookStatus);

module.exports = router;