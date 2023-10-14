import { Class } from "../../Constants/Css";

function EditForm(props) {
	return (
		<form className={Class.EDITFORM} onSubmit={props.OnSubmit}>
			{props.children}
		</form>
	);
}

export default EditForm;
