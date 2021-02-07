import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router'
import './addstyles.css';
import { UserContext } from '../../App';

const Add = () => {


    //handle innputs
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');


    const { state, dispatch } = useContext(UserContext);

   const history=useHistory();

    const submitForm = async (e) =>
    {
        e.preventDefault();
        var data=JSON.stringify({title,body});
        await fetch("/addPost",
        {
          headers:
          {
            "Content-Type":"application/json",
            "Authorization":"Bearer"+localStorage.getItem("jwt")
          },
          method:"post",
          body:data
          
        })
        .then(res=>res.json())
        .then(res=>
          {
            if(!res.error)
            {
              // console.log(res);
              history.push('/grid')
            }
            else
            alert(res.error)
          })
        .catch(err=>alert(err))
    }

    return (
      <div className="add-container">

      <nav className="navbar navbar-expand-lg navbar-dark">
              <div style={{display:'flex',alignItems:'center'}}>
              <Link to="/">
                <img src="https://miro.medium.com/max/3840/1*gYptxAgBRVHvobYE8WBxJQ.png" height="50px" width="50px"
                style={{marginTop:'-10px'}}/>
                <span style={{marginLeft:'10px',fontWeight:'bold',fontSize:'30px'}}  className="navbar-brand">Speak Up</span>
                </Link>
                <div>
                  <ul className="navbar-nav" style={{display:'flex',flexDirection:'row',
                  alignItems:'center',justifyContent:'space-around',marginTop:'5px'}}>
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
     
      
     <div className="images">
     <div className="text">
      <h1 className="title"> <span class="h1-title">Share your story with us!</span></h1>
        <div className="form-container">
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label" className="labels">Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter the title"
            onChange={(e)=>
              {
                 e.preventDefault();
                 setTitle(e.target.value)
              }}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label" className="labels">Post Body</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="6"
            placeholder="Share your story.."
            onChange={(e)=>
            {
               e.preventDefault();
               setBody(e.target.value)
            }}></textarea>
          </div>
          <button type="button" className="btn btn-outline" id="submit" 
          onClick={(e)=>submitForm(e)}
          >
          Submit</button>
        </div>
      </div>
      
     <img src="https://static.vecteezy.com/system/resources/previews/001/413/580/original/woman-empowerment-awareness-concept-free-vector.jpg" id="women"/>
     </div>
      </div>
    )
}

export default Add



// https://image.freepik.com/free-vector/hand-fist-your-rules-women-empowerment-female-power-feminist-concept-illustration_25030-48184.jpg