import { useState, useEffect } from "react";
import { axAPI, axDB } from "../utils/ax.jsx";
import { BookAPI, Loading } from "../components";
import { useGlobalContext } from "../context/GlobalContext.jsx";

// page will allow user to search for books to add to his/her library
const Discover = () => {

	const { library, isLoading } = useGlobalContext();

	// state for search values as user types
	const [values, setValues] = useState("");
	// state for search results
	const [results, setResults] = useState([]);

	// api call returns array of books matching subject search
	// Results set in state, <BookPreviewAPI /> will render image, title, author
	// User should be able to click each element to get further details on each book from results
	const searchBySubject = () => {
		const fetchData = async () => {
			const response = await axAPI(`/subjects/${values}.json?limit=36`);
			const { works } = response.data;
			// array of just keys of books in library
			const titles = library?.map(book => book.title);
			// filter books to not include books already in user library
			// If user not logged in, titles will be empty so search will render all results
			const worksFiltered = works.filter(book => !titles?.includes(book.title));
			setResults(worksFiltered);
		};
		fetchData();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		searchBySubject();
	};

	return (
		<div>

			<div className="w-1/2 mx-auto my-12">

				<form className="flex gap-6" onSubmit={handleSubmit}>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Search subject"
						value={values}
						onChange={(e) => {
							setValues(e.target.value);
						}}
					/>
					<button
						className="bg-teal-400 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
						type="submit"
					>
						search
					</button>
				</form>
			</div>

			{isLoading && <Loading />}

			<div className="grid grid-cols-3 gap-12 m-12">
				{results.map((book) => {
					return (
						<div key={book.key}>
							<BookAPI {...book} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Discover;
