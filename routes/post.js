const express=require('express');
const mongoose=require('mongoose');
const beforelogin = require('../beforelogin');

const router=express.Router();
const Post = mongoose.model("Post");

router.post("/addPost",beforelogin,(req,res)=>
{
    console.log(req.body);
    const {title,body}=req.body;
    console.log(title,body)
    if(!title || !body)
    {
        return res.status(400).json({message:"Please add all the fields!"});
    }

    const post = new Post(
        {
            title,
            body,
            likes:0,
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
                return res.status(404).json({message:"Posts not found!"})
            })
})



router.put('/like',async(req,res)=>{
    
    const post =  await Post.findByIdAndUpdate(req.body.post_id,
        {
            $inc:{likes:1}
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





router.put('/unlike',async(req,res)=>{
    
    const post =  await Post.findByIdAndUpdate(req.body.post_id,
        {
            $inc:{likes:-1}
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

module.exports=router