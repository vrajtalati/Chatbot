const asyncHandler= require('express-async-handler');
const User=require("../models/userModel")
const generatToken= require("../config/generateToken")

const registerUser=asyncHandler(async (req,res)=>{
    const{name,email,password,pic}=req.body;

    if(!name||!email||!password){
       throw new Error('please enter all the fields')

    }

    const userExists=await User.findOne({email});

    if(userExists)
    {
        res.status(400);
        throw new Error("User already exists") 
    }

    const user =await User.create({
        name,
        email,
        password,
        pic,
    });

    if(user)
    {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email ,
            pic: user.pic,
        }); 
    }
    else{
        res.status(400);
        throw new Erro("Failed to create User");
    }
});

const authUser=asyncHandler(async (req,res) =>{
    const{email,password}= req.body;

    const user= await User.findOne({email});

    if(user && (await user.matchPassword(password)))
    {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email ,
            pic: user.pic,
        })
    }

})

module.exports = {registerUser,authUser};
