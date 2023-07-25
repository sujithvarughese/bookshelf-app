import Book from "../models/Book.js";
import User from "../models/User.js";
import Bookshelf from "../models/Bookshelf.js";
import { StatusCodes } from "http-status-codes";
import bookshelf from "../models/Bookshelf.js";

// GET all books in library
const getLibrary = async (req, res) => {
	const library = await Book.find({ user: req.user.userID });
	res.status(StatusCodes.OK).json({ library });
};

// POST add single book from req.body object
const addBookToLibrary = async (req, res) => {
	// retrieve user (using user obj we created when authenticating) with populated list of books in library

	console.log(req.user.userID);
	const user = await User.findById(req.user.userID).populate("library");
	// destructure user for library variable
	const { library } = user;
	// check if book is already in library, if so send error is response
	const duplicateBook = library.find(book => book.title === req.body.title);
	if (duplicateBook) {
		return res.status(StatusCodes.BAD_REQUEST).json({ msg: "book already in library!" });
	}
	// create new book object
	const newBook = await Book.create({ ...req.body, user: req.user.userID });
	// update user's library with new book added
	const updatedLibrary = library.push(newBook);
	// update user obj in database with updated library
	await User.findByIdAndUpdate(req.user.userID, { ...user, library: { updatedLibrary } });
	res.status(StatusCodes.CREATED).json({ updatedLibrary });
};

// PATCH book details from req.body
const updateBookDetails = async (req, res) => {
	const book = await Book.findByIdAndUpdate(req.params.id, req.body);
	res.status(StatusCodes.OK).json({ msg: `${book.title} successfully updated` });
};

// DELETE book from library using params
const removeBookFromLibrary = async (req, res) => {

	const book = await Book.findById(req.params.id);
	const { inBookshelves } = book;

	// get all Bookshelves, then get [books] from each bookshelf and filter to not include deleted book,
	// -then update Bookshelf in mongoDB
	const newBookshelfIDs = inBookshelves.map(async (bookshelfID) => {
		const bookshelf = await Bookshelf.findById(bookshelfID);
		const { books } = bookshelf;
		const updatedBooks = books.filter(book => book._id !== req.params.id);
		await Bookshelf.findByIdAndUpdate(bookshelfID, { ...bookshelf, books: updatedBooks });
	});

	const user = User.findById(req.user.id);
	const updatedLibrary = user.library.map(book => book._id !== req.params.id);

	await User.findByIdAndUpdate(req.user.id, { ...user, library: updatedLibrary });
	await Book.findByIdAndDelete(req.params.id);

	res.status(StatusCodes.OK).json({ msg: `${book.title} successfully removed from library` });
};

export { getLibrary, addBookToLibrary, updateBookDetails, removeBookFromLibrary };
