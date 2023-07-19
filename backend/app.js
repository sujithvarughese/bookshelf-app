import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import Book from "./models/Book.js";
import { StatusCodes } from "http-status-codes";
import bookRouter from "./routes/bookRouter.js";
import bookshelfRouter from "./routes/bookshelfRouter.js";

const app = express();
dotenv.config();

app.use(cors({
  origin: ["https://openlibrary.org", 'http://localhost:5173'],
  credentials: true
}))

app.use(express.json())

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("bookshelf-api");
});

app.use("/api/v1/library", bookRouter);
app.use("/api/v1/bookshelves", bookshelfRouter);

export default app;
