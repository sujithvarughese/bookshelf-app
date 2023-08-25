import { useEffect, useState } from "react";
import { axAPI } from "../utils/ax.jsx";
import { BookAPI } from "../components";
import { useGlobalContext } from "../context/GlobalContext.jsx";

// page will allow user to search for books to add to his/her library
const Discover = () => {

	const { library, isLoading, getLibrary } = useGlobalContext();

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
			// array of just titles of books in library
			const titles = library?.map(book => book.title);
			// filter books to not include books already in user library
			// If user not logged in, titles will be empty so search will render all results
			const worksFiltered = works.filter(book => !titles?.includes(book.title));
			setResults(worksFiltered);
		};
		fetchData();
	};
	useEffect(() => {
		getLibrary();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		searchBySubject();
	};


	return (
		<div>

			<div className="w-1/2 mx-auto my-12">

				<div className="title">Discover</div>
				<div className="text pb-8">Search for any book by subject!</div>
				{/* search bar to discover by genre */}

				<form className="flex gap-6" onSubmit={handleSubmit}>
					<input
						className="form-input"
						type="text"
						placeholder="Search subject"
						value={values}
						onChange={(e) => {
							setValues(e.target.value);
						}}
					/>
					<button
						className="btn"
						type="submit"
					>
						search
					</button>
				</form>
			</div>

			<div className="flex flex-wrap justify-around bg-gray-100 rounded-lg">
				{results.map((book) => {
					return (
						<BookAPI key={book.key} {...book} />
					);
				})}
			</div>
		</div>
	);
};

export default Discover;
