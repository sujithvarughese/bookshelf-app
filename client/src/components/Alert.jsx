import { useGlobalContext } from "../context/GlobalContext.jsx";

const Alert = () => {

	const { alertStyle, alertText } = useGlobalContext()

	return (
		<div>
			{alertText}
		</div>
	);
};

export default Alert;