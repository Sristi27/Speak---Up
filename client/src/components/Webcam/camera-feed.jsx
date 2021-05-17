import React, { Component, useState,useEffect } from 'react';
// import './cameraStyles.css'
import Webcam from "react-webcam";
import fs from 'fs'
const WebcamComponent = () => <Webcam />;



const videoConstraints = {
    width: 160,
    height: 150,
    facingMode: "user"
  };
  
  export const WebcamCapture = ({uploadImage}) =>
  
  {
    
    const webcamRef = React.useRef(null);
    const [image,setImage]=useState('');
  
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        // console.log(imageSrc)
        setImage(imageSrc)
        downloadImage(imageSrc)
    },
    [webcamRef]);


   


    async function downloadImage(imageSrc) {
      const image = await fetch(imageSrc)
      const imageBlob = await image.blob()
      uploadImage(imageBlob)

    }




return (
          <div className="webcam-container">
          <div className="webcam-img">
            {image==''?<Webcam
              audio={false}
              height={150}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={160}
              videoConstraints={videoConstraints}
            />:<img src={image}/>}
        </div>

      <div>
            {image!=''?
            <button onClick={(e)=>
              {
                e.preventDefault();
                setImage('')
            }} 
            className="webcam-btn">
              Retake Image</button>:
              <button onClick={(e)=>{
                e.preventDefault();
                capture();
              }}
              className="webcam-btn">Capture</button>
              }
    </div>
          </div>
        );
      };    
    

