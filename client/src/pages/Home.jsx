import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect } from "react";

const Home = () => {

	const { getLibrary } = useGlobalContext()

	// when initial program renders, users library is automatically loaded
	useEffect(() => {
		getLibrary()
	}, [])




	return (
		<div className="my-4 mx-auto">
			<div className="text-3xl">Bookshelf-app</div>
		</div>
	);
};

export default Home;