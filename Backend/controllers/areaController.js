const { model } = require("mongoose");
const Area = require("../models/Area.js")

const store = async (req, res) => {
    if (req.body.length === undefined) {
        try {
            const { name } = req.body;
            const alreadyExist = await Area.findOne({ name })
            if (!alreadyExist) {
                const response = await Area.create(req.body)
                return res.json(response);
            }
            else {
                console.log(`${name} already exist`);
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
            alreadyExist = await Area.findOne({ name });
            if (alreadyExist) {
                console.log(`${name} already exist`);
                return res.json({ message: `${name} already exist` });
            }
        };
        try {
            const response = await Area.create(req.body)
            return res.json(response);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


const getAll = async (req, res) => {
    try {
        const categories = await Area.find();
        res.json(categories);
    } catch (error) {
    }
}


const deleteAll = async (req, res) => {
    try {
        categoriesDeleted = await Area.deleteMany();
        res.json(categoriesDeleted)
    } catch (error) {
    }
}



module.exports = { store, getAll, deleteAll }