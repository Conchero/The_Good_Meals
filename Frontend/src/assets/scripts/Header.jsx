import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
const Header = ({ canSearch = true, _dataToSearch = [], _searchFunction = undefined }) => {

    const navigate = useNavigate();

    const onMenuClick = (e) => {
        const menuObj = document.getElementById("menu");
        menuObj.classList.toggle("slide")
        console.log(menuObj);
    }

    return (
        <header>
            <FontAwesomeIcon icon={faBars} className="fake-button icons" onClick={onMenuClick} />
            <div className="header__input">
                <h1 className={`header-title fake-button ${canSearch ? "" : "font-size__big"}`} onClick={(e) => navigate("/")}>The Good Meals</h1>
                <SearchBar canSearch={canSearch} _searchFunction={_searchFunction} />
            </div>
            <Link to="/favorites"><FontAwesomeIcon icon={faHeart} className="fake-button icons" /></Link>
        </header>)
}


export default Header;