const express = require("express");
const router = express.Router();
const {store, getAll, deleteAll} = require("../controllers/areaController.js");

router.post("/",store);
router.get("/",getAll);
router.delete("/",deleteAll);

module.exports = router;