const express = require("express");
const {
  busDetails,
  busDetailsupdate,
} = require("../controller/bustInfoController");
const { getsearchBus } = require("../controller/searchController");
const { allseatsbyname } = require("../controller/seatController");
// const { allocateSeats } = require('../controller/seatController');
// const {  } = require('../controllers/');

const router = express.Router();

router.post("/create/:id", busDetails);
router.put("/update/:id", busDetailsupdate);
router.get("/search", getsearchBus);
// router.get("/search", allseatsbyname);

module.exports = router;
