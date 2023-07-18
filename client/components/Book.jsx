import ax from "../src/utils/ax.jsx";
import { useEffect, useState } from "react";

const Book = (book) => {

	const { cover_id } = book

	return (
		<div>
			<img src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`}/>
			<div>{book.title}</div>
			<div>
				{
					book.authors.map(author => {
						return (
							<div key={author.name}>{author.name}</div>
						)
					})
				}
			</div>
		</div>
	);
};

export default Book;