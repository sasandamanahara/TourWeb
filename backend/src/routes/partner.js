
const express = require('express');
const router = express.Router();

const PartnerController = require('../controllers/partner');

router.post('/',PartnerController.register);


module.exports=router;
