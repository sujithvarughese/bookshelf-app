import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";
import { LoginForm } from "../components/forms/index.js";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";

const adminLinks = [
	{
		name: "home",
		url: "/home"
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
		url: "/home"
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
	/* Whenever user changes, the nav bar will update to the appropriate links (public, member, or admin) */
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
	const navigate = useNavigate();
	return (
		<nav className="navbar">
			<div className="flex items-center justify-between font-serif p-1 bg-stone-100">

				{/* logo */}
				<div className="w-20 ml-6 hover:cursor-pointer">
					<img className="rounded-xl" src={logo} alt="logo" onClick={() => navigate("/home")} />
				</div>

				{/* links (dynamically set based on user role */}
				<div className="hidden sm:flex space-x-6">
					{links.map((link, index) => {
						return (
							<NavLink
								key={index}
								to={link.url}
								className={({ isActive }) => [
									"px-2.5 py-1",
									"hover:bg-teal-400",
									"hover:text-white",
									"rounded-md transition",
									isActive ? "font-extrabold" : "bg-black-500"
								].join(" ")
								}
							>
								{link.name}
							</NavLink>
						);
					})}
				</div>

				{/* if user logged in, will display "hello, user" and option to log out */}
				{user ?
					<div className="mx-16">
						Hello {user.firstName}!
						<button className="mx-2 my-4 py-1 px-3 bg-teal-400 rounded-full hover:text-white" type="submit"
						        onClick={logout}>logout</button>
					</div>
					:
					/* if no user, will display form to log in, and link to register */
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

				{/* small screen sizes, the whole login form will not be displayed, instead a link to a separate log in page will be displayed */}
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
