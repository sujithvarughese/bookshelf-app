import { useEffect, useState } from "react";
import { axDB } from "../utils/ax.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";

const BookAPI = (book) => {

	const { title, authors, cover_id, first_publish_year, subject } = book

	const { addBookToLibrary } = useGlobalContext();

	return (
		<div>
			<img src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`} alt={title}/>
			<div>{title}</div>
			<div>
				{
					authors.map((author, index) => {
						return <div key={index}>{author.name}</div>;
					})
				}
			</div>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				onClick={addBookToLibrary(book)}
			>add to library
			</button>

		</div>
	);
};

export default BookAPI;
