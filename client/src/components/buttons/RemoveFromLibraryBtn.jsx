import { useGlobalContext } from "../../context/GlobalContext.jsx";


const RemoveFromLibraryBtn = (book) => {

	const { removeBookFromLibrary } = useGlobalContext();

	return (
		<button
			className="bg-teal-400 h-11 w-24 mx-auto hover:bg-blue-700 text-white font-bold p-0.5 rounded text-xs"
			onClick={() => removeBookFromLibrary(book._id)}
		>Remove from library
		</button>
	);
};

export default RemoveFromLibraryBtn;