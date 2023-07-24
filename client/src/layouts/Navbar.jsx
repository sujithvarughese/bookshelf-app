import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";
import { LoginForm } from "../components/forms/index.js";

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
		<nav className="relative container mx-auto">
			<div className="flex items-center justify-between font-serif p-1 bg-stone-100">

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

				<div className="hidden lg:flex flex-col">

					<LoginForm />


					<div className="mx-24">
						Not a member yet?
						<a
							href="/register"
							className="underline decoration-1 hover:text-white hover:bg-teal-200 rounded-full px-1"
						>Register
						</a>
					</div>


				</div>


			</div>
		</nav>
	);
};

export default Navbar;
