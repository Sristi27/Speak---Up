import React, { useContext, useState } from 'react'
import './signupstyles.css'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Success from '../../Utils/Success'
import Danger from '../../Utils/Danger'
import Loader from '../../Utils/Loader'




const Signup = () => {
    



    const history=useHistory();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [url,setUrl]=useState('')
    const [signupSuccess,setSignupSucess]=useState(false);
    const [signupDanger,setSignupDanger] = useState(false);
    const [loading,setLoading]=useState(false)


    const submitSignup =(e)=>
    {

        setLoading(true)
        setSignupDanger(false);
        setSignupSucess(false);
        e.preventDefault();
        

        if(email=='' || password=='' || name=='' || 
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase()) )
        {
            alert("Please fill all the fields correctly!")
            setSignupDanger(true);
            setLoading(false);
            return;
        }


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
                                if(!res.error)
                                {

                                    setSignupSucess(true)
                                    setLoading(false);
                                }
                                else
                                {
                                    alert(res.error)
                                    setSignupDanger(true)
                                    setLoading(false);
                                    return;
                                }

                        })
                    .catch(err=>{
                        setSignupDanger(true);
                        alert(err)
                    })
                
                }
            
            


        
    

    return (
        <div className="signup-container">
        {signupSuccess?
        <Success msg={"Signup successfull"} 
        navigate ={"login"}/>:''}
        {signupDanger?
        <Danger msg={"Signup unsuccessfull.Please try again!"}/>:''}

            <div className="container">
            <div className="signupDesign"></div>
            
                <div className="signupText">
                {loading?<Loader/>:''}
                <h1>Welcome to Speak UP!</h1>
            <form className="form">



                <input type="text" placeholder="Name" 
                onChange={(e)=>setName(e.target.value)}/>
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" id="login-button" 
                onClick={(e)=>submitSignup(e)}
                >Signup</button>
                </form>

                <p className="redirect">Already have an account?
                    <Link to="/signin" className="loginLink">Login here..</Link></p>
                </div>
            </div>
        </div>

    )
}


export default Signup