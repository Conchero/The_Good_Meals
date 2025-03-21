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

        if (area != undefined){
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
        //console.log(filteredRecipe);

        res.json(filteredRecipe);
    } catch (error) {
    }
}


const deleteAll = async (req, res) => {
    try {
        response = await Recipe.deleteMany();
        res.json(response)
    } catch (error) {
    }
}



module.exports = { store, getAll, deleteAll }
