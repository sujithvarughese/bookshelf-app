import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";


const Layout = () => {

	return (
		<div className="max-w-5xl">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;
