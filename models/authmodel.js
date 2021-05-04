const mongoose=require('mongoose');

const authSchema =  new mongoose.Schema
(
    {
            name:
            {
                type:String,
                required:true
            },
            email:
            {
                type:String,
                required:true
            },
            password:
            {
                type:String,
                required:true
            },
            image:
            {
                type:String
            }
    }
)

module.export=mongoose.model("User",authSchema)