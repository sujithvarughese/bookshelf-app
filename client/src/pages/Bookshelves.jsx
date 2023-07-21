import { useEffect } from "react";
import NewBookshelfForm from "../components/forms/NewBookshelfForm.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { Bookshelf } from "../components";

const Bookshelves = () => {

	const { bookshelves, getAllBookshelves } = useGlobalContext();

	useEffect(() => {
		getAllBookshelves();
	}, []);


	return (
		<div>
			<NewBookshelfForm />
			{
				bookshelves?.map(bookshelf => {
					return (
						<div key={bookshelf._id}>
							<Bookshelf {...bookshelf} />
						</div>
					);
				})
			}
		</div>
	);
};

export default Bookshelves;