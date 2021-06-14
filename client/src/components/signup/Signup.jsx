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
    const [success,setSuccess]=useState(
        {
            status:false,
            text:''
        }
    );
    const [danger,setDanger] = useState(
        {
            status:false,
            text:''
        }
    );
    const [loading,setLoading]=useState(
        {
            status:false,
            text:''
        }
    )
    const[photoUrl,setPhotoUrl]=useState('');

    const submitSignup =(e)=>
    {

        setLoading({...loading,status:true,text:"Signing up"})
        setDanger({...danger,status:false});
        setSuccess({...success,status:false});
        e.preventDefault();
        
        
        if(email=='' || password=='' || name=='' || 
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase()) )
        {
            setDanger({...danger,status:false,text:"Please fill all the fields correctly!"});
            setLoading({...loading,status:false,text:""})
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
                            setLoading({...success,status:false,text:''});
                                if(!res.error)
                                {

                                    setSuccess({...success,status:true,text:'Signup Successfull!'});
                                  }
                                else
                                {
                                    alert(res.error)
                                    setDanger({...danger,text:"Signup unsuccessfull.Please try again!",status:true})
                                     return;
                                }

                        })
                    .catch(err=>{
                        setDanger({...danger,status:true,text:err});
                        alert(err)
                    })
                
                }
            
            


        
    


    const uploadImage = (photo) =>
                {
                 
           
                   if(photo=='')
                   {
                       setDanger({...danger,status:true,text:"Please capture your photo"});
                       setCaptureSuccess(false);
                       return;
                   }


                   setLoading({...loading,status:false,text:'Capturing Image'});
           
                   setPhotoUrl(photo);
                   const formData=new FormData();
                   formData.append('file',photo);
                   formData.append('upload_preset','speak-up');
                   formData.append('cloud_name','ducw5cejx');
           
           
                   // console.log(photo)
           
                 
           
                  fetch("https://api.cloudinary.com/v1_1/ducw5cejx/image/upload",
                  {
                       method:'post',
                       body:formData
                   })
                   .then(res=>res.json())
                   .then(res=>
                       {
                           
                   fetch("/capture",
                           {
                               headers:
                               {
                                   'Content-Type':'application/json'
                               },
                               method:'POST',
                               body:JSON.stringify({url:res.url})
                               // body:formData
                           }).then(res=>res.json())
                           .then(async res=>
                           {
                   
                               setLoading({...loading,text:"",satus:false});
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
                                       alert('Woman detected!Picture upload successfull.Please fill out the remaining form')
                                   }
                               }
                   
                           }).catch(error=>
                               {
                                   setLoading({...loading,status:false,text:''});
                                   alert(error)
                               })
                           
                       })
                   .catch(err=>console.log(err))
           
                   
               }

    return (
        <div className="signup-container">
        {success.status?
        <Success msg={success.text} 
        navigate ={"login"}/>:<></>}
        {danger.status?
        <Danger msg={danger.text}/>:<></>}

            <div className="container">
            <div className="signupDesign"></div>
            
                <div className="signupText">
                {loading.status?<Loader msg={loading.text}/>:<></>}
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