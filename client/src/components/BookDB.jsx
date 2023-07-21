import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useState } from "react";
import { AddBookToBookshelfBtn, RemoveFromLibraryBtn } from "./buttons/index.js";
import { Alert } from "../components";

const BookDB = (book) => {

	const { title, authors, coverID } = book;

	// in general view, user should only see cover, title, and author(s)
	// in detailed view, user should see full book details
	const [showDetails, setShowDetails] = useState(false);

	return (
		<div>

			<img className="cover" src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`} alt={title} />

			<div className="title" onClick={() => setShowDetails(!showDetails)}>{title}</div>

			<div className="authors">
				{
					authors.map((author, index) => {
						return <div key={index}>{author}</div>;
					})
				}
			</div>

			{showDetails && <BookDetails {...book} />}
		</div>
	);

};

// component will render if user clicks book title to display book details
const BookDetails = (book) => {

	const { _id, firstPublishYear, subject, genre, pages, status, rating, userRating, notes } = book;
	const { bookshelves, showAlert } = useGlobalContext();


	return (
		<div className="flex flex-col gap-4 my-4">
			<div>
				Year published: {firstPublishYear}
			</div>
			<div>
				Subject: {subject}
			</div>
			<div>
				{genre}
				{pages}
				{status}
				{rating}
				{userRating}
				{notes}
			</div>

			<div className="buttons">
				<RemoveFromLibraryBtn bookID={_id} />

				{<AddBookToBookshelfBtn bookID={{ _id }} />}
			</div>

			{showAlert && <Alert />}
		</div>
	);
};

export default BookDB;
