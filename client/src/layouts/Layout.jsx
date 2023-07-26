import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";


const Layout = () => {

	const { user, getLibrary, getAllBookshelves } = useGlobalContext();
	// automatically redirect appropriately if user credentials ok
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			getLibrary();
			getAllBookshelves();
			console.log(`navigating to user home`);
			setTimeout(() => {
				navigate("/home");
			}, 1000);
		}
	}, [user]);

	return (
		<div className="max-w-6xl mx-auto text-center">
			<Navbar />

			<div>
				<Outlet />
			</div>

			<Footer />
		</div>
	);
};

export default Layout;
