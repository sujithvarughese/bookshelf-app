import { useGlobalContext } from "../context/GlobalContext.jsx";
import { axAPI } from "../utils/ax.jsx";
import { useEffect, useState } from "react";
import { BookAPI } from "./";

const DiscoverComponent = () => {

	const { library, setLoading } = useGlobalContext();

	// books displayed to user from subjects
	const numBooksToDiscover = 4;
	const [booksToDiscover, setBooksToDiscover] = useState([]);


	const fetchBooksToDiscover = () => {
		setLoading(true);
		const books = [];

		const fetchData = async () => {
			// array of all subjects from books in user library
			const allSubjects = library.map(book => book.subject).flat();

			if (library.length === 0) {
				allSubjects.push("popular", "new", "action", "romance", "comedy", "adventure");
			}

			while (books.length < numBooksToDiscover) {
				// choose one subject at random from allSubjects
				const subject = allSubjects[Math.floor(Math.random() * allSubjects.length)];

				// use openLibrary API to search books that contain that subject
				const response = await axAPI(`/subjects/${subject}.json?limit=8`);
				// works array contains books from search results
				const { works } = response.data;
				// randomize works array to ensure a new book will always be displayed to the user
				works.sort(() => Math.random() - 0.5);

				// array of just titles of books in library
				const titles = library.map(book => book.title);
				// first book from works array that is not already in the user's library
				const bookToAdd = works.find(book => !titles.includes(book.title));

				// add book to temporary array, then set array to booksToDiscoverState
				if (bookToAdd) {
					books.push(bookToAdd);
				}
				// run as many times as number of books to be displayed to user
			}
			setBooksToDiscover(books);
			setLoading(false);
		};
		fetchData();
	};

	useEffect(() => {
		fetchBooksToDiscover();
	}, []);

	return (
		<div className="">
			{
				booksToDiscover.length === numBooksToDiscover &&
				<div className="bg-gray-100 text-xl">Our hand-picked selections just for you!</div>
			}


			<div className="flex flex-wrap justify-around bg-gray-100 rounded-lg">

				{
					booksToDiscover.length === numBooksToDiscover &&

					booksToDiscover.map((book, index) => {
						return (
							<BookAPI key={index} {...book} />
						);
					})
				}

			</div>
		</div>

	);
};

export default DiscoverComponent;