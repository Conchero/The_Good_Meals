const express = require("express");
const router = express.Router();

const {store,getAll, deleteAll, getIngredientByName} = require("../controllers/ingredientController");


router.post("/",store);
router.get("/",getAll);
router.get("/:name",getIngredientByName);
router.delete("/",deleteAll);


module.exports = router;