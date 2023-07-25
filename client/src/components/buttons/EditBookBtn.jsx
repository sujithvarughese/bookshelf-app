import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";


const EditBookBtn = (book) => {

	const { user, _id, title, authors, coverID, firstPublishYear, status, userRating, notes, inBookshelf } = book;

	const { updateBookDetails } = useGlobalContext();

	const [values, setValues] = useState({ ...book });
	const [showUpdateForm, setShowUpdateForm] = useState(false);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateBookDetails(values);
	};

	return (
		<button
			className="bg-teal-400 h-8 mr-6 hover:bg-blue-700 hover:z-50 text-white font-bold py-2 px-2 rounded text-xs"
			onClick={() => setShowUpdateForm(!showUpdateForm)}
		>Edit
		</button>
	);
};

export default EditBookBtn;