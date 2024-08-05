const mongoose = require('mongoose');

const seatSchema=new mongoose.Schema({
    seatNumber:{type:Number},
    busNumber:{type:String},
    source:{type:String},
    destination:{type:String}
},
{
    timestamps:true
})
module.exports=mongoose.model("SeatSchema",seatSchema)