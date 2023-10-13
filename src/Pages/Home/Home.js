import "./Home.css";
import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../Components/Button/Button";
import EmailField from "../../Components/TextFields/EmailField";
import { Routes, Types } from "../../Constants/Environment";
import { Class } from "../../Constants/Css";
import { Text } from "../../Constants/Messages";
import { string } from "../../Constants/Data";

function Home() {
  const history = useHistory();
  const [newRegister, setEmail] = React.useState(string.Empty);

  function handleRegistration() {
    if (newRegister) handleNavigation(Routes.Register + "/" + newRegister);
  }

  function handleNavigation(path) {
    history.push(path);
    history.goForward();
  }

  return (
    <div className={Class.home}>
      <header className={Class.txt_center}>
        <h1>{Text.Home_H1}</h1>
        <p>{Text.Home_Description}</p>
      </header>

      <section>
        <form className={Class.searchform} onSubmit={e => {e.preventDefault(); handleRegistration();}}>
          <EmailField Placeholder={Text.Emailaddress} OnInput={setEmail} />
          <Button Class={`${Class.btn_primary} ${Class.register_btn}}`} Text={Text.Register} Type={Types.Submit} />
        </form>
      </section>
    </div>
  );
}

export default Home;
