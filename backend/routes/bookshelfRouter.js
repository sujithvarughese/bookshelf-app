import express from "express";
const router = express.Router();
import {
	getAllBookshelves,
	getBookshelf,
	createBookshelf,
	updateBookshelf,
	deleteBookshelf,
	addBookToBookshelf,
	removeBookFromBookshelf,
} from "../controllers/bookshelfController.js";

router.route("/")
      .get(getAllBookshelves)
      .post(createBookshelf);
router.route("/:id")
      .get(getBookshelf)
      .patch(updateBookshelf)
      .delete(deleteBookshelf);
router.route("/add/:id")
      .patch(addBookToBookshelf)
router.route("/remove/:id")
      .patch(removeBookFromBookshelf)


export default router;
