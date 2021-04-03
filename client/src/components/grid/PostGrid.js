import React, { useContext, useEffect, useState } from 'react'
import './poststyles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Nav from '../nav/Nav';
import Footer from '../Footer/Footer';

const PostGrid = () => {


    const [allposts,setAllPosts]=useState('');
    const [likes,setLikes]=useState('');

    const { state, dispatch } = useContext(UserContext);


    const history=useHistory();
    
    useEffect(
      async()=>
      {
      await fetch("http://localhost:5000/allPosts",
      {
        headers:
        {
          "Content-Type":"application/json",
          "Authorization":"Bearer"+localStorage.getItem("jwt")
        },
        method:"get"
        
      })
      .then(res=>res.json())
      .then(res=>
        {
          // console.log(res.posts)
          // console.log(localStorage.getItem('user'))
          setAllPosts(res.posts);
        })
      .catch(err=>console.log(err))
    },[]);

    const increment = async(id) =>
    {
        
        await fetch("http://localhost:5000/like",
           {
             method:"put",
             headers: 
             {
               "Content-Type":"application/json",
               "Authorization":"Bearer"+localStorage.getItem("jwt")
      
             },
             body:JSON.stringify(
                  {
                      post_id:id
                  }
                )
             
           }).then(res=>res.json())
           .then(result=>
            {
              setAllPosts(result.posts)
            }).catch(err=>alert(err))
    }

    const decrement = async(id) =>
    {
        
        await fetch("http://localhost:5000/unlike",
           {
             method:"put",
             headers: 
             {
               "Content-Type":"application/json",
               "Authorization":"Bearer"+localStorage.getItem("jwt")
      
             },
             body:JSON.stringify(
                  {
                      post_id:id
                  }
                )
             
           }).then(res=>res.json())
           .then(result=>
            {
              setAllPosts(result.posts)
            }).catch(err=>alert(err))
        
    }

    const delPost = async(id) =>
    {
        await fetch("http://localhost:5000/deletePost",
        {
          method:'delete',
          header:
          {
            "Content-Type":"application/json",
            "Authorization":"Bearer"+localStorage.getItem("jwt")
      
          },
          body:JSON.stringify(
               {
                   post_id:id
               }
             )
          
        }).then(res=>res.json())
        .then(result=>
         {
           alert(result.message);
           setAllPosts(result.posts);
         }).catch(err=>alert(err))
     
    }

    const PostCard = ({post})=>
    {
      const postedBy=post.postedBy;
      // console.log(postedBy,state._id)
      return (
          <div class="card">
    
    <div class="card-body">
      
    {postedBy==state._id?
     <h6 className="text-secondary" 
     style={{float:'right'}}>Posted By You</h6>:
     <h6
     className="text-secondary" 
     style={{float:'right'}}>Anonymous</h6>
    }
   
                       <h3 className="card-title">{post.title}</h3>
                       <p className="card-text">{post.body}</p>
                      
                      {/* delete only if added by that user */}
                      {/* else like/unlike  */}
                       {postedBy==state._id?

                       <p className="cardText" 
                       style={{width:'100%',textAlign:'center'}}>
                         <button className="btn" style={{width:'40%'}}
                       onClick={()=>delPost(post._id)}>Delete</button>
                        </p>:

                       <p className="card-text">
                       <button className="btn" 
                       disabled={post.likes.includes(state._id)}
                       onClick={()=>increment(post._id)}>
                       <FontAwesomeIcon icon={faThumbsUp} className="icon"/>
                       </button>
                       <button className="btn"
                        onClick={()=>decrement(post._id)}
                        disabled={post.likes.length==0}>
                       <FontAwesomeIcon icon={faThumbsDown}  
                        className="icon" />
                       </button>
                        <label style={{float:'right'}}>
                          {post.likes.length} Likes</label>
                       </p>
                       }
        </div></div>
               
          )
    }


    return (
<div className="gridContainer">
        <Nav/>
         <div className="homegrid">
            
          <div class="card-columns">
                {allposts!='' && allposts.map((post)=>
                {
                  return(
                     <PostCard post={post}/>
                  )
                })}
                {allposts==''?<div className="links">
                <Link to="/add"><button>Add a Post</button></Link>
                </div>:''}
            </div>
            </div>
            <Footer/>
            </div>
    )
}

export default PostGrid


