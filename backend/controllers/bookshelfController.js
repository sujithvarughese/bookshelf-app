import Bookshelf from "../models/Bookshelf.js";
import { StatusCodes } from "http-status-codes";
import Book from "../models/Book.js";

// GET all bookshelves (unpopulated)
const getAllBookshelves = async (req, res) => {
	const bookshelves = await Bookshelf.find();
	res.status(StatusCodes.OK).json({ bookshelves });
};

// GET single populated bookshelf
const getSingleBookshelf = async (req, res) => {
	const { id } = req.params
	const bookshelf = Bookshelf.findById(id).populate('books')
	res.status(StatusCodes.OK).json({ bookshelf });
}
// POST new bookshelf
const createBookshelf = async (req, res) => {
	console.log(req.body.name);
	const bookshelf = await Bookshelf.create(req.body)
	res.status(StatusCodes.CREATED).json({ bookshelf })
}
// PATCH - update existed bookshelf by adding book from library
const addBookToBookshelf = async (req, res) => {
	const { id } = req.params
	const bookshelf = Bookshelf.findById(id)
	const bookToAdd = Book.findById(req.body.bookID)
	/*
	if (bookshelf.books.some(book => book.title === bookToAdd.title)) {
		res.status(StatusCodes.BAD_REQUEST).json({ msg: 'BookAPI already in bookshelf!'})
	}*/
	console.log(id);
	console.log(req.body.bookID);
	await Bookshelf.findByIdAndUpdate(id, { books: [...books, bookToAdd] })
	res.status(StatusCodes.OK).json({ bookshelf });
}

// DELETE bookshelf
const deleteBookshelf = async (req, res) => {
	const { id } = req.params;
	const bookshelf = await Bookshelf.findByIdAndDelete(id)
	res.status(StatusCodes.OK).json({ msg: `${bookshelf.name} successfully deleted` })
};

export { getAllBookshelves, getSingleBookshelf, createBookshelf, addBookToBookshelf, deleteBookshelf };
