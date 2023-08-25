import { BookDB, Loading, Card } from "../components";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect } from "react";

// page will show users entire collection
const Library = () => {

	// library already in global state from Home render
	const { library, getLibrary } = useGlobalContext();

	useEffect(() => {
		getLibrary();
	}, []);
	// display each book as a component
	return (
		<div className="">
			<div className="w-1/2 mx-auto my-12">
				<div className="title">My Library</div>
			</div>
			<div className="text">Browse your collection! Click any title to get more info!</div>

			<div
				className="flex flex-wrap justify-around bg-gray-100 rounded-lg">
				{
					library?.map(book => {
						const { _id } = book;
						return (
							<Card key={_id} {...book} />
						);
					})}
			</div>

		</div>

	);
};

export default Library;
