import React, { useState } from 'react'
import { WebcamCapture } from './camera-feed';
import './homecmp.css'

const HomeCmp = () => {


    const [name,setName]=useState('');
    const [email,setEmail]=useState('');

    const submitSignup = () =>
    {
        console.log('Submitted!')
    }
    
    return (
        <div className="homecmp-container">
        <div className="container">
            <div className="text">
            <h1>Fill Up The Form!</h1>
        <form className="form">

        <WebcamCapture/>

            <input type="text" placeholder="Name"
            onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}/>
            <button type="submit" id="login-button" 
            onClick={(e)=>submitSignup(e)}
            >Submit</button>
            </form>
           
            </div>
        </div>
    </div>
    )
}

export default HomeCmp
