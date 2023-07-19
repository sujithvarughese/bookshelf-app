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
		const response = await axDB("/library")
		const { library } = response.data
		dispatch({
			type: GET_LIBRARY,
			payload: { library }
		})
	}

	return (
		<GlobalContext.Provider value={
			{
				...state,
				getLibrary
			}
		}>
			{ children }
		</GlobalContext.Provider>
	);
};

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState };