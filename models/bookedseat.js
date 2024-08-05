const mongoose = require('mongoose');

const bookedseatSchema=new mongoose.Schema({
    name:{type:String},
    vilage:{type:String},
    mobile:{type:Number},
    seatId:{type:mongoose.Schema.Types.ObjectId, ref: "SeatSchema"}
},
{
    timestamps:true
})
// module.exports = mongoose.model("Key", keySchema);
module.exports=mongoose.model("BookedSeat",bookedseatSchema)