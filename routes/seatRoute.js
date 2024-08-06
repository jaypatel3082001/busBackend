const express = require('express');
const { allocateSeats,allseats,updateseat,deleteseat } = require('../controller/seatController');
const { getsearchAll } = require('../controller/searchController');
// const {  } = require('../controllers/');


const router = express.Router();

router.post('/create', allocateSeats);
router.get('/read', allseats);
router.post('/update/:id', updateseat);
router.post('/delete/:id', deleteseat);
router.get('/search', getsearchAll);


module.exports = router;