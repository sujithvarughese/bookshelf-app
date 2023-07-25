import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import { axDB } from "../utils/ax.jsx";

const Bookshelf = (bookshelf) => {

	const { cover, name, notes } = bookshelf;

	// user can choose to see extended details
	const [showBookshelfDetails, setShowBookshelfDetails] = useState(false);

	return (
		<div
			className="hover:bg-gray-200 m-6 bg-white hover:z-0 rounded-lg overflow-hidden shadow-lg py-8 xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2">

			<div>
				<img className="mx-auto rounded-lg p-3" src={cover} alt={name} />
			</div>


			<div className="text-2xl leading-tight py-2 hover:cursor-pointer hover:text-teal-800" onClick={() => {
				setShowBookshelfDetails(!showBookshelfDetails);
			}}>
				{name}
			</div>

			<div>
				{notes}
			</div>
			<div>
				{showBookshelfDetails && <BookshelfDetails {...bookshelf} />}
			</div>


		</div>
	);
};

const BookshelfDetails = (bookshelf) => {

	const { _id } = bookshelf;
	const { removeBookFromBookshelf, deleteBookshelf, bookshelves } = useGlobalContext();

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

			<div>
				<button name=""
				        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				        onClick={() => deleteBookshelf(_id)}
				>delete bookshelf
				</button>
			</div>
		</div>
	);

};

export default Bookshelf;