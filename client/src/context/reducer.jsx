import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	REGISTER_USER_BEGIN,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_ERROR,
	LOGIN_USER_BEGIN,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR,
	LOGOUT_USER,
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

import { initialState } from "./GlobalContext.jsx";

const reducer = (state, action) => {

	//----- alerts -----//
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			alertType: action.payload.alertStyle,
			alertText: action.payload.alertText,
			showAlert: true
		};
	}
	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertStyle: "",
			alertText: ""
		};
	}

	//----- register -----//
	if (action.type === REGISTER_USER_BEGIN) {
		return {
			...state,
			isLoading: true
		};
	}
	if (action.type === REGISTER_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			isLoading: false
		};
	}
	if (action.type === REGISTER_USER_ERROR) {
		return {
			...state,
			isLoading: false
		};
	}

	//----- login -----//
	if (action.type === LOGIN_USER_BEGIN) {
		return {
			...state,
			isLoading: true
		};
	}
	if (action.type === LOGIN_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			isLoading: false
		};
	}
	if (action.type === LOGIN_USER_ERROR) {
		return {
			...state,
			isLoading: false
		};
	}

	//----- login -----//
	if (action.type === LOGOUT_USER) {
		return {
			...initialState
		};
	}

	//----- get library (get all books) -----//
	if (action.type === GET_LIBRARY_BEGIN) {
		return {
			...state,
			isLoading: true
		};
	}
	if (action.type === GET_LIBRARY_SUCCESS) {
		return {
			...state,
			library: action.payload.library,
			isLoading: false
		};
	}
	if (action.type === GET_LIBRARY_ERROR) {
		return {
			...state,
			isLoading: false
		};
	}
	//----- get all bookshelves -----//
	if (action.type === GET_BOOKSHELVES_BEGIN) {
		return {
			...state,
			isLoading: true
		};
	}
	if (action.type === GET_BOOKSHELVES_SUCCESS) {
		return {
			...state,
			bookshelves: action.payload.bookshelves,
			isLoading: false
		};
	}
	if (action.type === GET_BOOKSHELVES_ERROR) {
		return {
			...state,
			isLoading: false
		};
	}

//----- get single bookshelves (w/ populated books)-----//
	if (action.type === GET_BOOKSHELF_BEGIN) {
		return {
			...state,
			isLoading: true
		};
	}
	if (action.type === GET_BOOKSHELF_SUCCESS) {
		return {
			...state,
			bookshelf: action.payload.bookshelf,
			isLoading: false
		};
	}
	if (action.type === GET_BOOKSHELF_ERROR) {
		return {
			...state,
			isLoading: false
		};
	}


	throw new Error(`No such action: ${action.type}`);
};

export default reducer;