import './TopMenu.css';
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ScopedContext } from '../../Contexts/ScopedContextProvider';
import Search from '../../Resources/Images/Search.svg';
import { Rapid_Keys } from '../../Data/RapidApiEntities';
import { Text } from '../../Constants/Messages';
import { Class, Id } from '../../Constants/Css';
import { Routes, Types } from '../../Constants/Environment';
import { string } from '../../Constants/Data';

function Searhbar() {
    const { selectedCountry } = useContext(ScopedContext);
    const history = useHistory();
    let [searchArgs, setSearchArgs] = useState('');

    function handleSearch() {
        
        if (searchArgs && searchArgs !== string.Empty) {
            history.push(`/${Routes.Search}?${Rapid_Keys.country_list}=${selectedCountry?.id}&${Rapid_Keys.limit}=${selectedCountry?.tvids}&${Rapid_Keys.title}=${searchArgs}`);
            history.goForward();
        }

    }

    return (
        <form id={Id.search_form} onSubmit={e => { e.preventDefault(); handleSearch(); }}>
            <input id={Id.search_input} type={Types.Text} placeholder={Text.Search} name={Text.Search} onInput={e =>{setSearchArgs(e.target.value);} } />
            <button id={Id.search_button} type={Types.Submit}><img className={Class.search_img} src={Search} alt={Text.Loading} /></button>
        </form>
    );
}

export default Searhbar;