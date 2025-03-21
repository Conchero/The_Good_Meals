const { model } = require("mongoose");
const Recipe = require("../models/Recipe.js")



const store = async (req, res) => {
    const imageFile = req.body.file;
    try {
        const { title } = req.body;
        const alreadyExist = await Recipe.findOne({ title });
        if (!alreadyExist) {
            const recipe = await Recipe.create({
                ...req.body,
                image: imageFile !== undefined ? req.file.filename : req.body.image,
            });

            console.log(`Recipe put in database`, recipe.ingredients);
            return res.json({ message: req.body });
        }
        else {
            console.log(`${title} already exist`);
            return res.json({ message: `${tile} already exist` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
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
            res.status(404);
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

const getRecipe = async (req, res) => {
    try {
        const response = await Recipe.find();
        const name = req.params.name.toLowerCase().split("-");
        let foundRecipe = [];

        foundRecipe = response.filter(recipe => recipe.title.toLowerCase() === name.join(" "));

        if (foundRecipe.length === 0) {
            response.forEach(recipe => {
                const separatedTitle = recipe.title.toLowerCase().split(" ");
                let correspondToSearch = false;
                separatedTitle.forEach(title => {
                    name.forEach(word => {
                        if (title.includes(word)) {
                            correspondToSearch = true;
                            return;
                        }
                    })
                    if (correspondToSearch) {
                        return;
                    }
                })

                if (correspondToSearch) {
                    foundRecipe.push(recipe);
                }
            })

        } 
        
        if (foundRecipe.length <= 0) {
            return res.status(404);
        }


        res.json(foundRecipe);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

const deleteAll = async (req, res) => {
    try {
        response = await Recipe.deleteMany();
        res.json(response)
    } catch (error) {
        res.status(500).json(error);
    }
}



module.exports = { store, getAll, getRandomRecipe, getRecipe, deleteAll }
