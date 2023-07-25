import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useState } from "react";
import { AddBookToBookshelfBtn, RemoveFromLibraryBtn, EditBookBtn } from "./buttons/index.js";
import { Alert } from "../components";
import { useNavigate } from "react-router-dom";
import { FormRow, FormRowSelect } from "./forms/index.js";

// book when called from database
const BookDB = (book) => {

	const { user, _id, title, authors, coverID, firstPublishYear, status, userRating, notes, inBookshelf } = book;

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
		updateBookDetails(values);
	};
	//-----------------------------------------------------//

	const { bookshelves, showAlert, updateBookDetails } = useGlobalContext();
	return (
		<div
			className="hover:bg-gray-200 m-6 bg-white hover:z-0 rounded-lg overflow-hidden shadow-lg xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2"
		>
			{
				showDetails ?

					<div className="p-4 book-detailed-view">
						<div>
							<img
								className="h-32 w-20 mx-auto rounded-lg shadow-md"
								src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`}
								alt={title}
								onClick={() => setShowDetails(!showDetails)}

							/>
						</div>


						<div className="text-l leading-tight py-1 hover:cursor-pointer hover:text-teal-800"
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
								<form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
									<FormRowSelect labelText="status" name="status" value={values.status}
									               list={["unread", "completed", "reading"]} handleChange={handleChange} />

									<FormRowSelect labelText="rating" name="rating" value={values.rating}
									               list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} handleChange={handleChange} />

									<FormRow labelText="notes" type="text" name="notes" value={values.notes}
									         handleChange={handleChange} />

									<button className="mx-2 my-4 py-1 px-3 bg-teal-400 rounded-full hover:text-white">Save
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

									<div className="text-sm pb-1">
										Notes: {notes || "empty"}
									</div>
								</>
						}
						<div className="flex flex-col">
							<div>
								<AddBookToBookshelfBtn {...book} />
							</div>

							<div>
								<button
									className="bg-teal-400 h-8 mr-6 hover:bg-blue-700 hover:z-50 text-white font-bold py-2 px-2 rounded text-xs"
									onClick={() => setEditMode(!editMode)}
								>Edit
								</button>
								<RemoveFromLibraryBtn {...book} />
							</div>
						</div>

						{showAlert && <Alert />}
					</div>

					:

					<div className=" py-8 book-basic-view">
						<div>
							<img
								className="h-64 w-40 mx-auto rounded-lg shadow-md"
								src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`}
								alt={title} onClick={() => setShowDetails(!showDetails)} />
						</div>


						<div className="text-2xl leading-tight py-2 hover:cursor-pointer hover:text-teal-800"
						     onClick={() => setShowDetails(!showDetails)}>{title}</div>

						<div className="text-gray-500">
							{
								authors.map((author, index) => {
									return <div key={index}>{author}</div>;
								})
							}
						</div>
					</div>
			}
		</div>
	);

};

// component will render if user clicks book title to display book details
const BookDetails = (book) => {

	const { user, _id, title, authors, coverID, firstPublishYear, status, userRating, notes, inBookshelf } = book;
	const { bookshelves, showAlert } = useGlobalContext();


	return (
		<div className="">

			<div>
				<img
					className="h-32 w-20 mx-auto rounded-lg shadow-md"
					src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`}
					alt={title}

				/>
			</div>


			<div className="text-l leading-tight py-2 hover:cursor-pointer hover:text-teal-800">
				{title}
			</div>

			<div className="text-gray-500">
				{
					authors.map((author, index) => {
						return <div key={index}>{author}</div>;
					})
				}
			</div>


			<div>
				Year published: {firstPublishYear}
			</div>

			<div>
				{status}
				{userRating}
				{notes}
				{inBookshelf !== null && inBookshelf}
			</div>

			<div className="space-y-2">
				<RemoveFromLibraryBtn {...book} />

				<AddBookToBookshelfBtn {...book} />
			</div>

			{showAlert && <Alert />}
		</div>
	);
};

export default BookDB;
