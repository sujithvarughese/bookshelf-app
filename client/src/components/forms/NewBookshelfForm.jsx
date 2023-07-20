import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";
import bookshelfImages from "../../assets/images/bookshelves/index.js";

const initialState = {
	name: "",
	books: [],
	cover: null,
	notes: ""
}
const NewBookshelfForm = () => {

	const { createBookshelf } = useGlobalContext()
	// state for search values as user types
	const [values, setValues] = useState(initialState)

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const img = bookshelfImages[Math.floor(Math.random() * bookshelfImages.length)]
		createBookshelf({ ...values, cover: img })
		setValues(initialState)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label className="mt-3 block" htmlFor="name">bookshelf name</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					name="name"
					value={values.name}
					onChange={handleChange}
				/>
			</div>
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
			        type="submit"
			>
				create bookshelf
			</button>
		</form>
	);
};

export default NewBookshelfForm;