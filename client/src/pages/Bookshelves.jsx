import { useState } from "react";
import { BookshelfForm } from "../components";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import Bookshelf from "../components/Bookshelf.jsx";

const Bookshelves = () => {

	const { bookshelves } = useGlobalContext()

	const [showCreateBookshelfForm, setShowCreateBookshelfForm] = useState(false)


	return (
		<div>
			{
				showCreateBookshelfForm ?
				<div>
					<BookshelfForm setShowCreateBookshelfForm={setShowCreateBookshelfForm}/>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
						onClick={()=>setShowCreateBookshelfForm(false)}
					>
						cancel
					</button>
				</div>
					:
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					onClick={() => setShowCreateBookshelfForm(true)}
				>
					new bookshelf
				</button>
			}

			{
				bookshelves?.map(bookshelf => {
					return (
						<Bookshelf key={bookshelf._id} {...bookshelf} />
					)

				})
			}



		</div>
	);
};

export default Bookshelves;