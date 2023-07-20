
const UpdateBookshelf = (bookshelf) => {

	const { _id, name, books, cover, notes } = bookshelf

	return (
		<div>
			<img src={cover} alt="img" width="300" height="300"/>
			{name}
			{notes}
		</div>
	);
};

export default UpdateBookshelf;