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
	CREATE_BOOKSHELF_BEGIN,
	CREATE_BOOKSHELF_SUCCESS,
	CREATE_BOOKSHELF_ERROR
} from "./actions.jsx"
import bookshelfImages from "../assets/images/bookshelves/index.js";

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
				type: GET_LIBRARY_SUCCESS,
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
				type: GET_LIBRARY_SUCCESS,
				payload: { msg: error }
			})
		}
	}

	const createBookshelf = async (bookshelf) => {
		console.log(bookshelf);
		dispatch({ type: CREATE_BOOKSHELF_BEGIN })
		try {
			await axDB.post('/bookshelves', bookshelf)
			getAllBookshelves()
			dispatch({ type: CREATE_BOOKSHELF_SUCCESS })
		} catch (error) {
			dispatch({
				type: CREATE_BOOKSHELF_ERROR,
				payload: { msg: error }
			})
		}
	}

	const addBookToBookshelf = async (bookID, bookshelf) => {
		try {
			console.log(bookID);
			await axDB.patch(`/bookshelves/${bookshelf}`, { bookID })
			getAllBookshelves()
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
				removeBookFromLibrary,
				getAllBookshelves,
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