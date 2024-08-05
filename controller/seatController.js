const SeatModel=require('../models/seatmodel')

async function allocateSeats(req,res){
    try{
        const {seats,busNumber,source,destination}=req.body
        for(let i=0;i<seats;i++){
            await SeatModel.create({
                busNumber:busNumber,
                source:source,
                destination:destination,
                seatNumber:i,


            })
        }
        res.status(201).json("bus seats are available")

    }catch(error){
        res.status(500).json(`error while allocating seat ${error}`)
    }
}
module.exports={allocateSeats}