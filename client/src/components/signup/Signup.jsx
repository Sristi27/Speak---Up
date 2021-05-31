import React, { useContext, useState } from 'react'
import './signupstyles.css'
import $ from 'jquery'
import { useHistory } from 'react-router'
import signupIcon from './../../images/signupIcon.png'
import {UserContext} from '../../App'
import { Link } from 'react-router-dom'
// import {Camera} from '../camera'
import { WebcamCapture } from '../Webcam/camera-feed'
import Success from '../../Utils/Success'
import Danger from '../../Utils/Danger'
import Loader from '../../Utils/Loader'




const Signup = () => {
    



    const [photo,setPhoto]=useState('');



    const history=useHistory();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [url,setUrl]=useState('')
    const [capturesuccess,setCaptureSuccess]=useState(false);
    const [captureDanger,setCaptureDanger]=useState(false)
    const [signupSuccess,setSignupSucess]=useState(false);
    const [signupDanger,setSignupDanger] = useState(false);
    const [loading,setLoading]=useState(false)

    const[photoUrl,setPhotoUrl]=useState('');

    const submitSignup =(e)=>
    {

        setLoading(true)
        setSignupDanger(false);
        setSignupSucess(false);
        e.preventDefault();
        
        // if(!capturesuccess)
        // {
        //     alert("Retake Image");
        //     setSignupDanger(true);
        //     setLoading(false)
        //     return;
        // }

        if(email=='' || password=='' || name=='' || 
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase()) )
        {
            alert("Please fill all the fields correctly!")
            setSignupDanger(true);
            setLoading(false);
            return;
        }


        // setUrl(URL.createObjectURL(photoUrl));
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
            
            


        
    


    const uploadImage = (photo) =>
     {
      

        setLoading(true);
        if(photo=='')
        {
            alert("Please capture your photo");
            setCaptureSuccess(false);
            return;
        }

        setPhotoUrl(photo);
        const formData=new FormData();
        formData.append('userImage',photo);

        // console.log(photo)

        fetch("/capture",
        {
            method:'POST',
            body:formData
        }).then(res=>res.json())
        .then(async res=>
        {

            setLoading(false);
            if(res.error)
            {
                alert("Human face not detected");
                setCaptureDanger(false);
                return;
            }
            var body=JSON.parse(res.message.body);
            
            if(body.count>1)
            {
                alert("Two faces detected");
                setCaptureDanger(false);
                return;
            }
            else
            {
                if(body.label=='man')
                {
                    alert('Male detected');
                    setCaptureDanger(false);
                    return;
                }

                else if(body.label=='woman')
                {
                    setCaptureSuccess(true);
                    alert('Woman detected!Picture upload successfull.\
                    Please fill out the remaining form')
                }
            }

        }).catch(error=>
            {
                setLoading(false);
                alert(error)
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
                <h1>Welcome to Speak UP!<span className="icon">
                    <img src={signupIcon} width="50px" 
                height="40px"/></span></h1>
            <form className="form">


        {/* <WebcamCapture uploadImage={uploadImage}/> */}

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