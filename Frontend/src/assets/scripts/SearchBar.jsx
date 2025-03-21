import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({canSearch = true,_dataToSearch = []}) => {


    return (
    <div className={`searchbar ${canSearch ? "" : "hidden" }`}>
        <label className="searchbar__label" htmlFor="searchbar__input">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text" id="searchbar__input" />
        </label>
        
    </div>)

}

export default SearchBar;