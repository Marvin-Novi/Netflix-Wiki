import './Button.css';
import { Class } from "../../Constants/Css";

function Button(props) {
  return (
    <button type={props.Type} className={`${Class.btn} ${props.Class}`} onClick={props.OnClick}>
      {props.Image ? 
      <>
      <img className={Class.btn_image} src={props.Image} alt={props.Text} />
      </>
      :
      <>
      </>
      }
      {props.Text}
    </button>
  );
}

export default Button;
