import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useState } from "react";
import { AddBookToBookshelfBtn, RemoveFromLibraryBtn, EditBookBtn } from "./buttons/index.js";
import { Alert } from "../components";
import { FormRow, FormRowSelect } from "./forms";

// book when called from database
const BookDB = (book) => {

	const {
		user,
		_id,
		title,
		authors,
		coverID,
		firstPublishYear,
		status,
		userRating,
		notes,
		bookshelf,
		bookshelfName
	} = book;

	// in general view, user should only see cover, title, and author(s)
	// in detailed view, user should see full book details
	const [showDetails, setShowDetails] = useState(false);

	//---------------------update book---------------------//
	const [editMode, setEditMode] = useState(false);
	// to edit book
	const [values, setValues] = useState({ ...book });

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		updateBookDetails(_id, values);
		setEditMode(false);
	};
	//-----------------------------------------------------//


	const { bookshelves, showAlert, updateBookDetails, removeBookFromBookshelf } = useGlobalContext();

	return (
		<div
			className="m-6 bg-white rounded-lg overflow-hidden shadow-lg lg:w-1/4 md:w-1/3 sm:w-1/2"
		>
			{
				showDetails ?
					/* detailed view (when book is clicked) */
					<div className="book-detailed-view my-4">
						<div>
							<img
								className="h-32 w-20 mx-auto rounded-lg shadow-md"
								src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`}
								alt={title}
								onClick={() => setShowDetails(!showDetails)}

							/>
						</div>


						<div className="text-lg leading-tight py-1 hover:cursor-pointer hover:text-teal-800"
						     onClick={() => setShowDetails(!showDetails)}>
							{title}
						</div>

						<div className="text-gray-500">
							{
								authors.map((author, index) => {
									return <div key={index}>{author}</div>;
								})
							}
						</div>
						{
							editMode ?
								/* Edit view will change book details to editable form */
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
								:
								<>
									<div className="text-sm pb-1">
										{firstPublishYear}
									</div>

									<div className="text-sm pb-1">
										Status: {status || "reading"}
									</div>

									<div className="text-sm pb-1">
										Rating: {userRating || "not rated"}
									</div>

									<div className="text-sm pb-1 h-44">
										Notes: {notes || "empty"}
									</div>
								</>
						}
						<div className="flex flex-col">
							<div className="">
								{
									bookshelf ?
										<div className="my-2 text-sm">
											<span>In Bookshelf: </span>
											<span className="font-bold mx-1">{bookshelfName}</span>
											<button
												className="bg-teal-400 h-8 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
												onClick={() => removeBookFromBookshelf(_id, bookshelf)}>remove
											</button>
										</div>
										:
										<AddBookToBookshelfBtn bookID={_id} />
								}
							</div>

							<div className="flex justify-around mt-2">

								<div>
									<button
										className="bg-teal-400 h-11 w-24 hover:bg-blue-700 text-white font-bold p-0.5 rounded text-xs"
										onClick={() => setEditMode(!editMode)}
									>Edit Book
									</button>
								</div>

								<div>
									<RemoveFromLibraryBtn {...book} />
								</div>

							</div>

						</div>

						{showAlert && <Alert />}
					</div>

					:
					/* book basic view */
					<div className="flex flex-col py-12 hover:bg-gray-200">
						<div className="py-8">
							<img
								className="h-64 w-40 mx-auto rounded-lg shadow-md"
								src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`}
								alt={title} onClick={() => setShowDetails(!showDetails)}
							/>
						</div>


						<div className="text-2xl leading-tight hover:cursor-pointer hover:text-teal-800"
						     onClick={() => setShowDetails(!showDetails)}>{title}</div>

						<div className="text-gray-500 py-8">
							{
								authors.map((author, index) => {
									return <div key={index}>{author}</div>;
								})
							}
						</div>

						<div>
							{firstPublishYear}
						</div>
					</div>
			}
		</div>
	);

};

export default BookDB;
