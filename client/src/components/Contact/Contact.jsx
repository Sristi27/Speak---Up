import React from 'react'
import './contactstyles.css'
import contact from './../../images/contact.jpg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF} from "@fortawesome/free-brands-svg-icons"
import { faLinkedinIn} from "@fortawesome/free-brands-svg-icons"
import { faTwitter} from "@fortawesome/free-brands-svg-icons"
import { faInstagram} from "@fortawesome/free-brands-svg-icons"
import Nav from '../nav/Nav'

const Contact = () => {
    return (
        <>
        <Nav/>
        <div className="contactDiv">
            <img src={contact}></img>
            <div className="content">
            <h2>
                <span className="h3-title">Connect with US
                </span>
            </h2>
            <p className="content-para">
            In case of any immediate help,reach out to us at
             <a href="mailto:sristi2705@gmail.com"
             className="mail">
                 wespeakup@gmail.com
            </a>
            <br/>
            <br/>
            Join our community of strong and brave women from all around the world.
            <br/>
            <p className="social">
                Reach out to us at :
                <br/><br/>
                <ul>
                    <li>
                        <a href="https://www.linkedin.com/in/sristi-chowdhury-3660941a5/"
                        target="_blank">
                            <FontAwesomeIcon icon={faLinkedinIn}/></a></li>
                    <li><a href="https://github.com/Sristi27" target="_blank"><i class="fa fa-github">
                        </i></a></li>
                    <li><a href="https://twitter.com/SRISTICHOWDHUR6" target="_blank">
                        <FontAwesomeIcon icon={faTwitter} /></a></li>
                    <li><a href="https://www.linkedin.com/in/sristi-chowdhury-3660941a5/"
                        target="_blank">
                        <FontAwesomeIcon icon={faInstagram} /></a></li>
                </ul>
            </p>
            </p>
            </div>
        </div>
        </>
    )
}

export default Contact
