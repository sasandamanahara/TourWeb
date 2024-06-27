const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partnerSchema = new Schema({
    name:{
        type : String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
});

const Partner=mongoose.model('Partner',partnerSchema);
module.exports=Partner;