const express = require('express');
const { allocateSeats,allseats,updateseat,deleteseat, allseatsbyname } = require('../controller/seatController');
const { getsearchAll, getsearchAllByseat } = require('../controller/searchController');
// const {  } = require('../controllers/');


const router = express.Router();

router.post('/create/:id', allocateSeats);
router.get('/read', allseats);
router.get('/readbyseat', allseatsbyname);
router.put('/update/:id', updateseat);
router.delete('/delete/:id', deleteseat);
router.get('/search', getsearchAll);
router.get('/getsearchAllByseat', getsearchAllByseat);


module.exports = router;