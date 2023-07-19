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

	//----- create bookshelf -----//
	if (action.type === CREATE_BOOKSHELF_BEGIN) {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === CREATE_BOOKSHELF_SUCCESS) {
		return {
			...state,
			isLoading: false
		}
	}
	if (action.type === CREATE_BOOKSHELF_ERROR) {
		return {
			...state,
			isLoading: false
		}
	}

	throw new Error(`No such action: ${action.type}`)
};

export default reducer;