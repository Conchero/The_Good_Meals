const mongoose = require("mongoose");

const {Schema} = mongoose;

const IngredientSchema = new Schema({
    name: String,
    image: String, 
})

const Ingredient = mongoose.model("Ingredient",IngredientSchema);

module.exports = Ingredient;