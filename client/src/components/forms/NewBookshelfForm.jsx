import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";
import bookshelfImages from "../../assets/images/bookshelves/index.js";
import { Alert } from "..";

const initialState = {
	name: "",
	books: [],
	cover: null,
	notes: ""
};
const NewBookshelfForm = () => {

	const { createBookshelf, showAlert } = useGlobalContext();
	// state for search values as user types
	const [values, setValues] = useState(initialState);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const img = bookshelfImages[Math.floor(Math.random() * bookshelfImages.length)];
		createBookshelf({ ...values, cover: img });
		setValues(initialState);
	};

	return (

		<form className="flex gap-6" onSubmit={handleSubmit}>
			<input
				className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				name="name"
				placeholder="New Bookshelf Name"
				value={values.name}
				onChange={handleChange}
			/>

			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
			        type="submit"
			>
				create bookshelf
			</button>
			{showAlert && <Alert />}
		</form>

	);
};

export default NewBookshelfForm;