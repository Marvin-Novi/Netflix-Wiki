import './Button.css';
import { Class } from "../../Constants/Css";

function Button(props) {
  return (
    <button type={props.Type} className={`${Class.btn} ${props.Class}`} onClick={props.OnClick}>
      {props.Text}
    </button>
  );
}

export default Button;
