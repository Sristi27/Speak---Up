const express=require('express');
const { error } = require('jquery');
const mongoose=require('mongoose');
const beforelogin = require('../beforelogin');

const router=express.Router();
const Post = mongoose.model("Post");

router.post("/addPost",beforelogin,(req,res)=>
{
    // console.log(req.body);
    const {title,body}=req.body;
    // console.log(title,body)
    if(!title || !body)
    {
        return res.status(400).json({message:"Please add all the fields!"});
    }

    const post = new Post(
        {
            title,
            body,
            postedBy:req.user

        }
    ).save()
    .then(result=>
        {
            res.status(200).json({message:"Post added successfully!",post:result})
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
    
    // console.log(req.user._id)
    const post =  await Post.findByIdAndUpdate(req.body.post_id,
        {
            $push:{likes:req.user._id}
        })
        
        Post.find().then(result=>
        {
            res.status(200).json({message:"Posts fetched",posts:result});
        }).catch(err=>
                {
                    return res.status(404).json({message:"Posts not found!"})
                })

    // console.log(post.tree.title);
})





router.put('/unlike',beforelogin,async(req,res)=>{
    
    const post =  await Post.findByIdAndUpdate(req.body.post_id,
        {
            $pull:{likes:req.user._id}
        })
    
        Post.find().then(result=>
            {
                    res.status(200).json({message:"Posts fetched",posts:result});
            }).catch(err=>
                {
                    return res.status(404).json({message:"Posts not found!"})
                })

    // console.log(post.tree.title);
})


router.delete('/deletePost',async(req,res)=>
{
    // console.log(await Post.findById())
    await Post.deleteOne(req.body.post_id).then(
        result=>
        {
            Post.find().then(posts=>
                {
                    res.status(200).json({message:"Post deleted successfully!",posts:posts})
                }).catch(err=>{return res.status(404).json({error:err})})
        }
    ).catch(err=>{return res.status(404).json({message:"Unsuccessfull deletion"})})

})

module.exports=router