import express from "express";
const router = express.Router();
import {
	getAllBooks,
	addBookToLibrary,
	updateBookDetails,
	removeBookFromLibrary,
} from "../controllers/bookController.js";

router.route("/")
      .get(getAllBooks)
      .post(addBookToLibrary)

router.route("/:id")
      .patch(updateBookDetails)
      .delete(removeBookFromLibrary);



export default router;
