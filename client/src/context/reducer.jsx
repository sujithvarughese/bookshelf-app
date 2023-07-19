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
} from "./actions.jsx";

const reducer = (state, action) => {
	//----- get library (get all books) -----//
	if (action.type === GET_LIBRARY_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === GET_LIBRARY_SUCCESS) {
		return {
			...state,
			library: action.payload.library,
			isLoading: false
		}
	}
	if (action.type === GET_LIBRARY_ERROR) {
		return {
			...state,
			isLoading: false
		}
	}
	//----- get all bookshelves -----//
	if (action.type === GET_BOOKSHELVES_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === GET_BOOKSHELVES_SUCCESS) {
		return {
			...state,
			bookshelves: action.payload.bookshelves,
			isLoading: false
		}
	}
	if (action.type === GET_BOOKSHELVES_ERROR) {
		return {
			...state,
			isLoading: false
		}
	}

//----- get single bookshelves (w/ populated books)-----//
	if (action.type === GET_BOOKSHELF_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === GET_BOOKSHELF_SUCCESS) {
		return {
			...state,
			bookshelf: action.payload.bookshelf,
			isLoading: false
		}
	}
	if (action.type === GET_BOOKSHELF_ERROR) {
		return {
			...state,
			isLoading: false
		}
	}


	throw new Error(`No such action: ${action.type}`)
};

export default reducer;