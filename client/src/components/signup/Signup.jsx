import React, { useContext, useState } from 'react'
import './signupstyles.css'
import $ from 'jquery'
import { useHistory } from 'react-router'
import signupIcon from './../../images/signupIcon.png'
import {UserContext} from '../../App'
import { Link } from 'react-router-dom'
// import {Camera} from '../camera'
import { WebcamCapture } from '../camera-feed'
import Camera from 'react-camera';




const Signup = () => {
    


    const history=useHistory();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [url,setUrl]=useState('')

    const submitSignup =(e)=>
    {


        e.preventDefault();
        
        if(photo=='')
        {
            alert("Please capture your photo");
            return;
        }
        else
        formData.append('userImage',photo);

        if(email=='' || password=='' || name=='' || 
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase()) )
        {
            alert("Please fill all the fields correctly!")
            return;
        }


        fetch("/capture",
        {
            method:'POST',
            body:formData
        }).then(res=>res.json())
        .then(async res=>
        {
            // var n=res.body.length
            if(res.error)
            {
                alert("Human face not detected");
                return;
            }

            var body=JSON.parse(res.message.body);
            
            if(body.count>1)
            {
                alert("Two faces detected");
                return;
            }
            else
            {
                if(body.label=='man')
                {
                    alert('Male detected');
                    return;
                }

                else if(body.label=='woman')
                {
                   setUrl(URL.createObjectURL(photo));
                   fetch("/signup",
                    {
                        headers:
                        {
                            "Content-Type":"application/json"
                        },
                        method:"post",
                        body:JSON.stringify({email,name,password})
                    }).then(res=>res.json())
                    .then(res=>
                        {
                                console.log(res)
                                if(!res.error)
                                {
                                    // console.log(res)
                                    history.push("/signin")
                                }
                                else
                                {
                                    alert(res.error);
                                    return;
                                }
                        })
                    .catch(err=>alert(err))
                
                }
            }
            
        }).catch(err=>console.log(err))


        
    }


    const formData=new FormData();

    const [photo,setPhoto]=useState('');

    const uploadImage = (photo) =>
     {
      
         setPhoto(photo);

     }

    return (
        <div className="signup-container">
            <div className="container">
            <div className="signupDesign"></div>
            
                <div className="signupText">
                <h1>Welcome to Speak Up!<span className="icon">
                    <img src={signupIcon} width="50px" 
                height="40px"/></span></h1>
            <form className="form">


        <WebcamCapture uploadImage={uploadImage}/>

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