import { useEffect, useState } from "react";
import { axDB } from "../utils/ax.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { Alert } from "../components";
import { AddBookToBookshelfBtn, RemoveFromLibraryBtn } from "./buttons/index.js";

// book when called from openlibrary api
const BookAPI = (book) => {
	const { title, authors, cover_id, first_publish_year } = book;

	const { user, addBookToLibrary, library, showAlert } = useGlobalContext();
	const [showDetails, setShowDetails] = useState(false);

	// add when pulling book summary -> {showDetails && <BookDetails {...book} />}
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
			<div>Year Published: {first_publish_year || "unknown"}</div>


			{
				user !== null &&
				<button
					className="bg-teal-400 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					onClick={() => addBookToLibrary(book)}
				>add to library
				</button>
			}

			{showAlert && <Alert />}

		</div>
	);
};

// component will render if user clicks book title to display book details
const BookDetails = (book) => {

	const { _id, firstPublishYear, subject, genre, pages, status, rating, userRating, notes } = book;
	const { user, bookshelves, showAlert } = useGlobalContext();
	console.log(book);


	return (
		<div className="flex flex-col gap-4 my-4">
			<div>
				Year published: {firstPublishYear}
			</div>

			<div>
				{genre}
				{pages}
				{status}
				{rating}
				{userRating}
				{notes}
			</div>


			{showAlert && <Alert />}
		</div>
	);
};

export default BookAPI;
