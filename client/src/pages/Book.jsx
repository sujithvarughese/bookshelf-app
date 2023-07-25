import { useParams } from "react-router-dom";

const Book = () => {

	const bookID = useParams().id;
	console.log(bookID);
	return (
		<div>

		</div>
	);
};

export default Book;