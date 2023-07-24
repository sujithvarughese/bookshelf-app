import { useGlobalContext } from "../context/GlobalContext.jsx";
import { FormRow } from "../components/forms";
import { useState } from "react";

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
	};

	return (
		<div className="border-solid border-4 rounded-3xl w-11/12 my-20 mx-auto py-14 max-w-md">

			<div className="text-4xl m-8">Login</div>

			<div className="m-10 space-y-10">
				<FormRow labelText="last name" type="text" name="lastName" value={values.lastName}
				         handleChange={handleChange} />

				<FormRow labelText="first name" type="text" name="firstName" value={values.firstName}
				         handleChange={handleChange} />

				<FormRow labelText="email" type="email" name="email" value={values.email} handleChange={handleChange} />

				<FormRow labelText="password" type="password" name="password" value={values.password}
				         handleChange={handleChange} />
			</div>


		</div>
	);
};

export default Register;