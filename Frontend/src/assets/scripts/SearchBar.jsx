import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


const SearchBar = ({ canSearch = true, _dataToSearch = [], _searchFunction = undefined }) => {

    const [inputValue, setInputValue] = useState("");

    return (
        <div className={`searchbar ${canSearch ? "" : "hidden"}`}>
            <label className="searchbar__label" htmlFor="searchbar__input">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input autoComplete="off" type="text" id="searchbar__input" value={inputValue} onChange={(e) => {
                    setInputValue(e.target.value);
                    if (_searchFunction) _searchFunction(e);
                }} />
            </label>

        </div>)

}

export default SearchBar;