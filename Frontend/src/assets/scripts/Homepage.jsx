import { useEffect, useState } from "react";
import Header from "./Header"
import APIManager from "./APIManager";
import RecipeCard from "./RecipeCard";
import ErrorPage from "./ErrorPage";
import Menu from './Menu'

const Homepage = () => {


    const [errorObject, setErrorObject] = useState({})
    const [recipesArray, setRecipes] = useState([]);

    useEffect(() => {
        fetchDaySelectionFromAPI();
    }, [])

    const fetchDaySelectionFromAPI = async () => {
        const response = await APIManager.fetchDaySelectionRecipes();
        setRecipes(response);
    }

    const searchRecipe = async (e) => {
        if (e.target.value.length > 0) {
            const response = await APIManager.fetchRecipe(e.target.value.toLowerCase().split(" ").join("-"));
            if (response.status) {
                setErrorObject({ haveError: true, status: response.status, message: response.message });
            }
            else {
                setErrorObject({ haveError: false });
                setRecipes(response);
            }
        }
        else {
            fetchDaySelectionFromAPI();
        }
    }

    const handleCategoryTagClick = (e) => {
        const categoriesContainer = document.querySelector(".menu__categories--container");
        const categoriesTag = categoriesContainer.querySelectorAll(".tag");
        const tagClass = "selected";

        categoriesTag.forEach((el) => {
            if (el.classList.contains(tagClass)) {
                (el.classList.remove(tagClass))
            }
        })

        e.target.classList.toggle(tagClass);

        console.log(e.target);
        console.log(categoriesContainer);
        console.log(categoriesTag);
    }

    if (errorObject.haveError) {
        return (<>
            <Header canSearch={true} _dataToSearch={recipesArray} _searchFunction={searchRecipe} />
            <section className="recipe_container">
                <Menu handleCategoryTagClick={handleCategoryTagClick} />
                <ErrorPage status={errorObject.status} message={errorObject.message} />
            </section>
        </>)

    }
    else {
        return (
            <>
                <Header canSearch={true} _dataToSearch={recipesArray} _searchFunction={searchRecipe} />
                <section className="recipe_container">
                    <Menu handleCategoryTagClick={handleCategoryTagClick} />
                    {recipesArray.map(recipe => <RecipeCard title={recipe.title} imgURL={recipe.image} area={recipe.area} category={recipe.category} />)}
                </section>
            </>)
    }


}


export default Homepage;