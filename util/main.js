const bookData = require('../model/booksDetails');

exports.getBooksByUser = (user) =>{

    var bookList = [];

    var values =  Object.values(user.bookList);

    if(values.length){user.bookList
        values.forEach(v =>{
            let id = v.id;

            var book = bookData.filter(b => {return b.id === id})[0];

            book.isCurrent = v.isCurrent;
            book.isFinished = v.isFinished;
            bookList.push(book);

        });
    }
    return bookList;
};

exports.isValidBook = (id) =>{

    const book = bookData.filter(b => {return b.id === id});

    if(book.length) return true;
    else return false;

};

exports.getBooksByStatus = (status, user) =>{
    console.log(status)
    var isCurrent = status.current;
    var isFinished = status.finished;
    const bookList = this.getBooksByUser(user);

    const booksByStatus = bookList.filter((b) =>{
        if(isCurrent && isFinished){
            return b.isCurrent && b.isFinished;
        }

        if(isCurrent){
            return b.isCurrent;
        }

        if(isFinished){
            return b.isFinished;
        }

        return b;
    });

    return booksByStatus;
}

exports.updateBookStatus = (status, user) =>{

    console.log("............................", status)
    var bookId = status.bookId;
    var isFinished = status.isFinished;
    var isCurrent = status.isCurrent;

    console.log("....2")

    const book = user.getBook("book-"+ bookId);

    console.log(book)

    book.isCurrent = isCurrent ? isCurrent : book.isCurrent;

    book.isFinished = isFinished ? isFinished : book.isFinished;
}

