const db = require('../util/database');

class Books {
    constructor(){
        this.books  = [];
        this.fetchBooks().then(r =>{
            this.books = r[0];
        });
    }

    fetchBooks(){
        return db.execute('SELECT * FROM books');
    }

    fetchBookById(id){
        return db.execute('SELECT * FROM books WHERE id = ?', [id])
    }
}

var booksModel = new Books();

module.exports = booksModel;