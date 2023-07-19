
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useState } from "react";
import AddToBookshelfForm from "./AddToBookshelfForm.jsx";

const BookPreviewDB = ({ _id, title, authors, coverID }) => {

	const { removeBookFromLibrary, bookshelves } = useGlobalContext()


	return (
		<div>
			<img src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`} alt={title}/>
			<div>{title}</div>
			<div>
				{
					authors.map((author, index) => {
						return <div key={index}>{author}</div>;
					})
				}
			</div>
			<div>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					onClick={()=>removeBookFromLibrary(_id)}
				>remove from library
				</button>

				{ bookshelves.length > 0 && <AddToBookshelfForm bookID={_id}/> }

			</div>

		</div>
	);
};

export default BookPreviewDB;
