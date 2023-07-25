import { useGlobalContext } from "../../context/GlobalContext.jsx";


const RemoveFromLibraryBtn = (book) => {

	const { removeBookFromLibrary } = useGlobalContext();

	return (
		<button
			className="bg-teal-400 h-8 mx-auto hover:bg-blue-700 hover:z-50 text-white font-bold py-2 px-2 rounded text-xs"
			onClick={() => removeBookFromLibrary(book._id)}
		>remove
		</button>
	);
};

export default RemoveFromLibraryBtn;