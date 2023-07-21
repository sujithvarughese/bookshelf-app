import Book from "../models/Book.js";
import Bookshelf from "../models/Bookshelf.js";
import { StatusCodes } from "http-status-codes";
import bookshelf from "../models/Bookshelf.js";

// GET all books in library
const getAllBooks = async (req, res) => {
	const library = await Book.find();
	res.status(StatusCodes.OK).json({ library });
};

// POST add single book from req.body object
const addBookToLibrary = async (req, res) => {
	const book = await Book.findOne({ title: req.body.title });
	if (book) {
		res.status(StatusCodes.BAD_REQUEST).json({ msg: "book already exists!" });
	}
	await Book.create(req.body);
	const library = await Book.find();
	res.status(StatusCodes.CREATED).json({ library });
};

// PATCH book details from req.body
const updateBookDetails = async (req, res) => {
	const book = await Book.findByIdAndUpdate(req.params.id, req.body);
	res.status(StatusCodes.OK).json({ msg: `${book.title} successfully updated` });
};

// DELETE book from library using params
const removeBookFromLibrary = async (req, res) => {
	const book = await Book.findByIdAndDelete(req.params.id);
	const bookshelves = await Bookshelf.find();

	// get all Bookshelves, then get [books] from each bookshelf and filter to not include deleted book,
	// -then update Bookshelf in mongoDB
	bookshelves.map(async (bookshelf) => {
		const { books } = bookshelf;
		const updatedBooks = books.filter(book => book._id !== req.params.id);
		await Bookshelf.findByIdAndUpdate(bookshelf._id, { updatedBooks });
	});

	res.status(StatusCodes.OK).json({ msg: `${book.title} successfully removed from library` });
};

export { getAllBooks, addBookToLibrary, updateBookDetails, removeBookFromLibrary };
