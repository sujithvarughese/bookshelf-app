import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.jsx";
import { axDB } from "../utils/ax.jsx";

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	GET_LIBRARY_BEGIN,
	GET_LIBRARY_SUCCESS,
	GET_LIBRARY_ERROR,
	GET_BOOKSHELVES_BEGIN,
	GET_BOOKSHELVES_SUCCESS,
	GET_BOOKSHELVES_ERROR,
	GET_BOOKSHELF_BEGIN,
	GET_BOOKSHELF_SUCCESS,
	GET_BOOKSHELF_ERROR
} from "./actions.jsx";


const initialState = {
	alertText: "",
	alertStyle: "",
	showAlert: false,
	library: [],
	bookshelves: [],
	currentBookshelf: [],
	isLoading: false
};

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState);

	// alert text, styles, and time in ms to be displayed
	const displayAlert = (alertText, style, ms) => {
		dispatch({
			type: DISPLAY_ALERT,
			payload: { alertText, style }
		});
		clearAlert(ms);
	};

	const clearAlert = (ms) => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, ms);
	};

	//----- library -----//
	const getLibrary = async () => {
		dispatch({ type: GET_LIBRARY_BEGIN });
		try {
			const response = await axDB("/library");
			const { library } = response.data;
			dispatch({
				type: GET_LIBRARY_SUCCESS,
				payload: { library }
			});
		} catch (error) {
			dispatch({
				type: GET_LIBRARY_ERROR,
				payload: { msg: error }
			});
		}
	};

	const addBookToLibrary = async (book) => {
		const { title, authors, cover_id, first_publish_year, subject } = book;
		try {
			await axDB.post("/library", {
				title: title,
				authors: authors.map(author => author.name),
				coverID: cover_id,
				firstPublishYear: first_publish_year,
				subject: subject
			});
			await getLibrary();
			displayAlert("Book added", "success", 1500);
		} catch (error) {
			displayAlert("Book count not be added", "failure", 1500);
			console.log(error);
		}
	};

	const updateBookDetails = async (id, book) => {
		try {
			await axDB.patch(`/library/${id}`, { ...book });
			await getLibrary();
		} catch (error) {
			console.log(error);
		}
	};

	const removeBookFromLibrary = async (id) => {
		try {
			await axDB.delete(`/library/${id}`);
			await getLibrary();
			await getAllBookshelves();
			displayAlert("Book removed", "success", 1500);
		} catch (error) {
			displayAlert("Book count not be removed", "failure", 1500);
			console.log(error);
		}
	};
	//----- bookshelves -----//
	const getAllBookshelves = async () => {
		dispatch({ type: GET_BOOKSHELVES_BEGIN });
		try {
			const response = await axDB("/bookshelves");
			const { bookshelves } = response.data;
			dispatch({
				type: GET_BOOKSHELVES_SUCCESS,
				payload: { bookshelves }
			});
		} catch (error) {
			dispatch({
				type: GET_BOOKSHELVES_ERROR,
				payload: { msg: error }
			});
		}
	};

	const getBookshelf = async (id) => {
		dispatch({ type: GET_BOOKSHELF_BEGIN });
		try {
			const response = await axDB(`/bookshelves/${id}`);
			const { bookshelf } = response.data;
			dispatch({
				type: GET_BOOKSHELF_SUCCESS,
				payload: { bookshelf }
			});
		} catch (error) {
			dispatch({
				type: GET_BOOKSHELF_ERROR,
				payload: { msg: error }
			});
		}
	};

	const createBookshelf = async (bookshelf) => {
		try {
			await axDB.post("/bookshelves", bookshelf);
			await getAllBookshelves();
			displayAlert("Bookshelf created", "success", 1500);

		} catch (error) {
			displayAlert("Bookshelf could not be created", "failure", 1500);
			console.log(error);
		}
	};

	const addBookToBookshelf = async (book, bookshelf) => {
		try {
			await axDB.patch(`/bookshelves/add/${bookshelf}`, { book });
			await getAllBookshelves();
			displayAlert("Book added to bookshelf", "success", 1500);
		} catch (error) {
			displayAlert("Book count not be added", "failure", 1500);
			console.log(error);
		}
	};

	const updateBookshelf = async (bookshelfID, bookshelf) => {
		try {
			await axDB.patch(`/bookshelves/${bookshelfID}`, bookshelf);
			await getAllBookshelves();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteBookshelf = async (bookshelfID) => {
		try {
			await axDB.delete(`/bookshelves/${bookshelfID}`);
			await getAllBookshelves();
		} catch (error) {
			console.log(error);
		}
	};

	const removeBookFromBookshelf = async (book, bookshelf) => {
		try {
			await axDB.patch(`/bookshelves/remove/${bookshelf}`, { book });
			await getAllBookshelves();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<GlobalContext.Provider value={
			{
				...state,
				displayAlert,
				clearAlert,
				getLibrary,
				addBookToLibrary,
				updateBookDetails,
				removeBookFromLibrary,
				getAllBookshelves,
				getBookshelf,
				createBookshelf,
				updateBookshelf,
				deleteBookshelf,
				addBookToBookshelf,
				removeBookFromBookshelf
			}
		}>
			{children}
		</GlobalContext.Provider>
	);
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext, initialState };