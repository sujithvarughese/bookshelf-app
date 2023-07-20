import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { AddBookToBookshelfBtn, RemoveFromLibraryBtn } from "./buttons/index.js";

const BookBookshelf = (book) => {

	const { title, authors, coverID } = book
	const [showDetails, setShowDetails] = useState(false)

	return (
		<div>

			<img className="cover" src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`} alt={title}/>

			<div className="title" onClick={()=>setShowDetails(!showDetails)}>{title}</div>

			<div className="authors">
				{
					authors.map((author, index) => {
						return <div key={index}>{author}</div>;
					})
				}
			</div>

			{ showDetails && <BookDetails {...book}/>}
		</div>
	)
};

const BookDetails = (book) => {
	const { _id, firstPublishYear, subject, genre, pages, status, rating, userRating, notes } = book
	const { bookshelves, removeBookFromLibrary, addBookToBookshelf } = useGlobalContext();


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

				{ bookshelves.length > 0 && <AddBookToBookshelfBtn bookID={{_id}}/> }
			</div>
		</div>
	);
}

export default BookBookshelf;
