import React, { useEffect,useState } from 'react'
import './addstyles.css';
import Nav from '../nav/Nav';
import Footer from '../Footer/Footer';
import Success from '../../Utils/Success';
import Danger from '../../Utils/Danger';
import Loader from '../../Utils/Loader';

const Add = () => {


    const [token,setToken]=useState();
    //handle innputs
    useEffect (()=>
    {
        setToken("Bearer"+" "+process.env.REACT_APP_KEY);
    },[])

    const [title,setTitle]=useState('');
    const [overcome,setovercome]=useState('');
    const [issues,setIssues]=useState('');
    const [advice,setAdvice]=useState('');
    const [sector,setSector]=useState('');
    const [success,setSuccess]=useState(false)
    const [danger,setDanger]=useState(false)
    const [loading,setLoading]=useState(false)

   //add a new post

    const submitForm = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        if(title=='' || overcome=='' || sector=='' || advice=='' || issues=='')
        {
          
          alert("Fill all the fields!");
          setLoading(false)
          return;
        }

        const  text =
        {
          "document": {
            "text" : overcome
           }
        }

        var sentiment=0;

        await fetch("https://nlapi.expert.ai/v2/analyze/standard/en/sentiment",
          {
            headers:
            {
              "Content-Type":"application/json",
              "Authorization":token
            },
            method:"post",
            body:JSON.stringify(text)
            
          })
          .then(res=>res.json())
          .then(res=>
            {
              sentiment=res.data.sentiment.overall;
              fetch("http://localhost:5000/addPost",
                  {
                    headers:
                    {
                      "Content-Type":"application/json",
                      "Authorization":"Bearer"+localStorage.getItem("jwt")
                    },
                    method:"post",
                    body:JSON.stringify({title,overcome,sector,issues,advice,sentiment})
                    
                  })
                  .then(res=>res.json())
                  .then(res=>
                    {
                      if(!res.error)
                      {
                        setSuccess(true)
                        setLoading(false)
                      }
                      else
                      {
                        setDanger(true);
                        setLoading(false);
                      }
                    })
                  .catch(err=>{
                    setDanger(true)
                    setLoading(false);
                    return;
                  })
            })
          .catch(err=>{
            setDanger(true)
            setLoading(false)
            return;
          })
      
        

        
    }

    return (
      
      <div className="add-container">
      {loading?<Loader msg="Posting"/>:''}
      <Nav/>

          {success?<Success msg=
          {"Congrats!Post successfully added,"} 
          navigate={"posts"} />:''}
          {danger ? <Danger msg={"Alas!Could not add Post,\
          please try again!"}/>:''}

      <div className="container">
     <div className="text">
      <h1 className="title">
         <span className="h1-title">
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
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"
            maxLength="500"
            placeholder="Share your story within 500 characters"
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
            maxLength="600"
            placeholder="Share your story within 600 characters"
            onChange={(e)=>
            {
               e.preventDefault();
               setovercome(e.target.value)
            }}></textarea>
          </div>


          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label" className="labels">
              Advice for people going through same</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"
            maxLength="400"
            placeholder="Share your story within 400 characters"
            onChange={(e)=>
            {
               e.preventDefault();
               setAdvice(e.target.value)
            }}></textarea>
          </div>


<h5>Select sector</h5>

          <div className="radio-toolbar">
          
          
          <input type="radio" id="health" name="sector" 
          onClick={(e)=>setSector(e.target.value)}
          value="Health" />
          <label htmlFor="health">Health</label>

          <input type="radio" id="finance" name="sector" 
          onClick={(e)=>setSector(e.target.value)}
           value="Finance"/>
          <label htmlFor="finance">Finance</label>

          <input type="radio" id="workplace" name="sector"  
          onClick={(e)=>setSector(e.target.value)}
          value="Workplace"/>
          <label htmlFor="workplace">Workplace</label> 

          <input type="radio" id="domestic" 
          onClick={(e)=>setSector(e.target.value)}
           name="sector" value="Domestic"/>
          <label htmlFor="domestic">Domestic</label> 

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


