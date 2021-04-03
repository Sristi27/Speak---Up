import React, { useContext, useState } from 'react'
import './signupstyles.css'
import $ from 'jquery'
import { useHistory } from 'react-router'

import {UserContext} from '../../App'
import { Link } from 'react-router-dom'


const Signup = () => {
    


    const history=useHistory();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');


    const submitSignup =(e)=>
    {

        if(email=='' || password=='' || name=='' || 
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase()) )
        return;

        e.preventDefault();
        fetch("http://localhost:5000/signup",
        {
            headers:
            {
                "Content-Type":"application/json"
            },
            method:"post",
            body:JSON.stringify({name,email,password})
        }).then(res=>res.json())
        .then(res=>
            {
                    console.log(res)
                    if(!res.error)
                    {
                        console.log(res)
                        history.push("/signin")
                    }
                    else
                    {
                         alert(res.error)
                    }
            })
        .catch(err=>alert(err))
    }

    return (
        <div className="signup-container">
            <div className="container">
            <div className="signupDesign"></div>
            
                <div className="signupText">
                <h1>Welcome to Speak Up!</h1>
            <form className="form">
                <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" id="login-button" onClick={(e)=>submitSignup(e)}>Signup</button>
                </form>

                <p className="redirect">Already have an account?
                    <Link to="/signin" className="loginLink">Login here..</Link></p>
            
               
                </div>
               
                
            </div>
        </div>
    )
}


export default Signup