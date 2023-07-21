import { useGlobalContext } from "../../context/GlobalContext.jsx";


const RemoveFromLibraryBtn = ({ bookID }) => {

	const { removeBookFromLibrary } = useGlobalContext();


	return (
		<button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
			onClick={() => removeBookFromLibrary(bookID)}
		>remove from library
		</button>
	);
};

export default RemoveFromLibraryBtn;