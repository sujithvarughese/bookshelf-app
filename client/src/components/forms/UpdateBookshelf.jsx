import { useState } from "react";
import bookshelfImages from "../../assets/images/bookshelves";
import { useGlobalContext } from "../../context/GlobalContext.jsx";

const UpdateBookshelf = (bookshelf) => {

	const { updateBookshelf } = useGlobalContext();

	const { _id, name, books, cover, notes } = bookshelf;

	const [values, setValues] = useState(bookshelf);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//const img = bookshelfImages[Math.floor(Math.random() * bookshelfImages.length)];
		updateBookshelf({ ...values, cover: img });

	};
	return (
		<form className="flex gap-6" onSubmit={handleSubmit}>
			<input
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				name="name"
				placeholder="New Bookshelf Name"
				value={values.name}
				onChange={handleChange}
			/>

			<button className="bg-teal-400 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
			        type="submit"
			>
				create bookshelf
			</button>
		</form>
	);
};

export default UpdateBookshelf;