const express=require('express');
const mongoose=require('mongoose');
const beforelogin = require('../beforelogin');

const router=express.Router();
const Post = mongoose.model("Post");

router.post("/addPost",beforelogin,(req,res)=>
{

    const {title,body,sector,issues,advice}=req.body;
    if(!title || !body)
    {
        return res.status(400).json({message:"Please add all the fields!"});
    }

    const post = new Post(
        {
            body:
            {
                title,body,advice,issues,sector
            },
            postedBy:req.user,
            

        }
    ).save()
    .then(result=>
        {
            return res.status(200).json({message:"Post added successfully!",post:result})
        }

    ).catch(err=>
        {
            console.log(err)
        })

})


router.get("/allPosts",beforelogin,(req,res)=>
{
    Post.find().then(result=>
        {
                res.status(200).json({message:"Posts fetched",posts:result});
        }).catch(err=>
            {
                return res.status(404).json({error:err})
            })
})



router.put('/like',beforelogin,async(req,res)=>{
    
    const post =  await Post.findByIdAndUpdate(req.body.post_id,
        {
            $push:{likes:req.user._id}
        })
        
        Post.find().then(result=>
        {
            return res.status(200).json({message:"Posts fetched",posts:result});
        }).catch(err=>
                {
                    return res.status(404).json({message:"Posts not found!"})
                })

})





router.put('/unlike',beforelogin,async(req,res)=>{
    
    const post =  await Post.findByIdAndUpdate(req.body.post_id,
        {
            $pull:{likes:req.user._id}
        })
    
        Post.find().then(result=>
            {
                   return  res.status(200).json({message:"Posts fetched",posts:result});
            }).catch(err=>
                {
                    return res.status(404).json({message:"Posts not found!"})
                })

})


router.delete('/deletePost/:id',async(req,res)=>
{
    console.log(req.params.id)
    await Post.deleteOne({"_id":req.params.id}).then(
        result=>
        {
            Post.find().then(posts=>
                {
                    return res.status(200).json(
                        {message:"Post deleted successfully!",posts:posts})
                }).catch(err=>{return res.status(404).json({error:err})})
        }
    ).catch(err=>{return res.status(404).json({message:"Unsuccessfull deletion"})})

})

module.exports=router