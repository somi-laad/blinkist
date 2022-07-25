const fs = require('fs');
const path = require('path');

module.exports = class User {
    constructor(name){
        this.name = name;
        this.bookList = {};
    }

    addBook( key, value){
        this.bookList[key] = value;
    }

    getBook(key) {
        return this.bookList[key];
    }
}