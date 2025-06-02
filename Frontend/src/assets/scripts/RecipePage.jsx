import { useEffect, useState } from "react";
import { useParams } from "react-router";
import APIManager from "./APIManager";
import IngredientCard from "./IngredientCard";
import Header from "./Header";
import Menu from "./Menu";

const RecipePage = () => {
    const { name } = useParams();
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        fetchLinkedRecipe();
    }, []);

    const fetchLinkedRecipe = async () => {
        const response = await APIManager.fetchRecipe(name);
        setRecipe(response[0]);
    }




    if (recipe) {
        const pathToImage = recipe.image.includes("https") ? recipe.image : `../../../public/RecipeImages/${recipe.image}`;
        const articleStyle = {
            backgroundImage: `url(${pathToImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            aspectRatio: 1 / 1,
        }

        return (
            <>
                <Header canSearch={false} />
                <Menu />
                <section className="recipe__info">
                    <h2 className="recipe__title">{recipe.title}</h2>
                    <div className="recipe__info--image recipe__img" style={articleStyle}></div>
                    <div className="recipe__info--main">
                        <h3 className="recipe__ingredients--title">Ingredients :</h3>
                        <div className="recipe__info--ingredients">
                            {recipe.ingredients.name.map((el, i) => <IngredientCard key={i} portion={recipe.ingredients.portion[i]} name={el} />)}
                        </div>
                    </div>
                </section>
                <div className="recipe__instruction">
                    <h3 className="recipe__instruction--title">Instructions: </h3>
                    {recipe.instructions.filter(instruction => instruction != `\r` && instruction != "" && !instruction.trim().toLowerCase().replace(/[0-9]/g, '').includes("step")).map((instruction, i) => {
                        return <h4 key={i} className="recipe__instruction--line">{`${i + 1}/ ${instruction}`}</h4>
                    })}
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <Header canSearch={false} />
                <Menu />
                <h2>Loading...</h2>
            </>
        )
    }

}


export default RecipePage;