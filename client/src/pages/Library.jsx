import { Book } from "../components";
import { useGlobalContext } from "../context/GlobalContext.jsx";

const Library = () => {

	const { library } = useGlobalContext();

	return (
		<div>
			{
				library?.map((book) => {
					const { _id } = book
					return (
						<Book key={_id} {...book} />
					);
				})}
		</div>
	);
};

export default Library;
