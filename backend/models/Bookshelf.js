import mongoose from 'mongoose'

const BookshelfSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	books: {
		type: [mongoose.Types.ObjectId],
		ref: "Book"
	},
	cover: {
		type: String
	},
	notes: {
		type: String
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	}
}, { timestamps: true })


export default mongoose.model('Bookshelf', BookshelfSchema)