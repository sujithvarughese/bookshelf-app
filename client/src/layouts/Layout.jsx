import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";


const Layout = () => {

	return (
		<div>
			<Navbar />

			<div className="max-w-6xl px-5 mx-auto my-8 text-center">
				<Outlet />
			</div>

			<Footer />
		</div>
	);
};

export default Layout;
