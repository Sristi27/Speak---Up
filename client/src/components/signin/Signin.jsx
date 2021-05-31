import React, { useContext, useState } from 'react'
import './loginstyles.css'
import { useHistory } from 'react-router'
import {UserContext} from '../../App'
import { Link } from 'react-router-dom'


const Signin = () => {



    const {state,dispatch}=useContext(UserContext)

    const history=useHistory();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');


    const submitLogin =(e)=>
    {

        if(email=='' || password=='' || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase()) )
        {
            alert("Please fill all the fields correctly!")
            return;
        }

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
                    // console.log(res)
                    if(!res.error)
                    {
                        localStorage.setItem("jwt",res.token);
                        //data.user was an object
                        localStorage.setItem("user",JSON.stringify(res.user))
                        dispatch({type:"USER",payload:res.user})
                        // console.log(res)
                        history.push("/")
                    }
                    else
                    {
                         alert(res.error)
                         return;
                    }
            })
        .catch(err=>alert(err))
    }

    return (
        <div className="login-container">
            
            <div className="container">
           <div className="loginText">
           <h1>Welcome back<br></br>To Speak UP!</h1>
         
       {/* <Link to="/add">Add</Link> */}
           
           <form className="form">
           <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
           <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
           <button type="submit" id="login-button" onClick={(e)=>submitLogin(e)}>Login</button>
           </form>

           <p className="redirect">New here?
           <Link to="/signup" className="linkdesign">
               Create your account now!</Link></p>
       
         </div>
            
         <div className="loginDesign"></div>
         
         

            </div>
            </div>
    )
}

export default Signin
