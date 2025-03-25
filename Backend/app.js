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

app.get("/", (req, res) => { res.send("this  is home") });

mongoose.connect(`mongodb+srv://vlixdivers:A4wBxUE8KVXd1tXj@restaurantapplication.tsghp.mongodb.net/?retryWrites=true&w=majority&appName=RestaurantApplication`).then(() => {
    console.log("Base de donnée connectée")
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/categories", categoryRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/areas", areasRoutes);
app.use("/recipes", recipesRoutes);

app.listen(3000);


// migrateArea();
// migrateIngredientsWithPicture();
// migrateCategory();
// migrateRandomRecipe();

// for (let i = 0; i<30;i++)
// {
//     migrateRandomRecipe();
// }
