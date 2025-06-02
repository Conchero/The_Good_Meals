const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/category.js");
const ingredientsRoutes = require("./routes/ingredient.js");
const areasRoutes = require("./routes/area.js");
const recipesRoutes = require("./routes/recipe.js");
const { migrateCategory, migrateIngredientsWithPicture, migrateArea, migrateRandomRecipe } = require("./mealAPIMigrator/mealAPIMigrator.js");
require('dotenv').config();



const PORT = parseInt(process.env.PORT) || 3001;

if (isNaN(PORT)) {
    console.error("PORT invalide");
    process.exit(1);
}

app.get("/", (req, res) => { res.send("this  is home") });

mongoose.connect(process.env.MONGOOSE_URI);

app.use(express.static('public'));
app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/categories", categoryRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/areas", areasRoutes);
app.use("/recipes", recipesRoutes);




app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
