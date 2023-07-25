import { useEffect } from "react";
import NewBookshelfForm from "../components/forms/NewBookshelfForm.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { Bookshelf, Loading } from "../components";

const Bookshelves = () => {

	const { bookshelves, getAllBookshelves, isLoading } = useGlobalContext();

	useEffect(() => {
		getAllBookshelves();
	}, []);


	return (
		<div className="">
			{isLoading && <Loading />}

			<div className="text-4xl m-8">My Bookshelves</div>

			<div className="w-1/2 mx-auto my-12">
				<NewBookshelfForm />
			</div>


			<div className="container flex flex-wrap justify-between bg-gray-100 rounded-lg">
				{
					bookshelves?.map(bookshelf => {
						return (
							<Bookshelf key={bookshelf._id} {...bookshelf} />
						);
					})
				}
			</div>
		</div>
	);
};

export default Bookshelves;