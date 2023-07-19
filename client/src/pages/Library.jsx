import { BookPreviewDB } from "../components";
import { useGlobalContext } from "../context/GlobalContext.jsx";

// page will show users entire collection
const Library = () => {

	// library already in global state from Home render
	const { library } = useGlobalContext();

	// BookPreview renders cover, title, author
	return (
		<div>
			{
				library.map(book => {
					const { _id } = book
					return (
						<BookPreviewDB key={_id} {...book} />
					);
				})}
		</div>
	);
};

export default Library;
