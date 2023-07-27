import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { BookDB } from "./index.js";

const ContinueComponent = () => {

	const { library, setLoading } = useGlobalContext();

	const numBooksContinueReading = 4;
	const [continueReading, setContinueReading] = useState([]);

	// component will render books that user is currently reading
	const getBooksToContinueReading = () => {
		const booksToContinue = library.filter(book => book.status === "reading");
		if (booksToContinue.length < numBooksContinueReading) {
			const booksUnread = library.filter(book => book.status === "unread");
			booksToContinue.push(...booksUnread);
		}
		setContinueReading(booksToContinue);
	};

	useEffect(() => {
		getBooksToContinueReading();
	}, []);

	return (
		<div>
			{
				continueReading.length > 0 &&
				<div className="bg-gray-100 text-xl">Continue where you left off!</div>
			}

			{
				continueReading.length === 0 ?
					<div className="bg-gray-100 text-md">
						You're not reading any books! Search for books and add them to your library to start reading!
					</div>
					:
					<div className="flex flex-wrap justify-around bg-gray-100 rounded-lg">
						{
							continueReading.map(book => {
								return (
									<BookDB key={book.title} {...book} />
								);
							})
						}
					</div>

			}
		</div>
	);
};

export default ContinueComponent;