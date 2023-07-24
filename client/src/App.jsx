import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Library, Discover, Bookshelves, Error } from "./pages";
import Layout from "./layouts/Layout.jsx";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/library" element={<Library />} />
					<Route path="/discover" element={<Discover />} />
					<Route path="/bookshelves" element={<Bookshelves />} />
				</Route>

				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
