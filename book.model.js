console.log('The book.model.js is working!!!!');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new  Schema(
    {
        title: String,
        author: String,
        category: String
    }
);

module.exports = mongoose.model('Book', BookSchema);
//books was NOT automatically created. Had to create it