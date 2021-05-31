import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import './addstyles.css';
import { UserContext } from '../../App';
import Nav from '../nav/Nav';
import Footer from '../Footer/Footer';
import Success from '../../Utils/Success';
import Danger from '../../Utils/Danger';

const Add = () => {


    //handle innputs
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');
    const [issues,setIssues]=useState('');
    const [advice,setAdvice]=useState('');
    const [sector,setSector]=useState('');
    const [success,setSuccess]=useState(false)
    const [danger,setDanger]=useState(false)

    const { state, dispatch } = useContext(UserContext);

   const history=useHistory();




   //add a new post

    const submitForm = async (e) =>
    {
        e.preventDefault();
        if(title=='' || body=='' || sector=='' || advice=='' || issues=='')
        {
          alert("Fill all the fields!");
          return;
        }



        
        var data=JSON.stringify({title,body,sector,issues,advice});
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
              
              setSuccess(true)
            }
            else
            setDanger(true)
          })
        .catch(err=>setDanger(true))
    }

    return (
      <div className="add-container">
      <Nav/>

      {success?<Success msg=
      {"Congrats!Post successfully added,view the"} 
      navigate={"posts"} />:''}
      {danger ? <Danger msg={"Alas!Could not add Post,\
      please try again!"}/>:''}
      <div className="container">
     <div className="text">
      <h1 className="title">
         <span class="h1-title">
           Share your story with us!</span></h1>
        <div className="form-container">
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label" className="labels">Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1"
             placeholder="Enter the title"
            onChange={(e)=>
              {
                 e.preventDefault();
                 setTitle(e.target.value)
              }}/>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label" className="labels">
              Issues Faced (if Any)</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
            maxLength="200"
            placeholder="Share your story within 100 characters"
            onChange={(e)=>
            {
               e.preventDefault();
               setIssues(e.target.value)
            }}></textarea>
          </div>


          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label"
             className="labels">How did you overcome</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="6"
            maxLength="200"
            placeholder="Share your story within 200 characters"
            onChange={(e)=>
            {
               e.preventDefault();
               setBody(e.target.value)
            }}></textarea>
          </div>


          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label" className="labels">
              Advice for people going through same</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
            maxLength="100"
            placeholder="Share your story within 100 characters"
            onChange={(e)=>
            {
               e.preventDefault();
               setAdvice(e.target.value)
            }}></textarea>
          </div>


<h5>Select sector</h5>

          <div class="radio-toolbar">
          
          
          <input type="radio" id="health" name="sector" 
          onClick={(e)=>setSector(e.target.value)}
          value="Health" />
          <label for="health">Health</label>

          <input type="radio" id="finance" name="sector" 
          onClick={(e)=>setSector(e.target.value)}
           value="Finance"/>
          <label for="finance">Finance</label>

          <input type="radio" id="workplace" name="sector"  
          onClick={(e)=>setSector(e.target.value)}
          value="Workplace"/>
          <label for="workplace">Workplace</label> 

          <input type="radio" id="domestic" 
          onClick={(e)=>setSector(e.target.value)}
           name="sector" value="Domestic"/>
          <label for="domestic">Domestic</label> 

          </div>
         

          <button type="button" className="btn" id="submit" 
          onClick={(e)=>submitForm(e)} >
          Submit</button>
        </div>
      </div>
      
      <div className="image-holder">
      <div className="image"></div></div>
     </div>
     <Footer/>
     </div>
    )
}

export default Add


