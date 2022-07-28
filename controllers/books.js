const Book = require('../model/book/books');

exports.getBooks = (req, res, next) => {


    Book.findAll().then(books => {
        var allBooks = JSON.stringify(books, null, 2);

        return res.status(200).send(allBooks);
    })

}

exports.searchBooks = (req, res, next) => {

    const categoryId = req.query.category;
    const authorId = req.query.author;

    Book.findAll({
        where: {
            categoryId: categoryId,
            authorId: authorId
        }
    }).then(books => {
        var allBooks = JSON.stringify(books, null, 2);
        return res.status(200).send(allBooks);
    });
}