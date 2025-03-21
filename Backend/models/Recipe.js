const mongoose = require("mongoose");
const { Schema } = mongoose;


const RecipeSchema = new Schema(
    {
        title: String,
           
        category: String,
     
        image: String,
       
        area: String,
   
        ingredients: {
            name: Array,
            portion: Array
        },
        instructions: Array,
    }
)


const Recipe = mongoose.model("Recipe",RecipeSchema);

module.exports = Recipe;