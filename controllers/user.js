const userModel = require("../model/user");
const util = require('../util/main');

var user;

exports.addBook = (req, res, next) => {

    const bookId = parseInt(req.body.bookId);

    var key = "book-" + bookId;

    console.log(user)

    user.hasBook(bookId).then(() => {
        res.statusMessage = "Already added";
        return res.status(400).send();
    }).catch(() => {
        user.addBook(bookId);

    });

    return res.status(400).send();

    //check if book already exits
    // if(user.hasBook(bookId)){
    //     res.statusMessage = "Already added"
    //     return res.status(400).send();
    // } else if(util.isValidBook(bookId)){
    //     user.addBook( key,  {
    //         id: bookId,
    //         isCurrent: false,
    //         isFinished: false
    //     });

    //     const bList = util.getBooksByUser(user);
    //     return res.status(200).send(bList);
    // } else {
    //     res.statusMessage = "Invalid book id";

    // }
};

exports.filterByStatus = (req, res, next) => {
    var filteredResult = util.getBooksByStatus(req.query, user);

    return res.status(200).send(filteredResult);
};

exports.getBooks = (req, res, next) => {
    const bookList = util.getBooksByUser(user);

    return res.status(200).send(bookList);
}

exports.updateBookStatus = (req, res, next) => {


    try {

        console.log("....1", res.body)
        util.updateBookStatus(res.body, user);

        return res.status(400).send(user.getBook("book-" + res.body.bookId));
    } catch {
        return res.status(500).send();
    }


}