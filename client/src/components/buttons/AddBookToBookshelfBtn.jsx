import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";

const AddBookToBookshelfBtn = ({ bookID }) => {

	const { bookshelves, addBookToBookshelf } = useGlobalContext()

	const [bookshelf, setBookshelf] = useState(bookshelves[0]?._id)

	const handleSubmit = (e) => {
		e.preventDefault()
		addBookToBookshelf(bookID, bookshelf)
	}


	return (
		<div>
			<form onSubmit={handleSubmit}>
				<select
					id="bookshelfAdd"
					value={bookshelf}
					onChange={(e)=>setBookshelf(e.target.value)}
				>
					{
						bookshelves.map((bookshelf, index) => {
							return (
								<option
									key={index}
									value={bookshelf._id}
								>
									{bookshelf.name}
								</option>
							)
						})
					}
				</select>

				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				>add to bookshelf
				</button>

			</form>
		</div>
	);
};

export default AddBookToBookshelfBtn;