import { useState, useEffect } from "react";
import APIManager from "./APIManager";
import Tag from "./Tag";

const Menu = ({ handleCategoryTagClick = undefined }) => {

    const [categories, setCategories] = useState([]);
    const [area, setArea] = useState([]);
    const [ingdredients, setIngredients] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await APIManager.fetchCategoryList();
        setCategories(response);
    }


    return (<aside className="menu" id="menu">

        <div className="menu__categories--div">
            <h2>Category</h2>
            <div className="menu__categories--container">
                {categories.map((el, i) => <Tag key={el.name + i} name={el.name} inMenu={true} handleClick={handleCategoryTagClick !== undefined ? handleCategoryTagClick : () => { }} />)}
            </div>
        </div>


    </aside>)


}


export default Menu;