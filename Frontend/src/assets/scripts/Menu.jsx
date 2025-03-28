import { useState, useEffect } from "react";
import APIManager from "./APIManager";
import Tag from "./Tag";
import SearchBar from "./SearchBar";

const Menu = ({ handleCategoryTagClick = undefined, handleAreaTagClick = undefined}) => {

    const [categories, setCategories] = useState([]);
    const [area, setArea] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchArea();
    }, []);

    const fetchCategories = async () => {
        const response = await APIManager.fetchCategoryList();
        setCategories(response);
    }

    const fetchArea = async () => {
        const response = await APIManager.fetchAreaList();
        setArea(response);
    }


    return (<aside className="menu slide" id="menu">

        <div className="menu__categories--div menu__tag--div">
            <h2>Category</h2>
            <div className="menu__categories--container menu__tag--container">
                {categories.map((el, i) => <Tag key={el.name + i} name={el.name} inMenu={true} handleClick={handleCategoryTagClick !== undefined ? handleCategoryTagClick : () => { }} />)}
            </div>
        </div>

        <div className="menu__area--div menu__tag--div">
            <h2>Area</h2>
            <div className="menu__area--container menu__tag--container">
                {area.map((el, i) => <Tag key={el.name + i} name={el.name} inMenu={true} handleClick={handleAreaTagClick !== undefined ? handleAreaTagClick : () => { }} />)}
            </div>
        </div>


        {/* <div className="menu__ingredient--div">
            <h2>Ingredients</h2>
                <SearchBar className="ingredient__searchBar" />
            <div className="menu__ingredient--container">
                {ingdredients.map((el, i) => <Tag key={el.name + i} name={el.name} inMenu={true} handleClick={handleCategoryTagClick !== undefined ? handleCategoryTagClick : () => { }} />)}
            </div>
        </div> */}


    </aside>)


}


export default Menu;