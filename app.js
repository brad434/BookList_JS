// 1. Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// 2. UI Class: Handle UI Tasks

class UI {
    static displayBooks() {
        const StoredBooks = [ //this is pre-set array
            {
                title: 'Book One',
                author: 'Brad Ley',
                isbn: '1233445'
            },
            {
                title: 'Book Two',
                author: 'Lee Orange',
                isbn: '9090901'
            }
        ];

        const books = StoredBooks;

        // this code will go thru each property from the books variable 
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector("#book-list");

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }
    
    static deleteBook(el){
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove(); //in row 42 we delete the parent element td then deleting tr aka line 36. To delete the row once a row in html has a class of "remove"
        }
    }

    static showAlert(message, className) {
        //we created a div class for the html file
        const div = document.createElement('div');

        //the div will now have a class with the information below. We then add it to the end of the div class which the div class is will have is setup like <div class="etc">
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message)); // the message which is passed in from the user input will be at the end of the div here the closing bracket is ex:<div classname>EX</div>

        // to place the code above in the html file 
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        
        // What this is saying is, in the container class insert this new div class before the form class
        container.insertBefore(div, form); 

        //Vanish Error Message in 3 sec
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Store Class: Handles Storage . Local storage does not support Object
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) { //if there is no item of books then 
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem(books)); // JSON.parse was added to this code because if we didnt it would have stored the value as a string. Thats why we use JSON.parse to give it to us as a regular JS array of objects. 
        }

        return books; //ultimately returning the array
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book); // the "book" is a parameter from line 93. As a reminder. There is no variable named book. We just used a random word and that word is book.

        localStorage.setItem('books', JSON.stringify(books)); //the JSON.stringify makes our code a regular JS array of objects because we called it from the stored value of books which equals to Store.getBooks().
    }

    static removeBook(isbn) { //we're removing by isbn because that number is ALWAYS unique. Not one book will have the same ISBN #
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {

            }
        });

    }
}

// 3rd Event: To Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: To Add a Book
document.querySelector("#book-form").addEventListener('submit', (e) => {
    // Prevent actual submit from refreshing after submit is clicked
    e.preventDefault();
    
    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate 
    if(title === '' || author === '' || isbn === '') {
        //showAlert 
    UI.showAlert('Please fill in the blanks!', 'danger');
    } else {
    //Instatiates book 
    const book = new Book(title, author, isbn);
    
    // Add Book to UI
    UI.addBookToList(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields when value is displayed at the bottom 
    UI.clearFields()
    }
});

//Event: To Remove a Book

document.querySelector("#book-list").addEventListener('click', (e) => {
    UI.deleteBook(e.target)

    // Show success message
    UI.showAlert('Book Deleted!', 'success');

});

