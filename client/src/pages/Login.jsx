import { useGlobalContext } from "../context/GlobalContext.jsx";
import { FormRow } from "../components/forms";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const initialState = {
	email: "",
	password: ""
};

const Login = () => {

	const { login } = useGlobalContext();

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
		const { email, password } = values;
		if (!email || !password) {
			console.log("enter all values");
			return;
		}
		login({ email, password });
	};


	return (
		<form onSubmit={handleSubmit}
		      className="form max-w-lg">

			<div className="form-title">Login</div>

			<div className="form-content">
				<FormRow labelText="email" type="email" name="email" value={values.email} handleChange={handleChange} />

				<FormRow labelText="password" type="password" name="password" value={values.password}
				         handleChange={handleChange} />

				<button type="submit"
				        className="btn my-6">
					Login
				</button>

				<div>
					<span className="decoration-none">Not a member yet?  </span>
					<NavLink className="link"
					         to="/register"> Register</NavLink>
				</div>
			</div>


		</form>
	);
};

export default Login;