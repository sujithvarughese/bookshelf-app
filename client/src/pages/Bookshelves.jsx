import { useState } from "react";
import NewBookshelfForm from "../components/forms/NewBookshelfForm.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import Bookshelf from "../components/Bookshelf.jsx";

const Bookshelves = () => {

	const { bookshelves } = useGlobalContext()

	return (
		<div>

			<NewBookshelfForm />

			{
				bookshelves?.map(bookshelf => {
					return (
						<div key={bookshelf._id}>
							<Bookshelf {...bookshelf}/>}
						</div>
					)

				})
			}



		</div>
	);
};

export default Bookshelves;