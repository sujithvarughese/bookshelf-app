import express from "express";
const router = express.Router();
import {
	getAllBookshelves,
	getSingleBookshelf,
	addBookToBookshelf,
	deleteBookshelf
} from "../controllers/bookshelfController.js";

router.route("/").get(getAllBookshelves);
router.route("/:id").get(getSingleBookshelf).patch(addBookToBookshelf).delete(deleteBookshelf);

export default router;
