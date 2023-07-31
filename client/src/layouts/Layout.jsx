import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { Alert } from "../components/index.js";


const Layout = () => {

	const { user, getLibrary, getAllBookshelves, showAlert } = useGlobalContext();
	// automatically redirect appropriately if user credentials ok
	const navigate = useNavigate();

	useEffect(() => {
		if (user && Object.keys(user).length > 0) {
			getLibrary();
			getAllBookshelves();
			console.log("navigating home...");
			setTimeout(() => {
				navigate("/library");
			}, 1500);

		}
	}, [user]);

	return (
		<div className="max-w-6xl mx-auto text-center">
			<Navbar />
			{showAlert && <Alert />}
			<div>
				<Outlet />
			</div>

			<Footer />
		</div>
	);
};

export default Layout;
