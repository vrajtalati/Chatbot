const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchems=mongoose.Schema(
    {
       name:{
        type:String,
        required:true,
       },
       email:
       {
        type:String,
        required:true,
        unique:true
       },
       password:
       {
        type:String,
        required:true,
       },
       pic:
       {
        type:String,
        
        default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
       }
    },
    {
        timestamps:true,
    }
);

  userSchems.methods.matchPassword= async function(enteredPassowrd){
      return await bcrypt.compare(enteredPassowrd,this.password)
  }

   userSchems.pre('save', async function(next){
         if(!this.isModified){
            next();
         }

         const salt = await bcrypt.genSalt(10);
         this.password= await bcrypt.hash(this.password, salt); 
   })


  const User=mongoose.model("User",userSchems);
  module.exports=User;  
  