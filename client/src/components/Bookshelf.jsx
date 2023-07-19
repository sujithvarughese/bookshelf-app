
const Bookshelf = ({ _id, name, books, cover, notes }) => {
	return (
		<div>
			<img src={cover} alt="img" width="300" height="300"/>
			{name}
			{notes}
		</div>
	);
};

export default Bookshelf;