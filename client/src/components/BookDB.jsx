import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useState } from "react";
import { AddBookToBookshelfBtn, RemoveFromLibraryBtn } from "./buttons/index.js";
import { Alert } from "../components";

// book when called from database
const BookDB = (book) => {

	const { title, authors, coverID } = book;

	// in general view, user should only see cover, title, and author(s)
	// in detailed view, user should see full book details
	const [user, showDetails, setShowDetails] = useState(false);

	return (
		<div
			className="hover:bg-gray-200 m-6 bg-white hover:z-0 rounded-lg overflow-hidden shadow-lg py-8 xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2"
		>

			<div>
				<img
					className="h-64 w-40 mx-auto rounded-lg shadow-md"
					src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`}
					alt={title} onClick={() => setShowDetails(!showDetails)} />
			</div>


			<div className="text-2xl leading-tight py-2 hover:cursor-pointer hover:text-teal-800"
			     onClick={() => setShowDetails(!showDetails)}>{title}</div>

			<div className="text-gray-500">
				{
					authors.map((author, index) => {
						return <div key={index}>{author}</div>;
					})
				}
			</div>
			<div>
				{showDetails && <BookDetails {...book} />}
			</div>


		</div>
	);

};

// component will render if user clicks book title to display book details
const BookDetails = (book) => {

	const { _id, firstPublishYear, status, userRating, notes, inBookshelf } = book;
	const { bookshelves, showAlert } = useGlobalContext();


	return (
		<div className="flex flex-col gap-4 my-4">
			<div>
				Year published: {firstPublishYear}
			</div>

			<div>
				{status}
				{userRating}
				{notes}
				{inBookshelf !== null && inBookshelf}
			</div>

			<div className="space-y-2">
				<RemoveFromLibraryBtn {...book} />

				<AddBookToBookshelfBtn {...book} />
			</div>

			{showAlert && <Alert />}
		</div>
	);
};

export default BookDB;
