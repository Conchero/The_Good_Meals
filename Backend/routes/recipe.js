const express = require("express");
const router = express.Router();
const {store,getAll,deleteAll, getRandomRecipe, getRecipe} = require("../controllers/recipeController.js");


router.post("/",store);
router.get("/",getAll);
router.get("/random",getRandomRecipe);
router.get("/:name",getRecipe);
router.delete("/",deleteAll);

module.exports = router;