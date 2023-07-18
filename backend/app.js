import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
dotenv.config()

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}

app.get('/', (req, res) => {
	res.send('bookshelf-api')
})

export default app