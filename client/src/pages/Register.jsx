import { useGlobalContext } from "../context/GlobalContext.jsx";
import { FormRow } from "../components/forms";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import GuestLogin from "../components/GuestLogin.jsx";

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
		if (user && Object.keys(user).length > 0) {
			console.log(`navigating to user home`);
			setTimeout(() => {
				navigate("/home");
			}, 1000);
		}
	}, [user]);

	return (
		<form onSubmit={handleSubmit} className="form max-w-lg">

			<div className="form-title">register</div>
			<div className="form-content">
				<FormRow labelText="last name" type="text" name="lastName" value={values.lastName}
				         handleChange={handleChange} />

				<FormRow labelText="first name" type="text" name="firstName" value={values.firstName}
				         handleChange={handleChange} />

				<FormRow labelText="email" type="email" name="email" value={values.email} handleChange={handleChange} />

				<FormRow labelText="password" type="password" name="password" value={values.password}
				         handleChange={handleChange} />

				<button type="submit" className="btn my-6">Register</button>

				<div>
					<span className="text">Already a member?</span>
					<NavLink className="link px-1" to="/login">Login</NavLink>
				</div>

				<GuestLogin />

			</div>


		</form>
	);
};

export default Register;