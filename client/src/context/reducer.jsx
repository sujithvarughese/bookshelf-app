import { initialState } from "./GlobalContext.jsx";
import { GET_LIBRARY } from "./actions.jsx";

const reducer = (state, action) => {

	if (action.type === GET_LIBRARY) {
		return {
			...state,
			library: action.payload.library
		}
	}

	throw new Error(`No such action: ${action.type}`)
};

export default reducer;