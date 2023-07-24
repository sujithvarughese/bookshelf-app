import { useGlobalContext } from "../../context/GlobalContext.jsx";
import FormRow from "../../components/forms/FormRow.jsx";
import { useState } from "react";

const initialState = {
	email: "",
	password: ""
};

const LoginForm = () => {

	const { login } = useGlobalContext();

	// new state values for user input values
	const [values, setValues] = useState(initialState);
	// set state values as user types
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	// login function calls api with post request to validate login info
	// context will set state.user and isAdmin appropriately
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form className="flex gap-2" onSubmit={handleSubmit}>

			
			<FormRow placeholder="email" type="email" name="email" value={values.email} handleChange={handleChange} />
			<FormRow placeholder="password" type="password" name="password" value={values.password}
			         handleChange={handleChange} />

			<button className="mx-2 my-4 py-1 px-3 bg-teal-400 rounded-full hover:text-white">Login</button>


		</form>
	);
};

export default LoginForm;