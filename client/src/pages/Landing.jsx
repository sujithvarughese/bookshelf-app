import img1 from "../assets/images/bookshelves/AdobeStock_298722319.jpeg";
import img2 from "../assets/images/bookshelves/AdobeStock_308975840.jpeg";
import img3 from "../assets/images/bookshelves/AdobeStock_184711026.jpeg";

const Landing = () => {
	return (
		<div className="landing">

			<div className="flex flex-col">

				<div className="col-span-2 bg-stone-200 flex justify-between">
					<div className="m-auto text-3xl text-center">Discover new reading</div>
					<img src={img1} alt="img1" className="w-3/4" />
				</div>

				<div className="col-span-2 flex">
					<img src={img2} alt="img2" className="w-3/4" />
					<div className="m-auto text-3xl text-center">Organize your library</div>
				</div>

				<div className="col-span-2 bg-stone-200 flex justify-between">
					<div className="m-auto text-3xl text-center">Create Effective Bookshelves</div>
					<img src={img3} alt="img3" className="w-3/4" />
				</div>

			</div>

		</div>
	);
};

export default Landing;