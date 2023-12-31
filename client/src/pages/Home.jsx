import { useGlobalContext } from "../context/GlobalContext.jsx";


const Home = () => {

	const { library, getLibrary, getAllBookshelves, isLoading } = useGlobalContext();


	return (

		<div className="flex flex-col gap-12">
			<div className="w-1/2 mx-auto mt-12">
				<div className="text-4xl mx-8">Home</div>
			</div>


		</div>
	);
};

export default Home;