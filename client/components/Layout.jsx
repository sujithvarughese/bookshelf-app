import { Navbar, Footer } from "./"
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div  className="max-w-5xl my-4 mx-auto">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;