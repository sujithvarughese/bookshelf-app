import { useEffect } from "react";
import NewBookshelfForm from "../components/forms/NewBookshelfForm.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { BookshelfPreview } from "../components";

const Bookshelves = () => {

	const { bookshelves, getAllBookshelves, isLoading } = useGlobalContext();

	useEffect(() => {
		getAllBookshelves();
	}, []);


	return (
		<div className="">
			<div className="w-1/2 mx-auto my-12">

				<div className="title">My Bookshelves</div>
				<div className="mx-auto my-12">
					<NewBookshelfForm />
				</div>


			</div>


			<div className="flex flex-wrap justify-around bg-gray-100 rounded-lg">
				{
					bookshelves?.map(bookshelf => {
						return (
							<BookshelfPreview key={bookshelf._id} {...bookshelf} />
						);
					})
				}
			</div>
		</div>
	);
};

export default Bookshelves;