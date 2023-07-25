import { useGlobalContext } from "../context/GlobalContext.jsx";
import { FormRow } from "../components/forms";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
	lastName: "",
	firstName: "",
	email: "",
	password: ""
};

const Register = () => {

	const { user, register } = useGlobalContext();

	// new state values for user input values
	const [values, setValues] = useState(initialState);
	// set state values as user types
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	// loginUser function calls api with post request to validate login info
	// context will set state.user and isAdmin appropriately
	const handleSubmit = (e) => {
		e.preventDefault();
		const { lastName, firstName, email, password } = values;
		if (!email || !password || !lastName || !firstName) {
			console.log("enter all values");
			return;
		}
		register({ lastName, firstName, email, password });
	};

	// automatically redirect appropriately if user credentials ok
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			console.log(`navigating to user home`);
			setTimeout(() => {
				navigate("/home");
			}, 1000);
		}
	}, [user]);

	return (
		<form onSubmit={handleSubmit} className="border-solid border-4 rounded-3xl w-11/12 my-20 mx-auto py-14 max-w-md">

			<div className="text-4xl m-8">register</div>

			<div className="m-10 space-y-10">
				<FormRow labelText="last name" type="text" name="lastName" value={values.lastName}
				         handleChange={handleChange} />

				<FormRow labelText="first name" type="text" name="firstName" value={values.firstName}
				         handleChange={handleChange} />

				<FormRow labelText="email" type="email" name="email" value={values.email} handleChange={handleChange} />

				<FormRow labelText="password" type="password" name="password" value={values.password}
				         handleChange={handleChange} />

				<button type="submit"
				        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs">
					register
				</button>

				<div>
					<span>Already a member?</span>
					<a href='/login'>Login</a>
				</div>
			</div>


		</form>
	);
};

export default Register;