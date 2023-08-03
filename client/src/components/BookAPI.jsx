import { useEffect, useState } from "react";
import { axAPI, axDB } from "../utils/ax.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { Alert } from "../components";

// book when called from openlibrary api
const BookAPI = (book) => {
	const { title, authors, cover_id, first_publish_year, cover_edition_key } = book;

	const { user, addBookToLibrary } = useGlobalContext();
	// user can click to expand book details
	const [showDetails, setShowDetails] = useState(false);

	const [infoURL, setInfoURL] = useState("");
	const [previewAvailable, setPreviewAvailable] = useState(false);
	const [previewURL, setPreviewURL] = useState("");
	// to show alert and remove 'add to library' button

	const [addedToLibrary, setAddedToLibrary] = useState(false);

	const addBookAPI = () => {
		setAddedToLibrary(true);
		addBookToLibrary({ ...book, infoURL, previewAvailable, previewURL });
	};

	// use openLibrary Books API to get book preview and link for more info
	const getPreview = () => {
		const fetchData = async () => {
			const response = await axAPI(`/api/books?bibkeys=OLID:${cover_edition_key}&format=json`);
			const info = response.data[`OLID:${cover_edition_key}`];
			// info_url -> link to more info
			// preview -> value will be "noview" if preview is not available
			// previewURL -> link to preview
			const { info_url, preview, preview_url } = info;
			// - set all values if available to local state so user can view if requested
			// - if book is added to library, these values are included so user has in database
			setInfoURL(info_url);
			if (preview !== "noview") {
				setPreviewAvailable(true);
				setPreviewURL(preview_url);
			}
		};
		fetchData();

	};

	useEffect(() => {
		getPreview();
	}, []);


	// add when pulling book summary -> {showDetails && <BookDetails {...book} />}
	return (
		<div
			className="hover:bg-gray-100 m-6 bg-white hover:z-0 rounded-lg overflow-hidden shadow-lg py-8 xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2">


			<a href={infoURL} target="_blank" rel="noreferrer"
			   className="text-2xl leading-tight py-2">
				<img className="h-64 w-40 mx-auto my-4 rounded-lg shadow-md"
				     src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`}
				     alt={title}
				/>
			</a>

			<a href={infoURL} target="_blank" rel="noreferrer"
			   className="text-2xl leading-tight py-2">{title}
			</a>

			<div className="text-gray-500">
				{
					authors.map((author, index) => {
						return <div key={index}>{author.name}</div>;
					})
				}
			</div>
			<div className="pt-2">
				Year Published: {first_publish_year || "unknown"}
			</div>


			{
				user !== null && !addedToLibrary &&
				<div className="flex">
					<button
						className="bg-teal-400 m-4 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
						onClick={() => addBookAPI(book)}
					>add to library
					</button>

					{
						previewAvailable ?

							<a href={previewURL} target="_blank" rel="noreferrer"
							   className="bg-teal-400 m-4 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs">Show
								preview
							</a>
							:
							<div className="m-4 font-bold py-2 px-2 rounded text-xs">
								No Preview Available
							</div>
					}


				</div>
			}
		</div>
	);
};

export default BookAPI;
