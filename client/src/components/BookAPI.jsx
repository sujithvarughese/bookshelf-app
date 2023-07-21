import { useEffect, useState } from "react";
import { axDB } from "../utils/ax.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { Alert } from "../components";

const BookAPI = (book) => {
	const { title, authors, cover_id } = book;

	const { addBookToLibrary, library, showAlert } = useGlobalContext();
	const [showDetails, setShowDetails] = useState(false);

	return (
		<div>
			<img className="cover" src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`} alt={title} />
			<div className="title" onClick={() => setShowDetails(!showDetails)}>{title}</div>
			<div className="authors">
				{
					authors.map((author, index) => {
						return <div key={index}>{author.name}</div>;
					})
				}
			</div>

			{showDetails && <BookDetails {...book} />}

			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				onClick={() => addBookToLibrary(book)}
			>add to library
			</button>

			{showAlert && <Alert />}

		</div>
	);
};

const BookDetails = (book) => {
	const { first_publish_year, subject } = book;

	const { addBookToLibrary } = useGlobalContext();

	return (

		<div>

		</div>
	);
};

export default BookAPI;
