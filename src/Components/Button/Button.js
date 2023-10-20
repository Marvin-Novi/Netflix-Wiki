import './Button.css';
import React from "react";
import { Class } from "../../Constants/Css";

function Button(props) {
  return (
    <button type={props.Type} className={`${Class.BTN} ${props.Class}`} onClick={props.OnClick}>
      {props.Image ? 
      <>
      <img className={Class.BTN_IMAGE} src={props.Image} alt={props.Text} />
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
