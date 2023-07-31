import { useGlobalContext } from "../context/GlobalContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Alert = () => {

	const { alertText, alertStyle } = useGlobalContext();

	const toastOptions = {
		position: "top-center",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light"
	};
	const toastAlert = (alertText, alertStyle) => {
		switch (alertStyle) {
			case "success":
				toast.success(alertText, toastOptions);
				break;
			case "info":
				toast.info(alertText, toastOptions);
				break;
			case "error":
				toast.error(alertText, toastOptions);
				break;
			default:
				toast(alertText, toastOptions);
		}
	};

	useEffect(() => {
		toastAlert(alertText, alertStyle);
	}, []);

	return (
		<div className="">
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light" />
		</div>
	);
};

export default Alert;