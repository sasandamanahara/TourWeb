const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    tourist:{
        type:Schema.Types.ObjectId,
        ref:'Tourist',
        required:true
    },
    tourName:{
        type:Schema.Types.ObjectId,
        ref:'Tours',
        required:true
    },
    /*
    price:{
        type: Number,
        required:true
    },*/

    
    total: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    bookingStatus: {
        type: String,
        required: true,

    },
    file: {
        type: String,
        required: true,
    }
});

const Booking=mongoose.model('Booking',bookingSchema);
module.exports=Booking;