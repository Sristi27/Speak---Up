import React, { useEffect,useState } from 'react'
import './addstyles.css';
import Nav from '../nav/Nav';
import Footer from '../Footer/Footer';
import Success from '../../Utils/Success';
import Danger from '../../Utils/Danger';
import Loader from '../../Utils/Loader';

const Add = () => {


    // const [token,setToken]=useState();
    //handle innputs
    const token ="Bearer"+" "+ "eyJraWQiOiI1RDVOdFM1UHJBajVlSlVOK1RraXVEZE15WWVMMFJQZ3RaUDJGTlhESHpzPSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206Y291bnRyeSI6IklOIiwic3ViIjoiYmNkNTY2OTItMjNkZS00YjRmLWI4NjctY2Y3YWVmMmE2ZWU5IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpwZXJzb25hbGl6YXRpb25BdXRoIjoiMSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0FVSGdRMDhDQiIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImNvZ25pdG86dXNlcm5hbWUiOiJiY2Q1NjY5Mi0yM2RlLTRiNGYtYjg2Ny1jZjdhZWYyYTZlZTkiLCJjdXN0b206Y29tcGFueSI6IktHRUMiLCJhdWQiOiIxZWdzNjNxOTlwM3NlYmVjaHNiNzI5dDgwbyIsImV2ZW50X2lkIjoiM2IzODgzNGEtMWM3ZC00NjhhLWJiZWUtNzExMTNiZmQyOTU5IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MzYxMDgyMjIsIm5hbWUiOiJTUklTVEkiLCJwaG9uZV9udW1iZXIiOiIrOTE2MjkxNDg4ODQxIiwiZXhwIjoxNjM2Mzg1MjExLCJpYXQiOjE2MzYyOTg4MTEsImZhbWlseV9uYW1lIjoiQ0hPV0RIVVJZIiwiZW1haWwiOiJzcmlzdGkyNzA1QGdtYWlsLmNvbSIsImN1c3RvbTptYXJrZXRpbmdBdXRoIjoiMSJ9.e2YJwoeJdWKS7BakWhlFWAwnEPZ5-VFAwd8EU5-o0W0ttViw_E2eErlWGHZj6H1JKGfTG6_Z4o7uci0QBVmxz6U0oF1B01jTrtLXkyaFHp_nKXBu3KvCDUvp7c7TJTgHqp105udPp6eU4PsNRvY74yjPgPHBoWVFy46ymiuXnIyiA5Zkh8O1BC4OkbTzdx5eIy0yQdEH9kYM4_DoRqqt-NKMXSsPP0WKaw_qdUxpSg5QscQhjgKBa8Z7Gfp1Zxn-p5yQzrxsJt8F0LQfs-mNipDrORm2lqttbYgFiaho3oTBwtUuiM2F8KfzZ1p2rMJvhe8jrmtJCe6aj_xB1rvLiQ";
    // {
    //     setToken("Bearer"+" "+process.env.REACT_APP_KEY);
    // },[])

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
              fetch("/addPost",
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


