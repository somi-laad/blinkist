const booksModel = require('../model/books');


exports.getBooks = (req, res, next) =>{
    return res.status(200).send(booksModel.books);
}

exports.searchBooks = (req, res, next) =>{

    const categoryFilter = req.query.category;
    const authorFilter = req.query.author;

    var searchResult = [];

    if(categoryFilter && authorFilter){
        searchResult = booksModel.books.filter( book =>{
            return book.categories.toLowerCase().includes(categoryFilter) && 
            book.author.toLowerCase().includes(authorFilter);
        });
    }

    if(categoryFilter){
        searchResult = booksModel.books.filter( book =>{
            return book.categories.toLowerCase().includes(categoryFilter);
        });
    }

    if(authorFilter){
        searchResult = booksModel.books.filter( book =>{
            return book.author.toLowerCase().includes(authorFilter) ;
        });
    }

    return res.status(200).send(searchResult);
};