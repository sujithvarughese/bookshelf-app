import { NavLink } from "react-router-dom";

const links = [
	{
		name: "home",
		url: "/",
	},
	{
		name: "my library",
		url: "/library",
	},
	{
		name: "discover",
		url: "/discover",
	},
	{
		name: "bookshelves",
		url: "/bookshelves",
	},
]

const Navbar = () => {
	return (
		<nav>
			<div className="flex justify-around py-5 font-serif bg-stone-100">
				{
					links.map((links, index) => {
						return (
							<div key={index}>
								<NavLink to={links.url} className="cursor-pointer">{links.name}</NavLink>
							</div>
						)
					})
				}
			</div>
		</nav>

	);
};

export default Navbar;