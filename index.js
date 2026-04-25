const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


let books = [
    { id: 1, title: "Playing It My Way", author: "Sachin Tendulkar" },
    { id: 2, title: "Timeless Steel", author: "Rahul Dravid" }
];

// GET - View all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET - View a single book
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

// POST - Add a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT - Update a book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    book.title = req.body.title;
    book.author = req.body.author;
    res.json(book);
});

// DELETE - Delete a book
app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.id !== parseInt(req.params.id));
    res.json({ message: "Book deleted successfully" });
});

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});