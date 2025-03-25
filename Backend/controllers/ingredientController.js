const { model } = require("mongoose");
const Ingredient = require("../models/Ingredient.js")


const store = async (req, res) => {

    if (req.body.length === undefined)
    {
        try {
            const { name } = req.body;
            const alreadyExist = await Ingredient.findOne({ name })
            if (!alreadyExist) {
                const response = await Ingredient.create(req.body)
                return res.json(response);
            }
            else {
                return res.json({ message: `${name} already exist` });
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        let alreadyExist =false;
        for (const element of req.body)
        {
                const name = element.name;
                 alreadyExist = await Ingredient.findOne({ name });
                 if(alreadyExist)
                 {
                    console.log(`${name} already exist`);
                   return res.json({ message: `${name} already exist` });
                 }
        };
        try {
                const response = await Ingredient.create(req.body)
                return res.json(response);
        } catch (error) {
            res.status(500).json(error)
        }
    }


}


const getAll = async (req, res) => {
    try {
        const response = await Ingredient.find();
        return res.json(response);
    } catch (error) {
    }
}


const getIngredientByName = async (req,res) => {
    try {
        const response = await Ingredient.find();
        const name = req.params.name.toLowerCase();

        const foundIngredient = response.filter(el => el.name.toLowerCase().split(" ").join("-") === name);
        if (foundIngredient.length > 0)
        {
            return res.json(foundIngredient[0]);
        }
        else{
            return res.json({ message: `couldn't find ${name}`  });
        }
    } catch (error) {
        return res.json({ message: `${error}`  });
    }   
}

const deleteAll = async (req, res) => {
    try {
        response = await Ingredient.deleteMany();
        res.json(response);
    } catch (error) {
    }
}



module.exports = { store, getAll, deleteAll, getIngredientByName }