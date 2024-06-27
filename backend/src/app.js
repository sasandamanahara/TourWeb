require ('dotenv').config()

const express = require('express');
const app = express();
//const mongoose = require('mongoose');
const createHttpError=require('http-errors')
//const bcrypt = require('bcrypt')
const port = process.env.PORT
//const TouristModel = require('./model/tourist')
const TouristRouter=require('./routes/tourist');
const PartnerRouter=require('./routes/partner');
const TourRouter=require('./routes/tour');
const BookingRouter=require('./routes/booking');
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use('/public/tours',express.static('public/tours'))

const cors = require('cors')
app.use(cors())

app.use(express.json())

app.use('/api/v1/tourists',TouristRouter);
app.use('/api/v1/partners',PartnerRouter);
app.use('/api/v1/tours',TourRouter);
app.use('/api/v1/bookings', BookingRouter);
/*
app.get('/', (req, res,next) => {
try {
  //res.send('Hello Worldsdflfkdgf!')
  throw createHttpError(404,'BROKEN');
  //throw new Error('Broken')
} catch (error) {
  next(error)
}

})
*/

//Error Handeling Middleware
app.use((err, req, res, next) => {
  if (createHttpError.isHttpError(err)) {
      res.status(err.status).send({ message: err.message })
  } else {
      res.status(500).send({ message: err.message })
  }
  //error unknown
  res.status(500).send({ message: "Error Unknown" })
})


/*
app.post('/api/v1/tourists',async (req,res,next)=>{
    
        
  const email = req.body.email
  const password=req.body.password
  const name=req.body.name
  try {
    if (!email || !password || !name ){
    throw createHttpError(400,'missing required parameters')
  }
  const isUserAvailable = await TouristModel.findOne({email:email}).exec();
  if (isUserAvailable){
    throw createHttpError(400,'User already exists')
  }
  const hashedPassword=await bcrypt.hash(password,12);
  const tourist = new TouristModel({
    name:name,
    email:email,
    password:hashedPassword
  })
  const result = await tourist.save();
  res.status(201).send(result);

} catch (error) {
  next(error)
  
}

})
*/


 
module.exports=app;