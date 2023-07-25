import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import { BookDB } from "../components/index.js";


const Home = () => {

	const { library, getLibrary, getAllBookshelves } = useGlobalContext();

	const [continueReading, setContinueReading] = useState([]);

	// when initial program renders, users library and bookshelves(unpopulated) automatically loaded into global state
	useEffect(() => {
		const books = library.map(book => book.status === "reading");
		setContinueReading(books);
	}, []);


	return (

		<div className="my-4 mx-auto">
			<div className="text-3xl">Bookshelf-app-v1</div>
			{
				library?.map(book => {
					const { _id } = book;
					return (

						<BookDB key={_id} {...book} />


					);
				})}
		</div>
	);
};

export default Home;