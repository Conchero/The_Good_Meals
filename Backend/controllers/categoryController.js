const { model } = require("mongoose");
const Category = require("../models/Category.js")


const store = async (req, res) => {
    if (req.body.length === undefined) {
        try {
            const { name } = req.body;
            const alreadyExist = await Category.findOne({ name })
            if (!alreadyExist) {
                const category = await Category.create(req.body)
                return res.json(category);
            }
            else {
                return res.json({ message: `${name} already exist` });
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        let alreadyExist = false;
        for (const element of req.body) {
            const name = element.name;
            alreadyExist = await Category.findOne({ name });
            if (alreadyExist) {
                return res.json({ message: `${name} already exist` });
            }
        };
        try {
            const response = await Category.create(req.body)
            return res.json(response);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
    }
}


const deleteAll = async (req, res) => {
    try {
        categoriesDeleted = await Category.deleteMany();
        res.json(categoriesDeleted)
    } catch (error) {
    }
}



module.exports = { store, getAll, deleteAll }



