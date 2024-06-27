const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toursSchema = new Schema({
    
    tourName:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    discription:{
        type:String,
        required:true
    }
});
const Tour=mongoose.model('tour',toursSchema);
module.exports=Tour;