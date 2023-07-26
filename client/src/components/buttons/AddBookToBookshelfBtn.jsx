import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";

const AddBookToBookshelfBtn = ({ bookID }) => {

	// load bookshelves for form
	const { bookshelves, addBookToBookshelf } = useGlobalContext();

	// state for option select in form
	const [bookshelfID, setBookshelfID] = useState(bookshelves[0]._id);

	const handleSubmit = (e) => {
		e.preventDefault();

		addBookToBookshelf(bookID, bookshelfID);
	};


	return (
		<div className="">
			<form className="flex gap-2 mx-2 justify-between" onSubmit={handleSubmit}>

				<label className="text-sm">Add to bookshelf</label>

				<select
					className="border-2 h-8"
					name="bookshelf"
					value={bookshelfID}
					onChange={(e) => setBookshelfID(e.target.value)}
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
					className="bg-teal-400 h-8 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				>Add
				</button>

			</form>
		</div>
	);
};

export default AddBookToBookshelfBtn;