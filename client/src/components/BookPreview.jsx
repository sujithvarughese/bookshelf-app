import { useEffect, useState } from "react";
import { axDB } from "../utils/ax.jsx";

const BookPreview = ({ title, authors, cover_id }) => {

	const addBookToLibrary = async () => {
		console.log('adding to library')
		try {
			const response = await axDB.post("/library/add",
				{
					title: title,
					authors: authors.map(author => author.name),
					coverID: cover_id
				}
			)
			if (response.data.msg === 'book already exists!') {
				console.log('book already in library!');
			}
		} catch (error) {
			console.log(error);
		}
	}

	const removeBookFromLibrary = async () => {

	}

	const updateBookDetails = async () => {

	}

	return (
		<div>
			<img src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`} />
			<div>{title}</div>
			<div>
				{authors?.map((author) => {
					return <div key={author.name}>{author.name}</div>;
				})}
			</div>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				onClick={addBookToLibrary}
			>add to library
			</button>

		</div>
	);
};

export default BookPreview;
