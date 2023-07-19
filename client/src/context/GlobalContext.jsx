import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.jsx"
import { axAPI, axDB } from "../utils/ax.jsx";

import {
	GET_LIBRARY_BEGIN,
	GET_LIBRARY_SUCCESS,
	GET_LIBRARY_ERROR,
	GET_BOOKSHELVES_BEGIN,
	GET_BOOKSHELVES_SUCCESS,
	GET_BOOKSHELVES_ERROR,
	GET_BOOKSHELF_BEGIN,
	GET_BOOKSHELF_SUCCESS,
	GET_BOOKSHELF_ERROR,
} from "./actions.jsx"
import bookshelf from "../components/Bookshelf.jsx";

const initialState = {
	library: [],
	bookshelves: [],
	isLoading: false
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	//----- library -----//
	const getLibrary = async () => {
		dispatch({ type: GET_LIBRARY_BEGIN })
		try {
			const response = await axDB("/library")
			const { library } = response.data
			dispatch({
				type: GET_LIBRARY_SUCCESS,
				payload: { library }
			})
		} catch (error) {
			dispatch({
				type: GET_LIBRARY_ERROR,
				payload: { msg: error }
			})
		}
	}

	const addBookToLibrary = async (book) => {
		const { title, authors, cover_id, first_publish_year, subject } = book
		try {
			await axDB.post("/library", {
					title: title,
					authors: authors.map(author => author.name),
					coverID: cover_id,
					firstPublishYear: first_publish_year,
					subject: subject
			})
			getLibrary()
		} catch (error) {
			console.log(error);
		}
	}

	const updateBookDetails = async (id, book) => {
		try {
			await axDB.patch(`/library/${id}`, { ...book })
			getLibrary()
		} catch (error) {
			console.log(error);
		}
	}

	const removeBookFromLibrary = async (id) => {
		try {
			await axDB.delete(`/library/${id}`)
			getLibrary()
		} catch (error) {
			console.log(error);
		}
	}
	//----- bookshelves -----//
	const getAllBookshelves = async () => {
		dispatch({ type: GET_BOOKSHELVES_BEGIN })
		try {
			const response = await axDB('/bookshelves')
			const { bookshelves } = response.data
			dispatch({
				type: GET_BOOKSHELVES_SUCCESS,
				payload: { bookshelves }
			})
		} catch (error) {
			dispatch({
				type: GET_BOOKSHELVES_ERROR,
				payload: { msg: error }
			})
		}
	}

	const getBookshelf = async (id) => {
		dispatch({ type: GET_BOOKSHELF_BEGIN })
		try {
			const response = await axDB(`/bookshelves/${id}`)
			const { bookshelf } = response.data
			dispatch({
				type: GET_BOOKSHELF_SUCCESS,
				payload: { bookshelf }
			})
		} catch (error) {
			dispatch({
				type: GET_BOOKSHELF_ERROR,
				payload: { msg: error }
			})
		}
	}

	const createBookshelf = async (bookshelf) => {
		try {
			await axDB.post('/bookshelves', bookshelf)
			getAllBookshelves()

		} catch (error) {
			console.log(error);
		}
	}

	const addBookToBookshelf = async (bookID, bookshelf) => {
		try {
			await axDB.patch(`/bookshelves/${bookshelf}`, { bookID })
			getAllBookshelves()
		} catch (error) {
			console.log(error);
		}
	}

	const removeBookFromBookshelf = async (bookID, bookshelf) => {
		const updatedBookshelf = bookshelf.books.filter(book => book._id !== bookID)
		try {
			await axDB.patch(`/bookshelves/${bookshelf}`, updatedBookshelf)
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<GlobalContext.Provider value={
			{
				...state,
				getLibrary,
				addBookToLibrary,
				updateBookDetails,
				removeBookFromLibrary,
				getAllBookshelves,
				getBookshelf,
				createBookshelf,
				addBookToBookshelf,
			}
		}>
			{ children }
		</GlobalContext.Provider>
	);
};

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState };