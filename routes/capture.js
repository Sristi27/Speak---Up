const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
var request = require("request"); 
const multer=require('multer');

var JWT_SECRET=process.env.JWT_SEC  || "eertyu"

const fs = require('fs')


const User = mongoose.model("User");


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/uploads/')
//       //stored in this detination
//     },
//     filename: function (req, file, cb) {
//       cb(null, 'profile.jpg')
//     }
//   });



//   //this function checks if image type is jpeg/png
//   const filterImage=(req, file, cb)=>{
//    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
//        cb(null,true);
//    }else{
//        cb(null, false);
//    }

//   }

// var upload = multer({ 
//     storage:storage,
//     fileFilter:filterImage
//  });



// router.post("/capture",upload.single('userImage'),(req,res)=>

// {


//         let formData = {
//             //file field need set options 'contentType' and 'filename' for formData
//             'file':fs.createReadStream(req.file.path)
//         }
        
//         const postUrl = 
//         "https://speakupgenderapi.herokuapp.com/predict_api" 
//         request.post({url: postUrl,formData: formData }, 
//             function(err,body) {    
//             fs.unlink(req.file.path, (err) => {
//                 if (err) {
//                   console.log(err)
//                   return
//                 }
//             })
//         if(err) 
//         {
//             console.log(err)
//             return res.status(400).json({error:err});
//         }
//         else
//         {
//             console.log(body)
//             return res.status(200).json({message:body});
//         }
//     });
// })




async function download(url,filename) {

    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    await new Promise((resolve, reject) => {
      request({
        /* Here you should specify the exact link to the file you are trying to download */
        uri: url,
        gzip: true,
      })
          .pipe(fs.createWriteStream(filename))
          .on('finish', async () => {
            console.log(`The file is finished downloading.`);
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
    })
        .catch((error) => {
          console.log(`Something happened: ${error}`);
        });
  }
  
  
  
  
  router.post("/capture",async (req,res)=>
  {
          const {url}=req.body;
          var flag=false;
          var filePath="public/uploads/profile.png"
          await download(url,filePath)
          .then(response=>
            {
              
                        let formData = {
                        'file':fs.createReadStream(filePath)
                        }
                
                        
                        const postUrl = "https://speakupgenderapi.herokuapp.com/predict_api" 
                
                
                        request.post({url: postUrl,formData: formData }, 
                            function(err,body) {    
                            fs.unlink(filePath, (err) => {
                                if (err) {
                                  return res.status(400).json({error:err});
                                }
                            })
                        if(err) 
                        {
                            return res.status(400).json({error:err});
                        }
                        else
                        {
                            return res.status(200).json({message:body});
                        }
                    });
            })
          .catch(err=>console.log(err))
          
          
  })
  
  
module.exports=router