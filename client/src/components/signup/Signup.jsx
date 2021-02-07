import React, { useContext, useState } from 'react'
import './signupstyles.css'
import $ from 'jquery'
import { useHistory } from 'react-router'

import {UserContext} from '../../App'


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
        fetch("/signup",
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
            <div className="wrapper">
            <div className="container">
            <h1>Welcome</h1>
                
                <form className="form">
                <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" id="login-button" onClick={(e)=>submitSignup(e)}>Signup</button>
                </form>
            </div>
            
            <ul className="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            </div>
        </div>
    )
}


export default Signup