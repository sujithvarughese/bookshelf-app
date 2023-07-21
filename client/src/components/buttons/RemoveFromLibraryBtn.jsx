import { useGlobalContext } from "../../context/GlobalContext.jsx";


const RemoveFromLibraryBtn = ({ bookID }) => {

	const { removeBookFromLibrary } = useGlobalContext();


	return (
		<button
			className="bg-teal-400 hover:bg-blue-700 hover:z-50 text-white font-bold py-2 px-2 rounded text-xs"
			onClick={() => removeBookFromLibrary(bookID)}
		>remove from library
		</button>
	);
};

export default RemoveFromLibraryBtn;