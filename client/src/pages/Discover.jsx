import { useState, useEffect } from "react";
import ax from "../utils/ax.jsx";
import Book from "../../components/Book.jsx";

const Discover = () => {

	// state for search function
	const [values, setValues] = useState('')
	const [results, setResults] = useState([])

	// api call returns array of books matching subject search
	const searchBySubject = () => {
		const fetchData = async () => {
			const response = await ax(`/subjects/${values}.json`)
			const { works } = response.data
			setResults(works)
			console.log(works);
		}
		fetchData()

	}

	const handleSubmit = (e) => {
		e.preventDefault()
		searchBySubject()
	}

	return (
		<div>
			<div className="flex gap-2 ml-10">
				<form className="flex gap-6 mx-auto" onSubmit={handleSubmit}>
					<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					       type="text"
					       placeholder="Search subject"
					       value={values}
					       onChange={e=>{setValues(e.target.value)}}
					/>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					        type='submit'>
						search
					</button>
				</form>
			</div>
			<div className="grid grid-cols-3 gap-12 m-12">
				{
					results?.map(book => {
						return (
							<div key={book.key}>
								<Book {...book}/>
							</div>
						)
					})
				}
			</div>
		</div>
	);
};

export default Discover;