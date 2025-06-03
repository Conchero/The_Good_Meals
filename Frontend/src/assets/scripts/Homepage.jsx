import { useEffect, useState } from "react";
import Header from "./Header"
import APIManager from "./APIManager";
import RecipeCard from "./RecipeCard";
import ErrorPage from "./ErrorPage";
import Menu from './Menu'

let categoryFilter = "";
let areaFilter = "";

const Homepage = () => {
    const [message, setMessage] = useState("");
    const [errorObject, setErrorObject] = useState({})
    const [recipesArray, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetchDaySelectionFromAPI();
    }, [])


    const fetchDaySelectionFromAPI = async () => {
        setLoading(true);
        const response = await APIManager.fetchDaySelectionRecipes();
        setRecipes(response);
        setMessage("Some Recommandation :");
        setLoading(false);

    }

    const searchRecipe = async (e) => {

        setLoading(true);

        if (e.target.value.length > 0) {
            const response = await APIManager.fetchRecipe(e.target.value.toLowerCase().split(" ").join("-"));
            if (response.status) {
                setErrorObject({ haveError: true, status: response.status, message: response.message });
            }
            else {
                setErrorObject({ haveError: false });
                setRecipes(response);
                setMessage("Found Recipes :")
            }
        }
        else {
            setErrorObject({ haveError: false });
            fetchDaySelectionFromAPI();
        }
        setLoading(false);
    }


    const handleCategoryTagClick = async (e) => {
        const categoriesContainer = document.querySelector(".menu__categories--container");
        const categoriesTag = categoriesContainer.querySelectorAll(".tag");
        categoryFilter = (handleSingleTagClick(e.target, categoriesTag));
        fetchRecipeWithFilterFromAPI();
    }


    const handleAreaTagClick = (e) => {
        const container = document.querySelector(".menu__area--container");
        const tagArray = container.querySelectorAll(".tag");
        areaFilter = (handleSingleTagClick(e.target, tagArray));
        fetchRecipeWithFilterFromAPI();
    }

    const handleSingleTagClick = (target, tagArray) => {
        const tagClass = "selected";
        let cancelSelf = false;

        tagArray.forEach((el) => {
            if (el.classList.contains(target.innerText) && el.classList.contains(tagClass)) {
                el.classList.remove(tagClass)
                cancelSelf = true;
                return;
            }
            if (el.classList.contains(tagClass)) {
                el.classList.remove(tagClass);
            }
        })

        if (!cancelSelf) {
            target.classList.toggle(tagClass);
            console.log(target.innerText);
            return target.innerText;
        }
        else {
            return "";
        }
    }


    const fetchRecipeWithFilterFromAPI = async () => {
        setLoading(true);
        const response = await APIManager.fetchRecipeWithFilter(categoryFilter, areaFilter)
        if (response === undefined) {
            setErrorObject({ haveError: false });
            fetchDaySelectionFromAPI();
        }
        else {
            if (response.status) {
                setErrorObject({ haveError: true, status: response.status, message: response.message });
            }
            else {
                setErrorObject({ haveError: false });
                setRecipes(response);
                setMessage("Found Recipes :")
            }
        }
        setLoading(false);
    }

    if (errorObject.haveError) {
        return (<>
            <Header canSearch={true} _dataToSearch={recipesArray} _searchFunction={searchRecipe} />
            <section className="recipe_container">
                <ErrorPage status={errorObject.status} message={errorObject.message} />
                <Menu handleCategoryTagClick={handleCategoryTagClick} handleAreaTagClick={handleAreaTagClick} />
            </section>
        </>)

    }
    else if (!loading) {
        return (
            <>
                <Header canSearch={true} _dataToSearch={recipesArray} _searchFunction={searchRecipe} />
                <h2 className="recipe_container--message">{message}</h2>
                <Menu handleCategoryTagClick={handleCategoryTagClick} handleAreaTagClick={handleAreaTagClick} />
                <section className="recipe_container">
                    {recipesArray.map(recipe => {
                        return <RecipeCard key={recipe.title} title={recipe.title} imgURL={recipe.image} area={recipe.area} category={recipe.category} />
                    })}
                </section>
            </>)
    } else {
        return (
            <>
                <Header canSearch={true} _dataToSearch={recipesArray} _searchFunction={searchRecipe} />
                <h2 className="recipe_container--message loading ">Loading...</h2>
                <Menu handleCategoryTagClick={handleCategoryTagClick} handleAreaTagClick={handleAreaTagClick} />
            </>)
    }


}


export default Homepage;