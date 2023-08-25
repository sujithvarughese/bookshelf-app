import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useState } from "react";
import { AddBookToBookshelfBtn, RemoveFromLibraryBtn, EditBookBtn } from "./buttons/index.js";
import iconX from "../assets/images/x_icon.svg";
import { ModalWrapper } from ".";

const CardModal = ({ book, setShowDetails }) => {

	const {
		user,
		_id,
		title,
		authors,
		coverID,
		infoURL,
		previewAvailable,
		previewURL,
		firstPublishYear,
		status,
		userRating,
		notes,
		bookshelf,
		bookshelfName
	} = book;

	return (
		<ModalWrapper>
			<div className="modal">
				<img
					src={iconX}
					className="float-right w-6 hover:bg-gray-200 hover:cursor-pointer"
					alt="X"
					onClick={() => setShowDetails(false)}
				/>

				<div className="book-detailed-view text-sm sm:text-lg">

					<div>
						<a href={infoURL} target="_blank" rel="noreferrer"
						   className="text-2xl leading-tight py-2">
							<img className="h-32 w-20 mx-auto my-4 rounded-lg shadow-md"
							     src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`}
							     alt={title}
							/>
						</a>
					</div>

					<a href={infoURL} target="_blank" rel="noreferrer"
					   className="text-2xl leading-tight py-2 hover:cursor-pointer hover:text-teal-500">{title}
					</a>

					<div className="text-gray-500">
						{
							authors.map((author, index) => {
								return <div key={index}>{author}</div>;
							})
						}
					</div>
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
				</div>
			</div>
		</ModalWrapper>
	);
};

export default CardModal;