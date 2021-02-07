import React, { useContext, useEffect, useState } from 'react'
import './poststyles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

const PostGrid = () => {


    const [allposts,setAllPosts]=useState('');
    const [likes,setLikes]=useState('');

    const { state, dispatch } = useContext(UserContext);


    const history=useHistory();

    useEffect(
        async()=>{
            await fetch("/allPosts",
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
                setAllPosts(res.posts);
              })
            .catch(err=>console.log(err))
    },[]);


    const increment = async(id) =>
    {
        
        await fetch("/like",
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
        
        await fetch("/unlike",
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

    const PostCard = ({post})=>
    {
        return (


             
            <div className="col cards-col col-lg-4 col-md-6 col-12">
            <div className="card">
            <img className="card-img-top"  style={{backgroundSize:"contain"}}
            src="https://image.freepik.com/free-vector/hand-drawn-womens-day-concept_23-2148435898.jpg"
            alt="Card image"/>
            <div className="card-img-overlay">
             <div className="body"  style={{padding:'10px 20px',fontWeight:'bolder'}}>
             <h6 className="text-secondary" style={{float:'right'}}>Anonymous</h6>
                          <h3 className="card-title">{post.title}</h3>
                          <p className="card-text">{post.body}</p>
                          <div className="footer-card">
                          <button className="btn" style={{marginRight:'5px',color:'black'}}>
                          <FontAwesomeIcon icon={faThumbsUp} className="icon" onClick={()=>increment(post._id)}/>
                          </button>
                          <button className="btn">
                          <FontAwesomeIcon icon={faThumbsDown} className="icon" onClick={()=>decrement(post._id)}/>
                          </button>
                          <label style={{float:'right'}}>{post.likes} Likes</label>
                          </div>
             </div>
           
            </div>
            </div>
            </div>
        )
    }


    return (

        <div className="post-container">
         <nav className="navbar navbar-expand-lg navbar-dark">
              <div style={{display:'flex',alignItems:'center'}}>
              <Link to="/">
                <img src="https://miro.medium.com/max/3840/1*gYptxAgBRVHvobYE8WBxJQ.png" height="50px" width="50px"
                style={{marginTop:'-10px'}}/>
                <span style={{marginLeft:'10px',fontWeight:'bold',fontSize:'30px'}}  className="navbar-brand">Speak Up</span>
                </Link>
                <div>
                  <ul className="navbar-nav" style={{display:'flex',flexDirection:'row',
                  alignItems:'center',justifyContent:'space-evenly',marginTop:'5px'}}>
                    <li className="nav-item">
                      <Link to="/add" className="nav-link" style={{color:'white',fontSize:'18px',marginRight:'5px'}}>Add</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/grid" className="nav-link" style={{color:'white',fontSize:'18px',marginRight:'5px'}}>Grid</Link>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" style={{color:'white',fontSize:'18px'}}
                    onClick={()=>{
                      localStorage.clear();
                      dispatch({type:"CLEAR"})
                      history.push("/signin");
                   }}>Logout</a></li>
                  </ul>
                </div>
              </div>
              </nav>
     
      
                <div className="container homegrid">
            <div className="row">
                {allposts!='' && allposts.map((post)=>
                {
                  return(
                     <PostCard post={post}/>
                  )
                })}
                {allposts==''?<h1>Add Posts</h1>:''}
            </div>
            </div>
        </div>
    )
}

export default PostGrid
