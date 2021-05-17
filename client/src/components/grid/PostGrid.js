import React, { useContext, useEffect, useState } from 'react'
import './poststyles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Nav from '../nav/Nav';
import Footer from '../Footer/Footer';
import Loader from '../../Utils/Loader';
import Success from '../../Utils/Success';
import Danger from '../../Utils/Danger';

const PostGrid = () => {


    const [allposts,setAllPosts]=useState('');
    const [likes,setLikes]=useState('');
    const [filter,setFilter]=useState('All');
    const { state, dispatch } = useContext(UserContext);
    const [tempPosts,setTempPosts]=useState('');
    const [success,setSuccess]=useState(false)
    const [danger,setDanger]=useState(false)


    const history=useHistory();
    
    //fetch all posts
    useEffect(
      async()=>
      {
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
          setTempPosts(res.posts);
        })
      .catch(err=>alert(err))
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
              var posts=result.posts;
               setTempPosts(posts)
               if(filter=='All') setAllPosts(posts);
               else
               {
                posts=posts.filter(post=>{return post.sector==filter});
                setAllPosts(posts)
               }
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
               var posts=result.posts;
               setTempPosts(posts)
               if(filter=='All') setAllPosts(posts);
               else
               {
                posts=posts.filter(post=>{return post.sector==filter});
                setAllPosts(posts)
               }
            }).catch(err=>alert(err))
        
    }

    const delPost = async(id) =>
    {
      setSuccess(false)
      setDanger(false)
       console.log(tempPosts)
       console.log(id)
        await fetch(`/deletePost/${id}`,
        {
          method:'delete',
          header:
          {
            "Content-Type":"application/json",
            "Authorization":"Bearer"+localStorage.getItem("jwt")
      
          }
          
        }).then(res=>res.json())
        .then(result=>
         {
          setSuccess(true)
          var posts=result.posts;
          setTempPosts(posts)
          setAllPosts(posts);
          setFilter('All')
         }).catch(err=>setDanger(true))
     
    }




    //filter categories
    const filterPosts = (category) =>
    {
        setFilter(category)
        if(category=="All")
        setAllPosts(tempPosts);
        else
        {
          //  console.log(category)
           var postArray=tempPosts;
           console.log(tempPosts)
           postArray=postArray.filter(post=> {return post.sector==category});
          //  console.log(postArray)
           setAllPosts(postArray)
        }
    }


   

    //posts


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
   
                       <h4 className="card-title">{post.body.title}</h4>

                      <p className="card-text">
                       <h5 class="text-secondary">Issues faced</h5>
                         {post.body.issues}</p>
                       <p className="card-text">

                       <h5 class="text-secondary">How to overcome the situation?</h5>
                         {post.body.body}
                         </p>
                       <p className="card-text">
                         <h5 class="text-secondary">Advice to others</h5>
                         {post.body.advice}
                         </p>
                      
                      {/* delete only if added by that user */}
                      {/* else like/unlike  */}
                       {postedBy==state._id?

                       <p className="cardText" 
                       style={{width:'100%'}}>
                         <label>
                         #{post.body.sector}</label>
                         <button className="btn delete"
                       onClick={()=>delPost(post._id)}>Delete</button>
                        </p>:

                       <p className="cardText">
                       <button className="btn" 
                       disabled={post.likes.includes(state._id)}
                       onClick={()=>increment(post._id)}>
                       <FontAwesomeIcon icon={faThumbsUp} className="icon"/>
                       <span style={{marginLeft:'5px'}}>{post.likes.length}</span>
                       </button>
                       <button className="btn"
                        onClick={()=>decrement(post._id)}
                        disabled={post.likes.length==0}>
                       <FontAwesomeIcon icon={faThumbsDown}  
                        className="icon" />
                       </button>
                        <label>
                         #{post.body.sector}</label>
                       </p>
                       }
        </div></div>
               
          )
    }


    


    return (
<div className="gridContainer">
  
{!allposts && !tempPosts ? 
<Loader/>:
<>
        <Nav/>

        {success?
         <Success msg=
           {"Post has been deleted successfully!"}/>:''}
          {danger?
          <Danger msg=
          {"Post could not be deleted!"}/>:''}
         
         <div className="homegrid">
         
           <div className="filter">

               <h6>Filter Category</h6>
               <div className="radiobtn">
               <div class="form-check">
              <input class="form-check-input radio" type="radio" onClick={(e)=>
              {
                filterPosts(e.target.value)
              }}
              value="All" checked={filter=='All'}
              name="flexRadioDefault" id="flexRadioDefault1"/>
              <label class="form-check-label" for="flexRadioDefault1">
                All
              </label>
            </div>
             <div class="form-check">
              <input class="form-check-input radio" type="radio"  value="Health"
              name="flexRadioDefault" id="flexRadioDefault1" onClick={(e)=>
              {
                filterPosts(e.target.value)
              }}/>
              <label class="form-check-label" for="flexRadioDefault1">
                Health
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input radio" type="radio" value="Domestic"
              name="flexRadioDefault" id="flexRadioDefault2" onClick={(e)=>
                {
                  filterPosts(e.target.value)
                }}/>
              <label class="form-check-label" for="flexRadioDefault2">
               Domestic
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input radio" type="radio" value="Workplace"
              name="flexRadioDefault" id="flexRadioDefault2" onClick={(e)=>
                {
                  filterPosts(e.target.value)
                }}/>
              <label class="form-check-label" for="flexRadioDefault2">
               Workplace
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input radio" type="radio" value="Finance"
              name="flexRadioDefault" id="flexRadioDefault2" onClick={(e)=>
                {
                  filterPosts(e.target.value)
                }}/>
              <label class="form-check-label" for="flexRadioDefault2">
               Finance
              </label>
            </div>
             </div>
             </div>

          <div class="card-columns">
           
           {allposts!='' && allposts.map((post)=>
           {
             return(
                <PostCard post={post}/>
             )
           })}
              {allposts==''?<div className="links">
                <h3>No new posts here</h3>
              <Link to="/add"><button>
                Create Post</button></Link>
              </div>:''}
       </div>
            
            
          </div>
          </>}
            <Footer/>
            </div>
    )
}

export default PostGrid


