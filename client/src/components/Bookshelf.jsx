import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import { axDB } from "../utils/ax.jsx";

const Bookshelf = (bookshelf) => {

	const { cover, name, notes } = bookshelf;

	// user can choose to see extended details
	const [showBookshelfDetails, setShowBookshelfDetails] = useState(false);

	return (
		<div>

			<img src={cover} alt={name} width="300" height="300" />

			<div onClick={() => {
				setShowBookshelfDetails(!showBookshelfDetails);
			}}>
				{name}
			</div>

			<div>
				{notes}
			</div>

			{showBookshelfDetails && <BookshelfDetails {...bookshelf} />}

		</div>
	);
};

const BookshelfDetails = (bookshelf) => {

	const { _id } = bookshelf;
	const { removeBookFromBookshelf, bookshelves } = useGlobalContext();

	const [books, setBooks] = useState([]);

	useEffect(() => {
		const fetchBookshelf = async () => {
			try {
				const response = await axDB(`/bookshelves/${_id}`);
				const { bookshelf } = response.data;
				setBooks(bookshelf.books);
			} catch (error) {
				console.log(error);
			}
		};
		fetchBookshelf();
	}, [bookshelves]);

	return (
		<div>
			{
				books?.map((book, index) => {
					return (

						<div key={index}>
							{book.title}
							{book.authors.map(author => {
								return (
									<div key={author}>{author}</div>
								);
							})}
							<button name=""
							        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
							        onClick={() => removeBookFromBookshelf(book._id, _id)}
							>remove from bookshelf
							</button>

						</div>
					);
				})
			}
		</div>
	);

};

export default Bookshelf;