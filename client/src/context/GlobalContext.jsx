import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.jsx"
import { axAPI, axDB } from "../utils/ax.jsx";

import {
	GET_LIBRARY
} from "./actions.jsx"

const initialState = {
	library: []
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	const getLibrary = async () => {
		try {
			const response = await axDB("/library")
			const { library } = response.data
			dispatch({
				type: GET_LIBRARY,
				payload: { library }
			})
		} catch (error) {
			console.log('getLibrary error');
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

	const addBookToBookshelf = async () => {

	}



	return (
		<GlobalContext.Provider value={
			{
				...state,
				getLibrary,
				addBookToLibrary,
				removeBookFromLibrary,
				addBookToBookshelf,
			}
		}>
			{ children }
		</GlobalContext.Provider>
	);
};

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState };