import { useGlobalContext } from "../context/GlobalContext.jsx";

const GuestLogin = () => {

	const { login } = useGlobalContext();

	const guestLogin = (e) => {
		e.preventDefault();
		const email = "justbeebs@mail.com";
		const password = import.meta.env.VITE_BEEBS_TOP_SECRET;
		login({ email, password });
	};


	return (
		<div className="flex flex-col gap-6">
			<div className="text">Try creating an account and get started!</div>
			<div className="text text-xl">
				Or <button className="link"
				           onClick={guestLogin}>click here</button> to access the site in Guest Mode!
			</div>
		</div>
	);
};

export default GuestLogin;