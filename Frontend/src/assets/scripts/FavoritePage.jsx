import { useEffect, useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import APIManager from "./APIManager";
import RecipeCard from "./RecipeCard";

const FavoritePage = () => {
    const [favoriteRecipesArray, setFavoriteRecipes] = useState([]);

    useEffect(() => {
        handleFavoriteRecipes();
    }, []);

    const handleFavoriteRecipes = async () => {
        if (JSON.parse(localStorage.getItem("favoriteRecipes"))) {
            const favoriteRecipesName = JSON.parse(localStorage.getItem("favoriteRecipes"));
            const newFavoriteRecipes = [];

            if (favoriteRecipesArray.length === 0) {
                for (const recipe of favoriteRecipesName) {
                    const response = await APIManager.fetchRecipe(recipe);
                    newFavoriteRecipes.push(...response);
                }

            }
            else {
                for (const recipe of favoriteRecipesName) {
                    favoriteRecipesArray.forEach(favorite => {
                        const compareName = favorite.title.toLowerCase().split(" ").join("-");
                        if (compareName === recipe) {
                            newFavoriteRecipes.push(favorite);
                        }
                    })
                }
            }
            setFavoriteRecipes(newFavoriteRecipes);
        }
        else {
            setFavoriteRecipes([]);
        }
    }

    if (favoriteRecipesArray.length > 0) {
        return (<>
            <Header canSearch={false} />
            <Menu />
                <h2 className="recipe_container--message">Your Favorite Recipes</h2>
            <section className="recipe_container">
                {favoriteRecipesArray.map(recipe => <RecipeCard key={recipe.title} recipePageDynamicRenderHandler={handleFavoriteRecipes} title={recipe.title} imgURL={recipe.image} area={recipe.area} category={recipe.category} />)}
            </section>

        </>)
    }
    else {
        return (<>
            <Header canSearch={false} />
            <Menu />
            <h2  className="recipe_container--message">No favorite recipes yet</h2>
        </>)
    }


}


export default FavoritePage;