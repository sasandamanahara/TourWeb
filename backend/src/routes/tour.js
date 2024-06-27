
const express = require('express');
const router = express.Router();

const TourController = require('../controllers/tour');

const verifyToken=require('../middlewears/verifyToken')

router.post('/',TourController.create);
router.put('/:id',TourController.update)
router.delete('/:id', TourController.delete)
router.get('/all', TourController.getAll)
router.get('/all',  TourController.getAll)
router.get('/:id', TourController.getOne)
router.get('searchResults', TourController.search)


module.exports=router;