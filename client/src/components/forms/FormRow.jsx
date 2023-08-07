const FormRow = ({ labelText, placeholder, type, name, value, handleChange }) => {

	return (
		<div className="form-row">

			<label
				htmlFor={name}
				className="form-label"
			>
				{labelText}
			</label>

			<input
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				className="form-input"

			/>

		</div>
	);
};

export default FormRow;