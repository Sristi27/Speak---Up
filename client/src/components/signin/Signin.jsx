import React, { useContext, useState } from 'react'
import './loginstyles.css'
import $ from 'jquery'
import { useHistory } from 'react-router'

import {UserContext} from '../../App'





const Signin = () => {



    const {state,dispatch}=useContext(UserContext)

    const history=useHistory();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');


    const submitLogin =(e)=>
    {
        e.preventDefault();
        fetch("/signin",
        {
            headers:
            {
                "Content-Type":"application/json"
            },
            method:"post",
            body:JSON.stringify({email,password})
        }).then(res=>res.json())
        .then(res=>
            {
                    console.log(res)
                    if(!res.error)
                    {
                        localStorage.setItem("jwt",res.token);
                        //data.user was an object
                        localStorage.setItem("user",JSON.stringify(res.user))
                        dispatch({type:"USER",payload:res.user})
                        console.log(res)
                        history.push("/")
                    }
                    else
                    {
                         console.log(res.error)
                    }
            })
        .catch(err=>alert(err))
    }

    return (
        <div className="login-container">
            <div className="wrapper">
            <div className="container">
            <h1>Welcome</h1>
                
                <form className="form">
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" id="login-button" onClick={(e)=>submitLogin(e)}>Login</button>
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

export default Signin
