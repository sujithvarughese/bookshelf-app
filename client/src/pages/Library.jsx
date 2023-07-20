import { BookDB } from "../components";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect } from "react";

// page will show users entire collection
const Library = () => {

	// library already in global state from Home render
	const { library, getLibrary } = useGlobalContext();

	// when initial program renders, users library is automatically loaded into global state
	useEffect(() => {
		getLibrary()
	}, [])

	// BookPreview renders cover, title, author
	return (
		<div  className="grid grid-cols-3 gap-12 m-12">
			{
				library.map(book => {
					const { _id } = book
					return (
						<BookDB key={_id} {...book} />
					);
				})}
		</div>
	);
};

export default Library;
