import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useState } from "react";

// implement into bookDB
const UpdateBookDetailsForm = ({ book, setEditMode }) => {

	const { updateBookDetails, displayAlert } = useGlobalContext();
	const [values, setValues] = useState({ ...book });

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateBookDetails(book._id, values);
		displayAlert("Book Updated!", "success", 1500);
		setEditMode(false);
	};

	return (
		<form className="px-2" onSubmit={handleSubmit}>

			<div className="flex">
				<div className="text-sm flex">

					<label htmlFor="status" className="form-label">
						Status:
					</label>

					<select
						name="status"
						value={values.status}
						onChange={handleChange}
						className="form-select w-1/2 mb-1"
					>
						<option value="unread">unread</option>
						<option value="completed">completed</option>
						<option value="reading">reading</option>
					</select>

				</div>

				<div className="text-sm flex">
					<label htmlFor="userRating" className="form-label">
						Rating:
					</label>
					<select
						name="userRating"
						value={values.userRating}
						onChange={handleChange}
						className="form-select mb-1"
					>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
						<option value={6}>6</option>
						<option value={7}>7</option>
						<option value={8}>8</option>
						<option value={9}>9</option>
						<option value={10}>10</option>
					</select>
				</div>
			</div>


			<div className="text-sm">
				<label htmlFor="notes">Notes: </label>
				<textarea
					className="bg-color-grey shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					name="notes" rows={8} value={values.notes} onChange={handleChange} />
			</div>


			<button
				className="mx-6 my-1.5 text-white py-1 px-8 bg-teal-400 rounded-lg hover:text-black text-white font-bold ">Save
			</button>
		</form>

	);
};

export default UpdateBookDetailsForm;