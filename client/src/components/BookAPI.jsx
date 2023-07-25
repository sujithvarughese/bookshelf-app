import { useEffect, useState } from "react";
import { axDB } from "../utils/ax.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { Alert } from "../components";
import { AddBookToBookshelfBtn, RemoveFromLibraryBtn } from "./buttons/index.js";

// book when called from openlibrary api
const BookAPI = (book) => {
	const { title, authors, cover_id, first_publish_year } = book;

	const { user, addBookToLibrary, library, getLibrary, showAlert } = useGlobalContext();
	// user can click to expand book details
	const [showDetails, setShowDetails] = useState(false);

	// to show alert and remove 'add to library' button
	const [addedToLibrary, setAddedToLibrary] = useState(false);

	const addBookAPI = () => {
		setAddedToLibrary(true);
		addBookToLibrary(book);
	};

	useEffect(() => {
		getLibrary();
	}, []);
	// add when pulling book summary -> {showDetails && <BookDetails {...book} />}
	return (
		<div
			className="hover:bg-gray-200 m-6 bg-white hover:z-0 rounded-lg overflow-hidden shadow-lg py-8 xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2">

			<div>
				<img className="h-64 w-40 mx-auto rounded-lg shadow-md"
				     src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`} alt={title} />
			</div>

			<div className="text-2xl leading-tight py-2 hover:cursor-pointer hover:text-teal-800"
			     onClick={() => setShowDetails(!showDetails)}>{title}
			</div>

			<div className="text-gray-500">
				{
					authors.map((author, index) => {
						return <div key={index}>{author.name}</div>;
					})
				}
			</div>
			<div className="pt-2">
				Year Published: {first_publish_year || "unknown"}
			</div>


			{
				user !== null && !addedToLibrary &&
				<button
					className="bg-teal-400 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					onClick={() => addBookAPI(book)}
				>add to library
				</button>
			}

			{showAlert && addedToLibrary && <Alert />}

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
