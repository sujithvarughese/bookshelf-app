import img1 from "../assets/images/bookshelves/AdobeStock_298722319.jpeg";
import img2 from "../assets/images/bookshelves/AdobeStock_308975840.jpeg";

const Landing = () => {
	return (
		<div className="landing container">

			<div className="flex flex-col">

				<div className="col-span-2 bg-stone-200 flex justify-between">
					<div className="m-auto text-3xl">Discover new reading</div>
					<img src={img1} alt="img1" className="max-w-2xl" />
				</div>

				<div className="col-span-2 flex">
					<img src={img2} alt="img2" className="max-w-2xl" />
					<div className="m-auto text-3xl">Organize your library</div>
				</div>

			</div>

		</div>
	);
};

export default Landing;