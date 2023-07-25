import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";

const AddBookToBookshelfBtn = (book) => {

	const { bookshelves, addBookToBookshelf } = useGlobalContext();

	const [bookshelf, setBookshelf] = useState(bookshelves[0]?._id);

	const handleSubmit = (e) => {
		e.preventDefault();
		addBookToBookshelf(book._id, bookshelf);
	};

	return (
		<div>
			<form className="flex flex-col gap-2 z-10" onSubmit={handleSubmit}>
				<select
					className="mx-auto"
					id="bookshelfAdd"
					value={bookshelf}
					onChange={(e) => setBookshelf(e.target.value)}
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
							);
						})
					}
				</select>

				<button
					type="submit"
					className="bg-teal-400 w-36 z-40 hover:z-50 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				>add to bookshelf
				</button>

			</form>
		</div>
	);
};

export default AddBookToBookshelfBtn;