const db = require('../util/database');

var allUsers = [];

class User {
    constructor(id){
        this.id = id;

        const currUser = allUsers.find((u) => {
            return u.id = id
        });

        this.name = currUser.name;

        this.getAllBooks();
    }

    getAllBooks(){
        return new Promise((resolve, reject) =>{
            db.execute('SELECT * FROM userBook WHERE userID = ?', [this.id]).then(r =>{
                this.bookList  = r[0];
                resolve(this.bookList);
            }).catch( err => {
                console.log(err)
                reject();
            });
        });
    }

    async addBook( bookId){
           var result = await db.execute('INSERT INTO userBook userId, bookId, isCurrent, isFinished', [this.id, bookId, false, false])
            console.log(result)
            // .then(r =>{

            //     if(r[0].length){
            //         resolve(true);
            //     } else {
            //         reject();
            //     }
            // }).catch( err => {
            //     console.log(err);
            // });
        
    };

    hasBook(bookId){

        return new Promise( (resolve, reject) => {
            db.execute('SELECT * FROM userBook WHERE userID = ? AND bookId = ?', [this.id, bookId]).then(r =>{

                if(r[0].length){
                    resolve(true);
                } else {
                    reject();
                }
            }).catch( err => {
                console.log(err);
            });
        });
    }

}

exports.User = User;

exports.getAllUsers= () =>{

    return new Promise((resolve, reject) => {
        db.execute('SELECT * FROM user').then(result =>{
            allUsers = result[0];
            resolve();
        }).catch(err =>{
            console.log(err);
        });
    });
    
}