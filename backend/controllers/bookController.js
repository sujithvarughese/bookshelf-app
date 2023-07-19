import Book from "../models/Book.js";
import { StatusCodes } from "http-status-codes";

// GET all books in library (unpopulated)
const getAllBooks = async (req, res) => {
  const library = await Book.find();
  res.status(StatusCodes.OK).json({ library });
};

// POST add single book from req.body object
const addBookToLibrary = async (req, res) => {
  const book = await Book.findOne({ title: req.body.title })
  if (book) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'book already exists!'})
  }
  await Book.create(req.body)
  const library = await Book.find()
  res.status(StatusCodes.CREATED).json({ library })
};

// PATCH book details from req.body
const updateBookDetails = async (req, res) => {
  const book = await Book.findOne({ key: req.body.key })
  if (!book) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'book not found!'})
  }
  await Book.findByIdAndUpdate({ key: req.body.key }, req.body)
  res.status(StatusCodes.OK).json({ msg: `${req.body.title || book.title} successfully updated` })
}

// DELETE book from library using params
const removeBookFromLibrary = async (req, res) => {
  const { id } = req.params
  const book = await Book.findByIdAndDelete(id)
  res.status(StatusCodes.OK).json({ msg: `${book.title} successfully removed from library` })
}

export { getAllBooks, addBookToLibrary, updateBookDetails, removeBookFromLibrary };
