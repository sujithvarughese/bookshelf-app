const FormRow = ({ labelText, placeholder, type, name, value, handleChange }) => {

	return (
		<div className="">

			<label
				htmlFor={name}
				className="mt-3 block"
			>
				{labelText}
			</label>

			<input
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				className="bg-color-grey shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

			/>

		</div>
	);
};

export default FormRow;