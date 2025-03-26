const express = require("express");
const router = express.Router();
const {store,getAll,deleteAll, deleteByID, getRandomRecipe, getRecipe, getSelectionOfTheDay} = require("../controllers/recipeController.js");


router.post("/",store);
router.get("/",getAll);
router.get("/random",getRandomRecipe);
router.get("/day-selection",getSelectionOfTheDay);
router.get("/:name",getRecipe);
router.delete("/",deleteAll);
router.delete("/:id",deleteByID);

module.exports = router;