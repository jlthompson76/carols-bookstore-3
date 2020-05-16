const express = require('express');
const body_parser = require('body-parser');
const mongodb = require('mongodb');

const PORT = 3000;
const app = express();
// Set the View Engine
app.set('view engine', 'ejs');

// Use body Parser in middle-ware
app.use(body_parser.json());
app.use(body_parser.urlencoded( {extended: true} ));

// Declare any constants or variables here for Database
let db_handler;
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'bookstore';
const COLLECTION_NAME = 'books';

app.listen(PORT, () => {
    console.log(`Server Started on Port: ${PORT}`);

    // Step 4.
    // Here you should create a connection with your database
    mongo_client = mongodb.MongoClient;
    
    mongo_client.connect(DB_URL, (err, db_client) => {
        if (err) {
            console.log(`Error detected, unable to connect to the database: ${err}`);
        } else {
            // Upon success, print a message saying "Database Connected"
            console.log(`Database Connected: You are now connected to the ${DB_NAME} database`);

            // Upon success, you should also connect to the 'bookstore' database.
            db_handler = db_client.db(DB_NAME);
        };
    });
});

// From here on, we can start writing our routes

app.get('/', (req, res) => {
    // During Step 7., we will fetch data from Database here.
    db_handler.collection(COLLECTION_NAME).find({}).toArray( (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.render('index', {
                'all_books': result
            });
        };
    });
});

app.get('/view/:book_id', (req, res) => {
    const parameters = req.params;
    const book_id = parameters['book_id'];
    db_handler.collection(COLLECTION_NAME).find( {book_id: book_id} ).toArray ( (err, result) => {
        if (err) {
            res.send("Book not found");
            console.log(err);
        }
        else {
            res.render('book', {
                'single_book': result[0]
            });
        };
    });
});

app.post('/add', (req, res) => {
    // This is where you will get a POST request on the '/add' route. 
    // Step 5. Add your logic here.
    const form_data = req.body;
    console.log(req.body);

    const book_id = form_data['book_id'];
    const name = form_data['name'];
    const author = form_data['author'];
    let price = parseInt(form_data['price']);
    let num_sold = parseInt(form_data['num_sold']);

    const bookObject = {
        book_id: book_id,
        name: name,
        author: author,
        price: price,
        num_sold: num_sold
    }
    console.log(bookObject);

    db_handler.collection(COLLECTION_NAME).insertOne(bookObject, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Book Inserted: ${name} by ${author} was successfully added to your ${DB_NAME} database in the ${COLLECTION_NAME} collection`);
            res.redirect('/');
        };
    });
});
