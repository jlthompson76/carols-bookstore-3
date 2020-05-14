## In this classwork you will be working with the Carol's Bookstore application. You will save / retrieve data from MongoDB and display on web page accordingly. ##

## What you already have ##

** You are already provided with the starter code. Your started code includes the following:
    - index.js  // Entry point of the code
    - package.json // Information about this project
    - views folder, containing one EJS file (index.ejs) 


1. To get started, Run 'npm install' in your Terminal. This will install all the required packages from 'package.json'.


2. In you Terminal. Run 'node index.js'   OR 'nodemon index.js'.    Then go to your browser and visit 'localhost:3000/'
    // You can see that you have a basic page and a GET '/' route that displays information from  'index.ejs'


3. Open Compass DB. If you see a database called 'bookstore', DELETE it. 
    After deletion, Create a new database called 'bookstore'. Name the collection 'books'. You don't have to change anything else.


4. Modify your 'app.listen' function.  When the server is started, create a connection with the MongoDB. 
   We have left comments where you should make those edits.
   Hint:  You will have to install the 'mongodb' package and require it. Use code from today or yesterday's code-along as reference.


5. Use the form 'localhost:3000/' to add the following book entries in your database to the Collection called 'books'.

    {book_id: 1, name: "Harry Potter I", author: "J.K. Rowling", price: 20, num_sold: 60000}

    {book_id: 2, name: "The Kite Runner", author: "Khaled Hosseini", price: 15, num_sold: 25000}

    Your form sends the data to the '/add' route. The route is already present in 'index.js'.  
    You will need to get FORM data, and save that data to the MongoDB using the insertOne() method.
    Upon succes, Print a message saying 'Book Inserted' and use the res.redirect('/') method to take the user back to index page.
    Hint: Use code from today or yesterday's code-along as reference.

6. Open Compass DB and see if your deocuments are added the 'books' collection.


7. Modify you app.get('/, ....)  route. Use the MongoDB's  .find() method to get all the books from the database.
   Upon success, use the res.render() method to take the user to index.ejs.
   You should also send the books data retrieved from the database and send it to the index.ejs page in a variable called 'all_books'.

   Hint: Use code from today's code-along as reference.


8. Modify your 'index.ejs' page. Use the forEach loop to display the name of each book on the page. 

   Hint:  Remember you have already sent books array in a variable called 'all_books'   


9. Now, your funtionality to CREATE and Read data should be complete.  Use the FORM on your main page to add more books:

    {book_id: 3, name: "To Kill a Mockingbird", author: "Harper Lee", price: 17, num_sold: 10000}

    {book_id: 4, name: "The Fellowship of the Ring", author: "J.R.R. Tolkien", price: 21, num_sold: 90000}
    
    {book_id: 5, name: "A Storm of Swords", author: "George R.R. Martin", price: 23, num_sold: 30000}
    
    {book_id: 6, name: "A Dance with Dragons", author: "George R.R. Martin", price: 25, num_sold: 40000}


######################## BONUS

10. Modify your index.ejs page.  Now instead of just displaying the name of the book, make it clickable with <a> tags  
    around it. 
    When the user clicks on a book name, take the user to a page called '/view/BOOKID', where BOOKID is a parameter.
    // Hint: You will need to create a app.get('/view/:book_id') route. In this route use the find method to find the
    // book with the particular ID. You will need to use the query parameters 'find({key: value})'
    // Once you have the book object, take the user to a new page called 'book.ejs'. Here you should display all the information about that book


11. Modify your 'books.ejs'. At the bottom of the page, create a link using <a> tage. Name it 'Sale! Make the price 10'.
    When you click on the link, it should take you to the '/updatePrice/:book_id' route. 
    // Again, you will need to create a new route called app.get('/updatePrice/:book_id'). 
    // In this route, use the updateOne() method of MongoDB to update the price of that particular book to 10.
    // Upon success, redirect the user to '/view/BOOK_ID', where BOOK_ID is the id of the book we are working with here.


12. Modify your 'books.ejs'. At the bottom of the page, create a link using <a> tage. Name it 'Delete Book'.
    When you click on the link, it should take you to the '/delete/:book_id' route. 
    // Again, you will need to create a new route called app.get('/delete/:book_id'). 
    // In this route, use the deleteOne() method of MongoDB to delete that particular book.
    // Upon success, redirect the user to '/'.