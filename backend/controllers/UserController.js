const asyncHandler= require('express-async-handler');
const User=require("../models/userModel")

const registerUser=asyncHandler(async (req,res)=>{
    const{name,email,pasword,pic}=req.body;

    if(!name||!email||!pasword){
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
        pasword,
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

module.exports = router;
