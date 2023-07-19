import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please provide book Title'],
		unique: [true, 'BookAPI already in library!']
	},
	authors: {
		type: [String],
		required: [true, 'Please provide Author(s)']
	},
	coverID: {
		type: String
	},
	firstPublishYear: {
		type: String
	},
	subject: {
		type: [String]
	},
	genre: {
		type: String
	},
	pages: {
		type: Number
	},
	status: {
		type: String,
		enum: ['read', 'unread', 'reading']
	},
	rating: {
		type: Number,
		min: 1,
		max: 10
	},
	userRating: {
		type: Number,
		min: 1,
		max: 10
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

export default mongoose.model('Book', BookSchema)