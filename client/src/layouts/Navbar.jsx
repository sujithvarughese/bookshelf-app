import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";
import { LoginForm } from "../components/forms/index.js";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";

const adminLinks = [
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
	},
	{
		name: "members",
		url: "/members"
	}

];

const memberLinks = [
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

const publicLinks = [
	{
		name: "home",
		url: "/"
	},
	{
		name: "discover",
		url: "/discover"
	}
];


const Navbar = () => {

	const { user, logout } = useGlobalContext();
	/* Whenever role changes, the nav bar will update to the appropriate links and pass the links to Navbar as props */
	useEffect(() => {
		if (user) {
			if (user.isAdmin) {
				setLinks(adminLinks);
				return;
			}
			setLinks(memberLinks);
			return;
		}
		setLinks(publicLinks);
	}, [user]);

	const [links, setLinks] = useState(publicLinks);

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

				{user ?
					<div className="mx-16">
						Hello {user.firstName}!
						<button type="submit" className="btn" onClick={logout}>logout</button>
					</div>
					:
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
				}


				<div className="lg:hidden">
					<a
						href="/login"
						className="underline decoration-1 hover:text-white hover:bg-teal-200 rounded-full px-1"
					>Login
					</a>
					<a
						href="/register"
						className="underline decoration-1 hover:text-white hover:bg-teal-200 rounded-full px-1"
					>Register
					</a>
				</div>


			</div>
		</nav>
	);
};

export default Navbar;
