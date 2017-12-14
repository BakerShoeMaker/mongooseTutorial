var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./book.model');
var PORT = 8080;

var db = 'mongodb://localhost/db_tutorials';
mongoose.connect(db);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", function(req, res){
   res.send("We are in the house!");
});

app.get('/books', function(req, res){

    console.log('Getting all the books.');
    Book.find({}).exec(function(err, results){
        if(err){res.send("An error has occurred")}
        else{ console.log(db)
        res.json(results)}
    });

});

app.get('/books/:id', function(req, res){

    console.log('Getting all the books.');
    Book.findOne({
        _id:req.params.id


    }).exec(function(err, results){
        if(err){res.send("An error has occurred")}
        else{ console.log(results)
            res.json(results)}
    });

});

app.post('/books',function (req, res) {
    console.log("Posting to database.");
    var newBook = new Book();
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category= req.body.category;

    newBook.save(function(err, book){
        if(err){
            res.send("error saving book");

        }
        else{
            console.log(book);
            res.send(book);
        }

    })

});


app.post('/books2',function (req, res) {
    console.log("Posting to database.");

    Book.create(req.body, function(err, book){
        if(err){
            res.send("error saving book");
        }
        else{
            console.log(book);
            res.send(book);
        }

    });

});

app.put('/books/:id', function(req, res){
    console.log("Updating the file!!!!!");
   Book.findOneAndUpdate(

       {_id:req.params.id},
       {$set: {title: req.body.title}},

       {upsert: true},

       function(err, newBook){
                    if(err){
                        console.log("error occurred");
                    }
                    else{
                        console.log(newBook);
                        res.status(204);
                    }
            }
    );
});//end put

app.delete('/books/:id', function(req, res){
    Book.findOneAndRemove(
        {_id: req.params.id},
        function(err, book){
            if(err){

                res.send('error deleting');
            }
            else{
                console.log(book);
                res.status(204);
            }
        }
    );





})

app.listen(PORT, function(){

    console.log("Sever listening on port: " + PORT);

});