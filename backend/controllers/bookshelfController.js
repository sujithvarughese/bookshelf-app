import Bookshelf from "../models/Bookshelf.js";
import Book from "../models/Book.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

// GET all bookshelves (unpopulated)
const getAllBookshelves = async (req, res) => {
	const bookshelves = await Bookshelf.find({ user: req.user.userID });
	res.status(StatusCodes.OK).json({ bookshelves });
};

// GET single populated bookshelf
const getBookshelf = async (req, res) => {
	const { id } = req.params;
	const bookshelf = await Bookshelf.findById(id).populate("books");
	res.status(StatusCodes.OK).json({ bookshelf });
};
// POST new bookshelf
const createBookshelf = async (req, res) => {
	const bookshelf = await Bookshelf.create({ ...req.body, user: req.user.userID });
	res.status(StatusCodes.CREATED).json({ bookshelf });
};
// PATCH update bookshelf details
const updateBookshelf = async (req, res) => {
	const bookshelf = await Bookshelf.findByIdAndUpdate(req.params.id, req.body);
	res.status(StatusCodes.OK).json({ bookshelf });
};

// DELETE bookshelf
const deleteBookshelf = async (req, res) => {
	const { id } = req.params;
	const bookshelf = await Bookshelf.findByIdAndDelete(id);
	res.status(StatusCodes.OK).json({ msg: `${bookshelf.name} successfully deleted` });
};

// PATCH - update existed bookshelf by adding book into bookshelf.books list
const addBookToBookshelf = async (req, res) => {

	const bookshelf = await Bookshelf.findById(req.params.id);
	const { books } = bookshelf;

	// make sure book not in bookshelf by comparing book._id (stored in req.body.bookID) with books in bookshelf
	// (even though already verified in front end)
	const duplicate = books.find(book => book._id.valueOf() === req.body.book);
	if (duplicate) {
		throw new BadRequestError("Book already in current bookshelf");
	}
	const book = await Book.findById(req.body.book);

	// verify again book is not in a bookshelf
	if (book.bookshelf !== null) {
		throw new BadRequestError("Book in another bookshelf");
	}
	// update array of books in bookshelf to include new book
	books.push(req.body.book);

	// update bookshelf with updated books array
	await Bookshelf.findByIdAndUpdate(req.params.id, { ...bookshelf, books: books });

	// update book with reference to bookshelf and bookshelf name
	await Book.findByIdAndUpdate(req.body.book, { ...this, bookshelf: bookshelf, bookshelfName: bookshelf.name });
	res.status(StatusCodes.OK).json({ msg: `${book.title} added to ${bookshelf.name}` });
};

// PATCH - update existed bookshelf by deleting book from [books] in BookshelfPreview object
const removeBookFromBookshelf = async (req, res) => {
	const bookshelf = await Bookshelf.findById(req.params.id);
	const { books } = bookshelf;

	// update in book
	await Book.findByIdAndUpdate(req.body.book, { ...this, bookshelf: null, bookshelfName: "" });

	// update books array in bookshelf
	const updatedBookList = books.filter(book => book._id.valueOf() !== req.body.book);
	await Bookshelf.findByIdAndUpdate(req.params.id, { ...this, books: updatedBookList });
	res.status(StatusCodes.OK).json({ msg: `Bookshelf updated: ${updatedBookList}` });
};


export {
	getAllBookshelves,
	getBookshelf,
	createBookshelf,
	updateBookshelf,
	deleteBookshelf,
	addBookToBookshelf,
	removeBookFromBookshelf
};
