import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";
import bookshelfImages from "../../../public/index.js";

const initialState = {
	name: "",
	books: [],
	cover: null,
	notes: ""
};
const NewBookshelfForm = () => {

	const { createBookshelf, displayAlert } = useGlobalContext();
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
			<label htmlFor="name" className="form-label ">Create new bookshelf: </label>
			<input
				className="form-input"
				type="text"
				name="name"
				placeholder="New Bookshelf Name"
				value={values.name}
				onChange={handleChange}
			/>

			<button className="btn"
			        type="submit"
			>
				create!
			</button>
		</form>

	);
};

export default NewBookshelfForm;