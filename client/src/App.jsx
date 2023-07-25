import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Library, Discover, Bookshelves, Error, Landing, Bookshelf, Book } from "./pages";
import Layout from "./layouts/Layout.jsx";
import ProtectedRoute from "./layouts/ProtectedRoute.jsx";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Landing />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/discover" element={<Discover />} />

					<Route path="/home" element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					} />

					<Route path="/library" element={
						<ProtectedRoute>
							<Library />
						</ProtectedRoute>
					} />

					<Route path="/library/:id" element={
						<ProtectedRoute>
							<Book />
						</ProtectedRoute>
					} />

					<Route path="/bookshelves" element={
						<ProtectedRoute>
							<Bookshelves />
						</ProtectedRoute>
					} />

					<Route path="/bookshelves/:id" element={
						<ProtectedRoute>
							<Bookshelf />
						</ProtectedRoute>
					} />

				</Route>

				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
