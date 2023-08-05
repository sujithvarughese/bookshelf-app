import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { BookDB, Loading } from "../components/index.js";
import bookshelfImages from "../assets/images/bookshelves/index.js";

const Bookshelf = () => {
	// params is bookshelf._id
	const bookshelfID = useParams().id;
	const { getBookshelf, bookshelf, isLoading, library } = useGlobalContext();

	useEffect(() => {
		getBookshelf(bookshelfID);
	}, []);


	return (
		<div>
			<div className="w-1/2 mx-auto my-12">
				<div className="text-4xl m-8">{bookshelf?.name}</div>
			</div>
			<div className="w-1/2 mx-auto my-6">
				<div className="text-xl m-4">{bookshelf?.description}</div>
			</div>
			{
				bookshelf?.books.length === 0 &&
				<div className="text-xl">
					Your bookshelf is empty! Go to your library and add books to get started!
				</div>
			}
			{isLoading && <Loading />}
			<div className="flex flex-wrap justify-around bg-gray-100 rounded-lg">
				{
					bookshelf?.books.map((book, index) => {
						return (
							<BookDB key={index} {...book} />
						);
					})
				}
			</div>

		</div>
	);
};

export default Bookshelf;