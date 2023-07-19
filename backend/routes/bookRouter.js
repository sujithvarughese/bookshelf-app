import express from "express";
const router = express.Router();
import {
	getAllBooks,
	addBookToLibrary,
	removeBookFromLibrary,
	updateBookDetails,
} from "../controllers/bookController.js";

router.route("/")
      .get(getAllBooks)
      .post(addBookToLibrary)
      .patch(updateBookDetails)

router.route("/:id").delete(removeBookFromLibrary);



export default router;
