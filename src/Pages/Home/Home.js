import "./Home.css";
import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../Components/Button/Button";
import EmailField from "../../Components/TextFields/EmailField";
import { Routes, Types } from "../../Constants/Environment";
import { Class } from "../../Constants/Css";
import { Text } from "../../Constants/Messages";
import { String} from "../../Constants/Data";

function Home() {
  const history = useHistory();
  const [newRegister, setEmail] = React.useState(String.Empty);

  function handleRegistration() {
    if (newRegister) handleNavigation(Routes.REGISTER + "/" + newRegister);
  }

  function handleNavigation(path) {
    history.push(path);
    history.goForward();
  }

  return (
    <div className={Class.HOME}>
      <header className={Class.TXT_CENTER}>
        <h1>{Text.Home_H1}</h1>
        <p>{Text.Home_Description}</p>
      </header>

      <section>
        <form className={Class.SEARCH_FORM} onSubmit={e => {e.preventDefault(); handleRegistration();}}>
          <EmailField Placeholder={Text.Emailaddress} OnInput={setEmail} />
          <Button Class={`${Class.BTN_PRIMARY} ${Class.REGISTER_BTN}}`} Text={Text.Register} Type={Types.SUBMIT} />
        </form>
      </section>
    </div>
  );
}

export default Home;
