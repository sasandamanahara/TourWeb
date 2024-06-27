
const express = require('express');
const router = express.Router();

const TouristController = require('../controllers/tourist');

router.post('/',TouristController.register)
router.post('/login',TouristController.login)


module.exports=router;
