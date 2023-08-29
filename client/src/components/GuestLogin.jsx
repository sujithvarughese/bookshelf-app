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
			<div className="text text-base">
				<button className="link"
				        onClick={guestLogin}>Preview Site
				</button>
			</div>
		</div>
	);
};

export default GuestLogin;