import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const Header = (props) => {

    console.log(props.canSearch);
    return (
        <header>
            <FontAwesomeIcon icon={faBars} className="fake-button" />
            <div className="header__input">
                <h1 className={`fake-button ${props.canSearch ? "" : "font-size__big"}`}>The Good Meals</h1>
                <SearchBar canSearch={props.canSearch} />
            </div>
            <FontAwesomeIcon icon={faHeart} className="fake-button" />
        </header>)
}


export default Header;