const SeatModel = require("../models/bookedseat");

// async function allocateSeats(req,res){
//     try{
//         const {seats,busNumber,source,destination}=req.body
//         for(let i=0;i<seats;i++){
//             await SeatModel.create({
//                 busNumber:busNumber,
//                 source:source,
//                 destination:destination,
//                 seatNumber:i,

//             })
//         }
//         res.status(201).json("bus seats are available")

//     }catch(error){
//         res.status(500).json(`error while allocating seat ${error}`)
//     }
// }
async function allocateSeats(req, res) {
  try {
    const { seatNumber, name, vilage, mobile, date } = req.body;
    // for(let i=0;i<seats;i++){
    //     await SeatModel.create({
    //         busNumber:busNumber,
    //         source:source,
    //         destination:destination,
    //         seatNumber:i,

    //     })
    // }
    const currentSeat = await SeatModel.create({
      name,
      vilage,
      mobile,
      date,
      seatNumber,
    });
    res.status(201).json({ data: currentSeat });
  } catch (error) {
    res.status(500).json(`error while allocating seat ${error}`);
  }
}
async function allseats(req, res) {
  try {
    const currentSeat = await SeatModel.find({});
    res.status(201).json({ data: currentSeat });
  } catch (error) {
    res.status(500).json(`error while allocating seat ${error}`);
  }
}
async function deleteseat(req, res) {
  try {
    const currentSeat = await SeatModel.findByIdAndDelete(req.params.id);
    res.status(201).json("seat is deleted");
  } catch (error) {
    res.status(500).json(`error while allocating seat ${error}`);
  }
}
async function updateseat(req, res) {
  try {
    const { name, vilage, mobile } = req.body;

    const currentSeat = await SeatModel.findByIdAndUpdate(req.params.id, {
      name: name,
      vilage: vilage,
      mobile: mobile,
    });
    res.status(201).json({ data: currentSeat });
  } catch (error) {
    res.status(500).json(`error while allocating seat ${error}`);
  }
}
module.exports = { allocateSeats, allseats, updateseat, deleteseat };
