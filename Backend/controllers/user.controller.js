const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const {validationResult} = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');
console.log(">>> BlacklistToken:", BlacklistToken);

module.exports.registerUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password} = req.body;
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({firstname: fullname.firstname,lastname: fullname.lastname,email,password:hashedPassword});
    const token = user.generateAuthToken();
    res.status(201).json({user,token});

}

module.exports.loginUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const isMatch = await user.comparePassword(password,user.password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({user,token});

}
module.exports.getUserProfile = async (req,res,next)=>{
    res.status(200).json(req.user);}

module.exports.logoutUser = async (req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
        await BlacklistToken.create({ token });
    }
    res.status(200).json({message:'Logged out successfully'});
};
