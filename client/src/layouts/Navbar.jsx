import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";

const links = [
	{
		name: "home",
		url: "/"
	},
	{
		name: "my library",
		url: "/library"
	},
	{
		name: "discover",
		url: "/discover"
	},
	{
		name: "bookshelves",
		url: "/bookshelves"
	}
];

const Navbar = () => {
	return (
		<nav className="relative container mx-auto p-2">
			<div className="flex items-center justify-between py-3 font-serif bg-stone-100">

				<div className="w-20 ml-6">
					<img src={logo} alt="logo" />
				</div>

				<div className="hidden md:flex space-x-6">
					{links.map((links, index) => {
						return (
							<NavLink
								key={index}
								to={links.url}
								className={({ isActive }) => [
									"px-2.5 py-1",
									"hover:bg-teal-400",
									"hover:text-white",
									"rounded-md transition",
									isActive ? "font-extrabold" : "bg-black-500"
								].join(" ")
								}
							>
								{links.name}
							</NavLink>
						);
					})}
				</div>

				<a
					href="#"
					className="mr-6 py-2 px-8 bg-teal-400 rounded-full baseline hover:text-white"
				>Login
				</a>


			</div>
		</nav>
	);
};

export default Navbar;
