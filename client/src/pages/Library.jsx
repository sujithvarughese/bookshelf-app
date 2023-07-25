import { BookDB, Loading } from "../components";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect } from "react";

// page will show users entire collection
const Library = () => {

	// library already in global state from Home render
	const { library, getLibrary, isLoading } = useGlobalContext();

	useEffect(() => {
		getLibrary();
	}, []);
	// display each book as a component
	return (
		<div className="">
			<div className="text-4xl m-8">My Library</div>

			{isLoading && <Loading />}

			<div
				className="container flex flex-wrap justify-between bg-gray-100 rounded-lg">
				{
					library?.map(book => {
						const { _id } = book;
						return (

							<BookDB key={_id} {...book} />


						);
					})}
			</div>

		</div>

	);
};

export default Library;
