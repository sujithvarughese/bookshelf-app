import Book from "../models/Book.js";
import User from "../models/User.js";
import Bookshelf from "../models/Bookshelf.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

// GET all books in library
const getLibrary = async (req, res) => {
	const library = await Book.find({ user: req.user.userID });
	res.status(StatusCodes.OK).json({ library });
};

// POST add single book from req.body object
const addBookToLibrary = async (req, res) => {

	// check if book is already in library, if so send error is response
	const duplicate = await Book.findOne({
		user: req.user.userID,
		title: req.body.title
	});
	console.log(duplicate);
	if (duplicate) {
		throw new BadRequestError("Book already in Library!");
	}
	// create new book object
	const newBook = await Book.create({ ...req.body, user: req.user.userID });
	res.status(StatusCodes.CREATED).json({ newBook });
};

// PATCH book details from req.body
const updateBookDetails = async (req, res) => {
	const book = await Book.findByIdAndUpdate(req.params.id, req.body);
	res.status(StatusCodes.OK).json({ msg: `${book.title} successfully updated` });
};

// DELETE book from library using params
const removeBookFromLibrary = async (req, res) => {

	// - req.body.inBookshelf is null if book is not in any bookshelf, else contains bookshelf._id
	// - if in bookshelf, retrieve bookshelf and update books array to remove deleted book
	console.log(req.params.id);
	const book = await Book.findById(req.params.id);

	if (book.inBookshelf !== null) {
		const bookshelf = await Bookshelf.findById(book.inBookshelf);
		const updatedBooks = bookshelf.books.filter(book => book._id !== req.params.id);
		await Bookshelf.findByIdAndUpdate(book.inBookshelf, { ...bookshelf, books: updatedBooks });
	}

	await Book.findByIdAndDelete(req.params.id);
	res.status(StatusCodes.OK).json("successfully removed from library");
};

export { getLibrary, addBookToLibrary, updateBookDetails, removeBookFromLibrary };
