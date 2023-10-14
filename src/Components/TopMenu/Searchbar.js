import './TopMenu.css';
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ScopedContext } from '../../Contexts/ScopedContextProvider';
import Search from '../../Resources/Images/Search.svg';
import { Rapid_Keys } from '../../Data/RapidApiEntities';
import { Text } from '../../Constants/Messages';
import { Class, Id } from '../../Constants/Css';
import { Routes, Types } from '../../Constants/Environment';
import { String } from '../../Constants/Data';

function Searhbar() {
    const { selectedCountry } = useContext(ScopedContext);
    const history = useHistory();
    let [searchArgs, setSearchArgs] = useState(String.Empty);

    function handleSearch() {
        
        if (searchArgs && searchArgs !== String.Empty) {
            history.push(`/${Routes.SEARCH}?${Rapid_Keys.country_list}=${selectedCountry?.id}&${Rapid_Keys.limit}=${selectedCountry?.tvids}&${Rapid_Keys.title}=${searchArgs}`);
            history.goForward();
        }
    }

    return (
        <form id={Id.SEARCH_FORM} onSubmit={e => { e.preventDefault(); handleSearch(); }}>
            <input id={Id.SEARCH_INPUT} type={Types.TEXT} placeholder={Text.Search} name={Text.Search} onInput={e =>{setSearchArgs(e.target.value);} } />
            <button id={Id.SEARCH_BUTTON} type={Types.SUBMIT}><img className={Class.SEARCH_IMG} src={Search} alt={Text.Loading} /></button>
        </form>
    );
}

export default Searhbar;