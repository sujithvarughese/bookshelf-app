import { useGlobalContext } from "../context/GlobalContext.jsx";

const Footer = () => {
	const { user, library, bookshelves, currentBookshelf } = useGlobalContext();

	return (
		<div className="m-10 text-xs">
			<div className="test">
				<button onClick={() => console.log(user)}>show user</button>
				<br />
				<button onClick={() => console.log(library)}>show library</button>
				<br />
				<button onClick={() => console.log(bookshelves)}>show bookshelves</button>
				<br />
				<button onClick={() => console.log(currentBookshelf)}>current bookshelf</button>
			</div>
			<p>&copy; Sujith Varughese 2023</p>
		</div>
	);
};

export default Footer;