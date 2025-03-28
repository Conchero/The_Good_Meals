import Header from "./Header"
import Footer from "./Footer"
import Menu from "./Menu"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import APIManager from "./APIManager"

const NewRecipePage = () => {

    const instructionInputTemplate = {
        id: "recipe-input-instruction",
        className: "recipe__input instruction",
        type: "text",
        instruction: "",
    }

    const ingredientsInputTemplate = [
        {
            id: "recipe-input-ingredient-name",
            className: "recipe__input ingredient-name",
            type: "text",
            ingredient: "",
        },
        {
            id: "recipe-input-ingredient-portion",
            className: "recipe__input ingredient-portion",
            type: "text",
            portion: "",
        }
    ]
    const [instructionArray, setInstructionArray] = useState([instructionInputTemplate]);
    const [ingredientArray, setIngredientArray] = useState([ingredientsInputTemplate]);

    const [categoriesArray, setCategoriesArray] = useState([]);
    const [areaArray, setAreaArray] = useState([]);
    const [recipePicture, setRecipePicture] = useState();


    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeCategory, setRecipeCategory] = useState("");
    const [recipeArea, setRecipeArea] = useState("");
    const [recipePictureFile, setRecipePictureFile] = useState();

    useEffect(() => {
        fetchCategoriesFromAPI();
        fetchAreaFromAPI();
    }, []);

    const fetchCategoriesFromAPI = async () => {
        const response = await APIManager.fetchCategoryList();
        setCategoriesArray(response);
    }

    const fetchAreaFromAPI = async () => {
        const response = await APIManager.fetchAreaList();
        setAreaArray(response);
    }


    const addInstructionInput = (e) => {
        const instructionDiv = document.querySelector(".recipe__instruction--div");
        const instructionInputArray = instructionDiv.querySelectorAll(".recipe__input");
        const newInputArray = [];

        instructionInputArray.forEach(el => newInputArray.push({
            id: el.id,
            className: el.classList.value,
            type: el.type,
            instruction: el.value,
        }));

        newInputArray.push(instructionInputTemplate);

        setInstructionArray(newInputArray);
    }


    const addIngredientsInput = (e) => {
        const ingredientSection = document.querySelector(".recipe__ingredient--div")
        const ingredientsDiv = ingredientSection.querySelectorAll(".ingredients-input-div");

        const newIngredientArray = []
        ingredientsDiv.forEach(div => {
            const ingredientName = div.querySelector("#recipe-input-ingredient-name");
            const ingredientPortion = div.querySelector("#recipe-input-ingredient-portion");

            const inputCopy = [
                {
                    id: ingredientName.id,
                    className: ingredientName.classList.value,
                    type: ingredientName.type,
                    ingredient: ingredientName.value,
                },
                {
                    id: ingredientPortion.id,
                    className: ingredientPortion.classList.value,
                    type: ingredientPortion.type,
                    portion: ingredientPortion.value,
                }
            ]

            newIngredientArray.push(inputCopy);
        })


        newIngredientArray.push(ingredientsInputTemplate);

        setIngredientArray(newIngredientArray)
    }


    const pictureUploadHandler = (e) => {
        // console.log(e.target.files[0]);
        // setRecipePictureFile(e.target.files[0]);
        // setRecipePicture({ src: URL.createObjectURL(e.target.files[0]), alt: e.target.files[0].name })
        setRecipePictureFile(e.target.value);
        setRecipePicture({ src: e.target.value, alt: "Placeholder Feature" })

    }


    const formSubmit = async (e) => {
        e.preventDefault();

        const recipeInstructions = [];
        const instructionDiv = document.querySelector(".recipe__instruction--div");
        const instructionInputArray = instructionDiv.querySelectorAll(".recipe__input");
        instructionInputArray.forEach(el => recipeInstructions.push(el.value));

        const recipeIngredientsName = [];
        const recipeIngredientsPortion = [];

        const ingredientSection = document.querySelector(".recipe__ingredient--div")
        const ingredientsDiv = ingredientSection.querySelectorAll(".ingredients-input-div");

        ingredientsDiv.forEach(div => {
            const ingredientName = div.querySelector("#recipe-input-ingredient-name");
            const ingredientPortion = div.querySelector("#recipe-input-ingredient-portion");

            recipeIngredientsName.push(ingredientName.value);
            recipeIngredientsPortion.push(ingredientPortion.value);

        })


        const newRecipe = {
            title: recipeTitle,

            category: recipeCategory,

            image: recipePictureFile,

            area: recipeArea,

            ingredients: {
                name: recipeIngredientsName,
                portion: recipeIngredientsPortion,
            },
            instructions: recipeInstructions,
        }



        console.log(verifyModelRecipeOnSubmit(newRecipe));

        if (!verifyModelRecipeOnSubmit(newRecipe).includes(false)) {

            const response = await fetch('http://localhost:3000/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecipe)
            });
        }
        else {
            for (let i = 0; i< verifyModelRecipeOnSubmit(newRecipe).length;i++)
            {
                const errorText = document.querySelector(`.error-input-${i+1}`);
                console.log(errorText);
                if (verifyModelRecipeOnSubmit(newRecipe)[i] ){
                    if (!errorText.classList.contains("hidden"))
                         errorText.classList.add("hidden");
                }
                else{
                    errorText.classList.remove("hidden");
                }
            }
        }

    }

    const minTitleLenght = 3;

    const verifyModelRecipeOnSubmit = (_newRecipeModel) => {
        const modelChecker = [];


        modelChecker.push(_newRecipeModel.title.length >= minTitleLenght);
        modelChecker.push(!_newRecipeModel.ingredients.name.includes("") && !_newRecipeModel.ingredients.portion.includes(""));
        modelChecker.push(!_newRecipeModel.instructions.includes("") )
        modelChecker.push(_newRecipeModel.category !== "");
        modelChecker.push(_newRecipeModel.area !== "");
        modelChecker.push(_newRecipeModel.image !== "" && _newRecipeModel.image !== undefined);
        
        console.log(!_newRecipeModel.ingredients.name.includes("") && !_newRecipeModel.ingredients.portion.includes(""))

        return modelChecker;
    }

    return (
        <>
            <Header canSearch={false} />
            <Menu />
            <section className="recipe_container under_header">
                <form>
                    <div className="new-recipe__input-div recipe__title--div">
                        <label htmlFor="recipe-label recipe-input-title">Title: </label>
                        <input id="recipe-input-title" className="recipe__input title" type="text" required onChange={(e) => setRecipeTitle(e.target.value)}></input>
                        <p className="error-input-1 error-input-new-recipe hidden">Please enter a title of minimum {minTitleLenght} characters</p>
                    </div>

                    <div className="new-recipe__input-div recipe__ingredient--div">
                        <label htmlFor="recipe-label recipe-input-ingredient">Ingredients</label>
                        {ingredientArray.map((el, i) => {

                            return (<div className="ingredients-input-div">
                                <input key={el[0].id + i} className={el[0].className} type={el[0].type} id={el[0].id} defaultValue={el[0].ingredient} required></input>
                                <input key={el[1].id + i} className={el[1].className} type={el[1].type} id={el[1].id} defaultValue={el[1].portion} required></input>
                            </div>)
                        })}
                        <div className="add-div fake-button" onClick={addIngredientsInput}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <p className="error-input-2 error-input-new-recipe hidden">Please make sure every ingredients and portion are filled</p>
                    </div>

                    <div className="new-recipe__input-div recipe__instruction--div">
                        <label htmlFor="recipe-label recipe-input-instruction">Instructions: </label>
                        {instructionArray.map((el, i) => <input key={el.id + i} className={el.className} type={el.type} id={el.id} defaultValue={el.instruction} required></input>)}
                        <div className="add-div fake-button" onClick={addInstructionInput}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <p className="error-input-3 error-input-new-recipe hidden">Please make sure every instructions are filled</p>
                    </div>

                    <div className="new-recipe__input-div recipe__category">
                        <label htmlFor="recipe-label recipe-select-category">Category :</label>
                        <select className="recipe-select" id="recipe-select-category" onChange={(e) => setRecipeCategory(e.target.value)} required>
                            <option value="">---Please Select A Category---</option>
                            {categoriesArray.map((category, i) => <option value={category.name}>{category.name}</option>)}
                        </select>
                        <p className="error-input-4 error-input-new-recipe hidden">Please Select a category</p>
                    </div>

                    <div className="new-recipe__input-div recipe__area">
                        <label htmlFor="recipe-label recipe-select-area">Area :</label>
                        <select className="recipe-select" id="recipe-select-area" onChange={(e) => setRecipeArea(e.target.value)} required>
                            <option value="">---Please Select An Area---</option>
                            {areaArray.map((area, i) => <option value={area.name}>{area.name}</option>)}
                        </select>
                        <p className="error-input-5 error-input-new-recipe hidden">Please Select an area</p>
                    </div>

                    <div className="new-recipe__input-div recipe__image">
                        <label htmlFor="recipe-label recipe-image-file">Recipe Picture</label>
                        {/* <input type="file" onChange={pictureUploadHandler} accept=".jpg, .jpeg, .png" required></input> */}
                        <input className="recipe__input" type="text" onChange={pictureUploadHandler} required></input>
                        {recipePicture ? <img className="newrecipe__image recipe__img" src={recipePicture.src} alt={recipePicture.alt} /> : <h4 className="no-picture-text">No Picture Uploaded yet</h4>}
                        <p className="error-input-6 error-input-new-recipe hidden">Please select a picture</p>
                    </div>


                    <button className="form-button" type="submit" onClick={formSubmit}>Add new recipe</button>

                </form>
            </section>
            <Footer />
        </>)
}

export default NewRecipePage;