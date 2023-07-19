import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import bookshelfImages from "../assets/images/bookshelves";

const initialState = {
	name: "",
	books: [],
	cover: null,
	notes: ""
}

const BookshelfForm = ({ setShowCreateBookshelfForm }) => {

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
		setShowCreateBookshelfForm(false)
	}

	return (
		<div className="flex gap-2 ml-8">
			<form className="gap-6 mx-auto" onSubmit={handleSubmit}>
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
				<div className="">
					<label htmlFor="notes">Notes</label>
					<textarea
						name="notes"
						rows={5}
						cols={50}
						value={values.notes}
						onChange={handleChange}>
					</textarea>
				</div>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				        type="submit"
				>
					create bookshelf
				</button>

			</form>
		</div>
	);
};

export default BookshelfForm;