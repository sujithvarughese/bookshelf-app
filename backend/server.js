import app from './app.js'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./database/connect.js";

const port = process.env.PORT || 8800

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, ()=> {
			console.log(`Server is listening on port ${port}...`)
		} )
	} catch (error) {
		console.log(error)
	}
}

start()