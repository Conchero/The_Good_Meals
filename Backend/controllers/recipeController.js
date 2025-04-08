const { model } = require("mongoose");
const Recipe = require("../models/Recipe.js");
const { response } = require("express");
const upload = require("../middleware/multer.js")


const store = async (req, res) => {
    let imageFile = undefined;
    upload.single("new-recipe__picture")( req, res,async (err) => {
        imageFile = req.file;
        const { title, category, area } = req.body;
        const ingredientNameArray = req.body.ingredients_name.split(",");
        const ingredientPortionArray = req.body.ingredients_portion.split(",");
        const instructionArray = req.body.instruction.split(",");

        const newRecipe = {
            title: title,
            
            category: category,
            
            image: imageFile.filename,
            
            area: area,
            
            ingredients: {
                name: ingredientNameArray,
                portion: ingredientPortionArray,
            },
            instructions: instructionArray,
        }

        console.log(newRecipe);

        try {
            const alreadyExist = await Recipe.findOne({ title });
            if (!alreadyExist) {
                const recipe = await Recipe.create(newRecipe);
    
                console.log(`Recipe put in database`, recipe);
            }
            else {
                console.log(`${title} already exist`);
                return res.json({ message: `${title} already exist` });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }

    })



    // const { title } = req.body;
}


const getAll = async (req, res) => {
    try {
        const response = await Recipe.find();

        let { category, area, ingredients } = require('url').parse(req.url, true).query;

        let filteredRecipe = response;

        if (category != undefined) {
            const tempFilter = filteredRecipe.filter(recipe => recipe.category === category);
            filteredRecipe = tempFilter;
        }

        if (area != undefined) {
            const tempFilter = filteredRecipe.filter(recipe => recipe.area === area);
            filteredRecipe = tempFilter;
        }

        if (ingredients != undefined) {
            const ingredientsArray = ingredients.split(",");
            const tempFilter = []
            filteredRecipe.forEach(recipe => {
                let haveIngredients = true;

                ingredientsArray.forEach(reqIngredient => {
                    const correctSyntax = reqIngredient.split("-").join(" ");
                    if (!recipe.ingredients.name.includes(correctSyntax)) {
                        haveIngredients = false;
                        return;
                    }
                })

                if (haveIngredients) {
                    tempFilter.push(recipe);
                }
            });
            filteredRecipe = tempFilter;
        }

        if (filteredRecipe.length <= 0) {
            return res.status(404).json({ status: 404, message: `Couldn't find any linked recipe` });
        }

        res.json(filteredRecipe);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getRandomRecipe = async (req, res) => {
    try {
        const response = await Recipe.find();
        const randomNumber = Math.floor(Math.random() * response.length);
        return res.json(response[randomNumber]);
    }
    catch {
        res.status(500).json(error);
    }
}

const getSelectionOfTheDay = async (req, res) => {
    try {
        const response = await Recipe.find();
        const nbMeal = 4;
        const mealsRandomNumber = [];

        while (mealsRandomNumber.length < nbMeal) {
            const randomNumber = Math.floor(Math.random() * response.length);
            if (!mealsRandomNumber.includes(randomNumber)) {
                mealsRandomNumber.push(randomNumber);
            }
        }
        const selectedRecipes = [];
        mealsRandomNumber.forEach(number => selectedRecipes.push(response[number]));

        return res.json(selectedRecipes);

    } catch (error) {
        res.status(500).json(error);
    }
}

const getRecipe = async (req, res) => {
    try {
        const response = await Recipe.find();
        const name = req.params.name.toLowerCase().split("-").join(" ");
        let closeFoundRecipe = [];
        let foundRecipe = [];


        //compare the search input wih existing recipe title
        //then make a percentage of corresponding letter 
        response.forEach(recipe => {
            const lowerRecipeName = recipe.title.toLowerCase();
            const searchLetters = []
            for (let i = 0; i < lowerRecipeName.length; i++) {
                if (i < name.length) {
                    if (lowerRecipeName[i] === name[i]) {
                        searchLetters.push(true);
                    }
                    else {
                        searchLetters.push(false);
                    }
                }
            }

            const lettersInCommon = searchLetters.filter(letter => letter === true);
            const lettersInCommonPercent = (lettersInCommon.length / searchLetters.length) * 100;

            if (lettersInCommonPercent >= 100) {
                foundRecipe.push(recipe);
            }
            else if (lettersInCommonPercent >= 20) {
                closeFoundRecipe.push(recipe);
            }

        });


        if (foundRecipe.length <= 0 && closeFoundRecipe.length <= 0) {
            return res.status(404).json({ status: 404, message: `Couldn't find any linked recipe` });
        }

        if (foundRecipe.length > 0) {
            res.json(foundRecipe);
        }
        else if (closeFoundRecipe.length > 0) {
            res.json(closeFoundRecipe);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

const deleteAll = async (req, res) => {
    try {
        const response = await Recipe.deleteMany();
        res.json(response)
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteByID = async (req, res) => {
    try {
        const { id } = req.params
        const response = await Recipe.findByIdAndDelete(id);
        if (response) {
            return res.status(203).json({ message: `${response} has been deleted` })
        }
        return res.json({ message: 'Recipe not found' })

    } catch (error) {
        res.status(500).json({ message: error });
    }
}



module.exports = { store, getAll, getRandomRecipe, getSelectionOfTheDay, getRecipe, deleteAll, deleteByID }
