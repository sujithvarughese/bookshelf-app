import Bookshelf from "../models/Bookshelf.js";
import { StatusCodes } from "http-status-codes";

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
	const bookshelf = await Bookshelf.findById(req.params.id).populate("books");
	const { books } = bookshelf;
	// make sure book not in bookshelf by comparing book._id (stored in req.body.bookID) with books in bookshelf
	// (bookshelf.books is a list of book._id (representing Book objects)
	if (books.includes(req.body.book)) {
		res.status(StatusCodes.BAD_REQUEST).json({ msg: "book already in bookshelf!" });
	}

	bookshelf.books.push(req.body.book);
	await Bookshelf.findByIdAndUpdate(req.params.id, { ...bookshelf, books: [...bookshelf.books] });
	res.status(StatusCodes.OK).json({ bookshelf });
};
// PATCH - update existed bookshelf by deleting book from [books] in Bookshelf object
const removeBookFromBookshelf = async (req, res) => {
	const bookshelf = await Bookshelf.findById(req.params.id).populate("books");
	const { books } = bookshelf

	const updatedBookList = books.filter(book => book._id.valueOf() !== req.body.book);
	const updatedBookshelf = await Bookshelf.findByIdAndUpdate(
		req.params.id,
		{
			...this,
			books: updatedBookList

		});
	res.status(StatusCodes.OK).json({ updatedBookshelf });
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
