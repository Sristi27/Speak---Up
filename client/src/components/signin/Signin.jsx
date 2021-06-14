import React, { useContext, useState } from 'react'
import './loginstyles.css'
import $ from 'jquery'
import { useHistory } from 'react-router'
import signupIcon from './../../images/signupIcon.png'
import {UserContext} from '../../App'
import { Link } from 'react-router-dom'
import Danger from '../../Utils/Danger'
import Loader from '../../Utils/Loader'


const Signin = () => {



    const {state,dispatch}=useContext(UserContext)

    const history=useHistory();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const [danger,setDanger]=useState(
        {
            status:false,
            text:''
        }
    );
    const [success,setSuccess]=useState(
        {
            status:false,
            text:''
        }
    );
    const [loading,setLoading]=useState(
        {
            text:'',
            status:false
        });

    const submitLogin =(e)=>
    {
        setLoading({...loading,status:true,text:"Signing in..."});
        setDanger({...danger,status:false,text:''});
        setSuccess({...success,status:false,text:''})

        if(email=='' || password=='' || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase()) )
        {
            setDanger({...danger,status:true,text:"Please fill all the fields correctly!"})
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
                    setLoading({...loading,status:false,text:''})
                    if(!res.error)
                    {
                        localStorage.setItem("jwt",res.token);
                        localStorage.setItem("user",JSON.stringify(res.user))
                        dispatch({type:"USER",payload:res.user})
                        alert("Signin successfull!")
                        history.push("/")
                    }
                    else
                    {
                         setDanger({...danger,status:true,text:res.error})
                         return;
                    }
            })
        .catch(err=>
            {
                setDanger({...danger,status:true,text:err})
            })
    }

    return (
        <div className="login-container">
            {danger.status?<Danger msg={danger.text}/>:<></>}
            <div className="container">
           <div className="loginText">
            {loading.status?<Loader msg={loading.text}/>:<></>}
           <h1>Welcome back<br></br>To Speak UP!<span className="icon">
                    <img src={signupIcon} width="50px" 
                height="40px"/></span></h1>
         
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
