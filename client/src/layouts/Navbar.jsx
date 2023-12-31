import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";
import { LoginForm } from "../components/forms/index.js";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import GuestLogin from "../components/GuestLogin.jsx";

const adminLinks = [
	/*
	 {
	 name: "Home",
	 url: "/home"
	 },
	 */
	{
		name: "My Library",
		url: "/library"
	},
	{
		name: "Discover",
		url: "/discover"
	},
	{
		name: "Bookshelves",
		url: "/bookshelves"
	},
	{
		name: "Members",
		url: "/members"
	}

];

const memberLinks = [
	/*
	 {
	 name: "Home",
	 url: "/home"
	 },
	 */
	{
		name: "My Library",
		url: "/library"
	},
	{
		name: "Discover",
		url: "/discover"
	},
	{
		name: "Bookshelves",
		url: "/bookshelves"
	}
];

const publicLinks = [];


const Navbar = () => {

	const { user, logout } = useGlobalContext();
	/* Whenever user changes, the nav bar will update to the appropriate links (public, member, or admin) */
	useEffect(() => {
		if (user && Object.keys(user).length > 0) {
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

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<nav className="navbar w-max-screen">
			<div className="flex items-center justify-between font-serif p-1 bg-stone-100">

				{/* logo */}
				<div className="w-20 ml-6 hover:cursor-pointer">
					<img className="rounded-xl" src={logo} alt="logo" onClick={() => navigate("/")} />
				</div>

				{/* links (dynamically set based on user role */}
				<div className="flex">
					{links.map((link, index) => {
						return (
							<NavLink
								key={index}
								to={link.url}
								className={({ isActive }) => [
									"nav-font", "px-2.5 py-1",
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
				{user && Object.keys(user).length > 0 ?
					<div className="mx-2">
						Hello {user.firstName}!
						<button className="mx-2 my-4 py-1 px-3 bg-teal-400 rounded-full hover:text-white" type="submit"
						        onClick={handleLogout}>Logout</button>
					</div>
					:
					/* if no user, will display form to log in, and link to register */
					<div className="">
						<div className="hidden lg:flex flex-col">
							<LoginForm />
							<div className="flex">
								<div className="mx-24">
									Not a member yet?
									<NavLink className="link"
									         to="/register"> Register</NavLink>
								</div>
							</div>
						</div>

						<div>
							<GuestLogin />
						</div>
						{/* small screen sizes, the whole login form will not be displayed, instead a link to a separate log in page will be displayed */}
						<div className="lg:hidden">
							<NavLink className="underline decoration-1 hover:text-teal-500 px-1"
							         to="/login">Login</NavLink>
							<NavLink className="underline decoration-1 hover:text-teal-500 px-1"
							         to="/register">Register</NavLink>
						</div>

					</div>
				}


			</div>
		</nav>
	);
};

export default Navbar;
