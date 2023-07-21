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

			<div className="w-1/2 mx-auto my-12">
				<NewBookshelfForm />
			</div>

			<div className="grid grid-cols-3 gap-12 m-12">
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
		</div>
	);
};

export default Bookshelves;