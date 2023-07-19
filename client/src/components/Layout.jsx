import { Navbar, Footer } from ".";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

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
