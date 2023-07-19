import Bookshelf from "../models/Bookshelf.js";
import { StatusCodes } from "http-status-codes";

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

// PATCH - update existed bookshelf by adding book from library
const addBookToBookshelf = async (req, res) => {
	const { id } = req.params
	const bookshelf = Bookshelf.findById(id)
	if (bookshelf.books.some(book => book.title === req.params.title)) {
		res.status(StatusCodes.BAD_REQUEST).json({ msg: 'BookAPI already in bookshelf!'})
	}
	bookshelf.push(req.body)
	bookshelf.save()
	res.status(StatusCodes.OK).json({ bookshelf });
}

// DELETE bookshelf
const deleteBookshelf = async (req, res) => {
	const { id } = req.params;
	const bookshelf = await Bookshelf.findByIdAndDelete(id)
	res.status(StatusCodes.OK).json({ msg: `${bookshelf.name} successfully deleted` })
};

export { getAllBookshelves, getSingleBookshelf, addBookToBookshelf, deleteBookshelf };
