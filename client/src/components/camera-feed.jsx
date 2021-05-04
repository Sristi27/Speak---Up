import React, { Component, useState } from 'react';
import './cameraStyles.css'
import Webcam from "react-webcam";
import fs from 'fs'
const WebcamComponent = () => <Webcam />;



const videoConstraints = {
    width: 260,
    height: 200,
    facingMode: "user"
  };
  
  export const WebcamCapture = ({uploadImage}) =>
  
  {


    const webcamRef = React.useRef(null);
    const [image,setImage]=useState('');
  
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
       downloadImage(imageSrc)
    });


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
              height={200}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={260}
              videoConstraints={videoConstraints}
            />:<img src={image}/>}
        </div>

<div className="webcam-bnt">
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
              className="webcam-btn">Capture</button>}
    </div>
          </div>
        );
      };    
    

