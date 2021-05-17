import React from 'react'
import {Link} from 'react-router-dom'
import './newUserStyles.css'
import signupIcon from './../../images/signupIcon.png'

const newUser = () => {
    return (
        <div>
            <div class="user-container">
              
              <p className="user-content">
                <h3 className="title">Welcome to Speak UP 
                <span className="icon" style={{margin:'0 10px'}}>
                    <img src={signupIcon} width="55px" 
                height="50px"/></span>
                for women!</h3>

<p className="user-text">As women, we believe your account of your experience 
and how you overcame issues can be of help to some other 
woman going through the same.


<br/><br/>
Consider this a safe space where 
nobody judges you. Your accounts remain completely anonymous.Select one of the categories for your post 
and let it off your mind.

<br/><br/>
 Research shows writing about 
something liberates our minds from the weight of it. 
It gives us mental peace.
It's time for the women of the world to start talking 
about their issues without being judged or commented on by other people.


<br/>
 <p className="caption">Go ahead and let out your thoughts!
     </p>

 </p>

<p className="title-btm">Love and Best wishes,
Speak up Women Team<br/>
<Link to="/signin"><button className="btn btn-primary user-login">
    Join Us</button></Link></p>
    </p>
<svg xmlns="http://www.w3.org/2000/svg"  className="user-svg"
viewBox="0 0 1440 280">
  <path fill="#BB377D" fill-opacity="1" 
  d="M0,224L80,192C160,160,320,96,480,112C640,128,800,224,960,229.3C1120,235,1280,149,1360,106.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
</svg>
</div>
        </div>
    )
}

export default newUser
