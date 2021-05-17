const express=require('express');
const mongoose=require('mongoose');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');



var JWT_SECRET=process.env.JWT_SEC  || "eertyu"

const router=express.Router();
const User = mongoose.model("User");




router.post("/signup",(req,res)=>

{

    const {email,name,password,sector} = req.body;
    if(!email || !password || !name)
    {
        return res.status(404).json({error:"Please fill all the fields!"});
    }

    //first check if user with same email already exists
    User.findOne({email:email})
    .then(user=>
        {
            if(user)
            {
                return res.status(404)
                .json({error:"User already exists!"});
            }

            //if no user with the email exists,then create a new one
            //hash the password
            bcrypt.hash(password,12).then(
                hashedPassword=>
                {
                    var newUser;
                    if(req.file)
                    {
                        newUser= new User(
                            {
                                email,
                                password:hashedPassword,
                                name
                            })
                    }
                    else
                    {
                        newUser= new User(
                            {
                                email,
                                password:hashedPassword,
                                name
                            })
                    }

                    newUser.save()
                    .then(user=>
                        {
                            return res.status(200).json({message:"User successfully created!",user:user})
                        }).catch(err=>console.log(err))
                }
            )

        })
})




router.post("/signin",(req,res)=>
{
        const {email,password}=req.body;

        User.findOne({email:email}).then(
            savedUser=>
            {
                if(!savedUser)
                {
                    return res.status(404).json({error:"User not found!"});
                }

                bcrypt.compare(password,savedUser.password)
                .then(
                    match=>
                    {
                        if(match)
                        {
                            const token=jwt.sign(
                                {_id:savedUser._id}
                                ,JWT_SECRET
                            )


                            const {_id,name,email}=savedUser;
                            return res.json({message:"Signed in successfully",token:token,user:savedUser});
                        }
                        else{
                            return res.status(404).json({error:"Authentication Failed"})
                        }
                    }
                ).catch(err=>{return res.status(404).json({error:err})})
            }
        ).catch(err=> {return res.status(404).json({error:err})})
})


module.exports=router