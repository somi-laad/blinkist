const bookData = require('../model/booksDetails');

exports.getBooks = (req, res, next) =>{
    return res.status(200).send(bookData);
}

exports.searchBooks = (req, res, next) =>{

    const categoryFilter = req.query.category;
    const authorFilter = req.query.author;

    var searchResult = [];

    if(categoryFilter && authorFilter){
        searchResult = bookData.filter( book =>{
            return book.categories.toLowerCase().includes(categoryFilter) && 
            book.author.toLowerCase().includes(authorFilter);
        });
    }

    if(categoryFilter){
        searchResult = bookData.filter( book =>{
            return book.categories.toLowerCase().includes(categoryFilter);
        });
    }

    if(authorFilter){
        searchResult = bookData.filter( book =>{
            return book.author.toLowerCase().includes(authorFilter) ;
        });
    }

    return res.status(200).send(searchResult);
};