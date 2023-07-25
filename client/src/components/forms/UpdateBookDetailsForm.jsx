import { useGlobalContext } from "../../context/GlobalContext.jsx";
import bookshelfImages from "../../assets/images/bookshelves/index.js";
import { useState } from "react";
import { FormRowSelect, updateBookDetailsForm } from "./index.js";
import { FormRow } from "./index.js";
import { Form } from "react-router-dom";


const UpdateBookDetailsForm = (book) => {

	const { updateBookDetails } = useGlobalContext();
	const [values, setValues] = useState(...book)

	const { title, authors, coverID, firstPublishYear, subject, genre, pages, status, rating, userRating, notes } = book;

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log({ ...book, values });
		//updateBookDetails({ ...book, values });
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="text-4xl m-8">Edit Book details</div>

			<div className="m-10 space-y-10">

				<div>
					<img
						className="h-64 w-40 mx-auto rounded-lg shadow-md"
						src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`}
						alt={title} />
				</div>


				<div className="text-2xl leading-tight py-2 hover:cursor-pointer hover:text-teal-800">{title}</div>

				<div className="text-gray-500">
					{
						authors.map((author, index) => {
							return <div key={index}>{author}</div>;
						})
					}
				</div>

				<div>
					Year published: {firstPublishYear}
				</div>

				<FormRow labelText="genre" placeholder="genre" type="text" name="genre" value={values.genre}
				         handleChange={handleChange} />

				<FormRow labelText="notes" placeholder="notes" type="text" name="notes" value={values.notes}
				         handleChange={handleChange} />

				<FormRowSelect labelText="status" name="status" value={values.status} list={["read", "unread", "reading"]}
				               handleChange={handleChange}></FormRowSelect>

				<FormRowSelect labelText="my rating" name="userRating" value={values.userRating}
				               list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} handleChange={handleChange}></FormRowSelect>

				<button
					className="bg-teal-400 hover:bg-blue-700 hover:z-50 text-white font-bold py-2 px-2 rounded text-xs"
					type="submit"
				>update book details
				</button>
			</div>
		</form>

	);
};

export default UpdateBookDetailsForm;