import { useGlobalContext } from "../context/GlobalContext.jsx";

const Footer = () => {
	const { user } = useGlobalContext();

	return (
		<div className="m-10 text-xs">
			<div className="test">
				<button onClick={() => console.log(user)}>show user</button>
			</div>
			<p>&copy; Sujith Varughese 2023</p>
		</div>
	);
};

export default Footer;