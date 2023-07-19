import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect } from "react";

const Home = () => {

	const { getLibrary, getAllBookshelves } = useGlobalContext()

	// when initial program renders, users library is automatically loaded into global state
	useEffect(() => {
		getLibrary()
		getAllBookshelves()
	}, [])


	return (
		<div className="my-4 mx-auto">
			<div className="text-3xl">Bookshelf-app</div>
		</div>
	);
};

export default Home;