import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router'
import './addstyles.css';
import { UserContext } from '../../App';
import Nav from '../nav/Nav';
import Footer from '../Footer/Footer';
import add from './../../images/add.jpeg'
const Add = () => {


    //handle innputs
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');


    const { state, dispatch } = useContext(UserContext);

   const history=useHistory();

   //add a new post

    const submitForm = async (e) =>
    {
        e.preventDefault();
        if(title=='' || body=='')
        {
          alert("Fill all the fields!");
          return;
        }
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
      <Nav/>
      <div className="container">
     <div className="text">
      <h1 className="title">
         <span class="h1-title">
           Share your story with us!</span></h1>
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
          <button type="button" className="btn" id="submit" 
          onClick={(e)=>submitForm(e)}
          >
          Submit</button>
        </div>
      </div>
      
     <div className="image"></div>
     </div>
     <Footer/>
     </div>
    )
}

export default Add



// https://image.freepik.com/free-vector/hand-fist-your-rules-women-empowerment-female-power-feminist-concept-illustration_25030-48184.jpg