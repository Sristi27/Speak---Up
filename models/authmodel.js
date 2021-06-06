const mongoose=require('mongoose');
const { ObjectId } = mongoose.Schema.Types
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
            },
            likedPosts: //array of posts liked
            [{
                    postId:
                    {
                        type:ObjectId, //id of the post which has been liked
                    },
                    sentiment:
                    {
                        type:Number //sentiment of that post which has been liked
                    }
                    
            }],
            sentimentsLiked:
            {
                positive:
                {
                    type:Number
                },
                negative:
                {
                    type:Number
                }
            }
    }
)

module.export=mongoose.model("User",authSchema)