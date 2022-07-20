const express = require('express');

const router = express.Router();

const bookData = require('../booksDetails');


//show list of books
router.get('/', (req, res, next) =>{
    return res.send(bookData);
})

//search books by autor, catrgory
router.get('/search', (req, res, next) =>{
    var categoryFilter = req.query.catgory;
    var authorFilter = req.query.author;

    if(categoryFilter && authorFilter){
        searchResult = bookData.filter( book =>{
            return (book.categories.indexOf(categoryFilter) != -1 && book.author.indexOf(authorFilter) != -1);
        });
    }

    if( categoryFilter){
        searchResult = bookData.filter( book =>{
            return book.categories.indexOf(categoryFilter) != -1;
        });
    }

    if( authorFilter){
        searchResult = bookData.filter( book =>{
            return book.author.indexOf(authorFilter) != -1;
        });
    }

    return res.send(searchResult);
});

//add books to saved books
router.post('/add-book', (req, res, next)=>{
    console.log("....add")
    console.log(req.body);
    return res.end();
});

// filter by reading status 'currently reading' 'finished reading'



// see saved books

//update status of a book 

module.exports = router;