const express = require('express');
const { allocateSeats,allseats,updateseat,deleteseat } = require('../controller/seatController');
// const {  } = require('../controllers/');


const router = express.Router();

router.post('/create', allocateSeats);
router.get('/read', allseats);
router.post('/update/:id', updateseat);
router.post('/delete/:id', deleteseat);


module.exports = router;