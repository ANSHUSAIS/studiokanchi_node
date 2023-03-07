const User = require("../model/user");
const cookieToken = require("../util/cookieToken");
const mailHelper = require("../util/emailHelper");
const cloudinary = require('cloudinary').v2;
const crypto = require("crypto");

exports.signUp = async (req, res, next) =>{
   try{
        const { name, email, mobile, password, role } = req.body;

        if(!email){
            res.status(200).json({error : "Email Is Required...."});
        }

        const user = await User.create({
            name,
            email,
            mobile,
            password,
            role
        });
        user.password = undefined;

        if(!user){
            res.status(200).json({error : "Something went wrong...."});
        }

        res.status(200).json({user : user, message:'success'})
        // cookieToken(user, res);
   }catch(error){
        res.json({error : error.message})
   }
}

exports.login = async (req, res, next) =>{
    try{
        const {email, password, role} = req.body;
        const user = await User.findOne({email, role}).select("+password");
        if(!user){
            res.status(200).json({ error : "You are not a registered user..." });return;
        }

        const validatePassword = await user.validatePassword(password);
        if(!validatePassword){
            res.status(200).json({ error : "User Id OR Password not Matched..." });return;
        }
        // res.status(200).json({user : user, message:'success'})
        cookieToken(user, res);
    }catch(error){
        res.json({ error : error.message});
    }
}

exports.getSingleUser = async (req, res, next) =>{
    // console.log(req.user);
    const user = await User.findOne({email: req.params.email}) ;

    if(!user){
        res.status(404).json({error : "User Not Found..."});
    }
    res.status(200).json({ user : user});
}

