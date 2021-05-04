const express=require('express');
const mongoose=require('mongoose');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var request = require("request"); 

const axios = require('axios');

const multer=require('multer');


const multiparty = require("multiparty");
//method to store image on disks
//images to be stored in uploads


const fs = require('fs')
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink)



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
      //stored in this detination
    },
    filename: function (req, file, cb) {
      cb(null, 'profile.jpg')
    }
  });



  //this function checks if image type is jpeg/png
  const filterImage=(req, file, cb)=>{
   if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
       cb(null,true);
   }else{
       cb(null, false);
   }

  }

var upload = multer({ 
    storage:storage,
    fileFilter:filterImage
 });

var JWT_SECRET=process.env.JWT_SEC  || "eertyu"

const router=express.Router();
const User = mongoose.model("User");





router.post("/capture",upload.single('userImage'),(req,res)=>

{

        let formData = {
            //file field need set options 'contentType' and 'filename' for formData
            'file':fs.createReadStream(req.file.path)
            
        }
        const postUrl = "https://speakupgenderapi.herokuapp.com/predict_api" 
        request.post({url: postUrl,formData: formData }, function(err,body) {    
            fs.unlink(req.file.path, (err) => {
                if (err) {
                  console.log(err)
                  return
                }
            })
        if(err) 
        {
            console.log(err)
            return res.status(400).json({error:err});
        }
        else
        {
            console.log(body)
            return res.status(200).json({message:body});
        }
    });
})





router.post("/signup",(req,res)=>

{

    const {email,name,password} = req.body;
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
                .json({message:"User already exists!"});
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
                                name,
                                image:'./profile.jpg'
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
                    return res.status(404).json({message:"User not found!"});
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
                            return res.status(404).json({message:"Authentication Failed"})
                        }
                    }
                ).catch(err=>{return res.status(400).json({error:err})})
            }
        ).catch(err=> {return res.status(400).json({error:err})})
})


module.exports=router