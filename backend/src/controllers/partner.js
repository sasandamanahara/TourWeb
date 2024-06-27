
const createHttpError=require('http-errors');
const bcrypt=require('bcrypt');
const PartnerModel = require('../model/partner');



exports.register = async (req,res,next)=>{
    
        
    const email = req.body.email
    const password=req.body.password
    const name=req.body.name
  try {
      if (!email || !password || !name ){
      throw createHttpError(400,'missing required parameters')
    }
    const isPartnerAvailable= await PartnerModel.findOne({email:email}).exec();
    if (isPartnerAvailable){
      throw createHttpError(400,'Partner already exists')
    }
    const hashedPassword=await bcrypt.hash(password,12);
    const partner = new PartnerModel({
      name:name,
      email:email,
      password:hashedPassword,
    })
    const result = await partner.save();
    res.status(201).send(result);

  } catch (error) {
    next(error)
    
  }


}