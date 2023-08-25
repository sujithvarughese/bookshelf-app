import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { CardModal } from "./";
import { AddBookToBookshelfBtn, RemoveFromLibraryBtn, EditBookBtn } from "./buttons/index.js";


const Card = (book) => {

	const {
		user,
		_id,
		title,
		authors,
		coverID,
		infoURL,
		previewAvailable,
		previewURL,
		firstPublishYear,
		status,
		userRating,
		notes,
		bookshelf,
		bookshelfName
	} = book;

	const { displayAlert, showAlert, updateBookDetails, removeBookFromBookshelf } = useGlobalContext();

	// in general view, user should only see cover, title, and author(s)
	// in detailed view, user should see full book details
	const [showDetails, setShowDetails] = useState(false);

	//---------------------update book---------------------//
	const [editMode, setEditMode] = useState(false);
	// to edit book
	const [values, setValues] = useState({ ...book });

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		updateBookDetails(_id, values);
		setEditMode(false);
	};
	//-----------------------------------------------------//


	/*
	 */

	return (
		<div className="card">
			<div className="cover">

				<div className="py-8">
					<img
						className="h-64 w-40 mx-auto rounded-lg shadow-md"
						src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`}
						alt={title} onClick={() => setShowDetails(!showDetails)}
					/>
				</div>

			</div>

			<div className="author">
				{
					authors.map((author, index) => {
						return <div key={index}>{author}</div>;
					})
				}
			</div>

			<div className="year">
				{firstPublishYear}
			</div>

			<div className="card-buttons">
			</div>

			{
				showDetails &&
				<CardModal book={book} setShowDetails={setShowDetails} />
			}


		</div>

	);
};

export default Card;