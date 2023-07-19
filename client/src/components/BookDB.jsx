
import { useGlobalContext } from "../context/GlobalContext.jsx";

const BookDB = ({ _id, title, authors, coverID, firstPublishYear, subject, genre, pages, status, rating, userRating, notes }) => {

	const { removeBookFromLibrary, addBookToBookshelf } = useGlobalContext();


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
				>add to library
				</button>

				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					onClick={()=>addBookToBookshelf(_id)}
				>add to bookshelf
				</button>
			</div>

		</div>
	);
};

export default BookDB;
