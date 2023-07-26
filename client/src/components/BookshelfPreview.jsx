import { useNavigate } from "react-router-dom";

const BookshelfPreview = (bookshelf) => {

	const { _id, cover, name, notes } = bookshelf;

	// to navigate to bookshelf id on user click
	const navigate = useNavigate();

	return (
		<div
			className="hover:bg-gray-200 m-6 bg-white hover:z-0 rounded-lg overflow-hidden shadow-lg py-8 lg:w-1/4 md:w-1/3 sm:w-1/2"
			onClick={() => {
				navigate(`/bookshelves/${_id}`);
			}}>

			<div>
				<img className="mx-auto rounded-lg p-3" src={cover} alt={name} />
			</div>


			<div className="text-2xl leading-tight py-2 hover:cursor-pointer hover:text-teal-800">
				{name}
			</div>

			<div>
				{notes}
			</div>
		</div>
	);
};

export default BookshelfPreview;