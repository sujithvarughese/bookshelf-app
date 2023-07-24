import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

//security package imports
import cors from "cors";
// router imports
import bookRouter from "./routes/bookRouter.js";
import bookshelfRouter from "./routes/bookshelfRouter.js";
import authRouter from "./routes/authRouter.js";
// remaining middleware imports
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
import { authenticateUser, authorizePermissions } from "./middleware/authentication.js";

//---------------------//
const app = express();
dotenv.config();

app.use(cors({
	origin: ["https://openlibrary.org", "http://localhost:5173"],
	credentials: true
}));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

app.get("/", (req, res) => {
	res.send("bookshelf-api");
});

app.use("/api/v1/library", authenticateUser, authorizePermissions, bookRouter);
app.use("/api/v1/bookshelves", authenticateUser, authorizePermissions, bookshelfRouter);
app.use("/api/v1/auth", authRouter);  // login, logout, register


export default app;
