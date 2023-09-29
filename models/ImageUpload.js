const mongoose = require("mongoose");
const {Schema} = mongoose;

const ImageSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    imagesrc:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("images",ImageSchema);