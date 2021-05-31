import React from 'react'
import {Link} from 'react-router-dom'
import './newUserStyles.css'
import mentalHealth from './../../images/mentalHealth.jpeg'

const newUser = () => {
    return (
        <div>
            <div className="user-container">
              
              <div className="user-content">
                <h3 className="title">Welcome to Speak UP</h3>

<div className="user-text">

As an individual, we believe your account of your experience 
and how you overcame mental issues can be of help to some other person going through the same.



<br/><br/>
Consider this a safe space where 
nobody judges you. Your accounts remain completely anonymous.Select one of the categories for your post 
and let it off your mind.

<br/><br/>
 Research shows writing about 
something liberates our minds from the weight of it. 
It gives us mental peace.


<br/>
 <div className="caption">Go ahead and let out your thoughts!
     </div>

 </div>

<div className="title-btm">Love and Best wishes,
Speak up Team<br/>
<Link to="/signin"><button className="btn btn-primary user-login">
    Join Us</button></Link></div>
    </div>


<div className="image-container">
    <img src={mentalHealth}></img>
</div>
</div>
        </div>
    )
}

export default newUser
