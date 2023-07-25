import express from "express";

const router = express.Router();
import {
	getLibrary,
	addBookToLibrary,
	updateBookDetails,
	removeBookFromLibrary
} from "../controllers/bookController.js";

router.route("/")
      .get(getLibrary)
      .post(addBookToLibrary);

router.route("/:id")
      .patch(updateBookDetails)
      .delete(removeBookFromLibrary);


export default router;
