import jwt from 'jsonwebtoken'


const createJWT = ({ payload }) => {
	return jwt.sign(
		payload,
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	)
}

const validateJWT = ({ token }) => {
	return jwt.verify(token, process.env.JWT_SECRET)
}

export { createJWT, validateJWT }