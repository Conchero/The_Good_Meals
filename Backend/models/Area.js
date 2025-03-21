const mongoose = require("mongoose");
const {Schema} = mongoose;


const AreaSchema = new Schema({
    name: String,

})

const Area = mongoose.model("Area", AreaSchema);

module.exports = Area;