import { useGlobalContext } from "../context/GlobalContext.jsx";

const pw = import.meta.env.VITE_BEEBS_TOP_SECRET;

const GuestLogin = () => {

	const { login } = useGlobalContext();

	const guestLogin = (e) => {
		e.preventDefault();
		const email = "justbeebs@mail.com";
		const password = pw;
		login({ email, password });
	};


	return (
		<div className="flex flex-col gap-6">
			<div>Try Creating an account and get started!</div>
			<div>
				Or <button className="underline text-blue-500 hover:cursor-pointer hover:text-cyan-500"
				           onClick={guestLogin}>click here</button> to access the site in Guest Mode!
			</div>
		</div>
	);
};

export default GuestLogin;