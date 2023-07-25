import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";


const Layout = () => {

	return (
		<div className="max-w-6xl px-5 mx-auto my-8 text-center">
			<Navbar />

			<div>
				<Outlet />
			</div>

			<Footer />
		</div>
	);
};

export default Layout;
