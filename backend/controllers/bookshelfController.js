import Bookshelf from "../models/Bookshelf.js";
import Book from "../models/Book.js";
import { StatusCodes } from "http-status-codes";

// GET all bookshelves (unpopulated)
const getAllBookshelves = async (req, res) => {
	const bookshelves = await Bookshelf.find();
	res.status(StatusCodes.OK).json({ bookshelves });
};

// GET single populated bookshelf
const getBookshelf = async (req, res) => {
	const { id } = req.params
	const bookshelf = await Bookshelf.findById(id)
	res.status(StatusCodes.OK).json({ bookshelf });
}
// POST new bookshelf
const createBookshelf = async (req, res) => {
	const bookshelf = await Bookshelf.create(req.body)
	res.status(StatusCodes.CREATED).json({ bookshelf })
}
// PATCH update bookshelf details
const updateBookshelf = async (req, res) => {
	const bookshelf = await Bookshelf.findByIdAndUpdate(req.params.id, req.body)
	res.status(StatusCodes.OK).json({ bookshelf })
}

// DELETE bookshelf
const deleteBookshelf = async (req, res) => {
	const { id } = req.params;
	const bookshelf = await Bookshelf.findByIdAndDelete(id)
	res.status(StatusCodes.OK).json({ msg: `${bookshelf.name} successfully deleted` })
};

// PATCH - update existed bookshelf by adding book into bookshelf.books list
const addBookToBookshelf = async (req, res) => {
	const bookshelf = await Bookshelf.findById(req.params.id).populate('books')
	console.log(req.params.id);
	console.log(req.body.bookID);
	const { books } = bookshelf
	console.log(books);
	// make sure book not in bookshelf by comparing book._id (stored in req.body.bookID) with books in bookshelf (bookshelf.books is a list of book._id (representing Book objects)
	if (books.includes(req.body.bookID)) {
		res.status(StatusCodes.BAD_REQUEST).json({ msg: 'book alrady in bookshelf!'})
	}

	bookshelf.books.push(req.body.bookID)
	await Bookshelf.findByIdAndUpdate(req.params.id, { bookshelf })
	res.status(StatusCodes.OK).json({ bookshelf });
}
// PATCH - update existed bookshelf by deleting book from [books] in Bookshelf object
const removeBookFromBookshelf = async (req, res) => {
	console.log(req.params);
	console.log(req.body.bookID);
	const bookshelf = await Bookshelf.findById(req.params.id)
	const updatedBookshelf = bookshelf.books.filter(book => book !== req.body.bookID)
	await Bookshelf.findByIdAndUpdate(req.params.id, { updatedBookshelf })
	res.status(StatusCodes.OK).json({ updatedBookshelf });
}

export {
	getAllBookshelves,
	getBookshelf,
	createBookshelf,
	updateBookshelf,
	deleteBookshelf,
	addBookToBookshelf,
	removeBookFromBookshelf
 };
