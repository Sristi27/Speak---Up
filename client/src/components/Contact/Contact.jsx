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
            In case of any immediate help,reach out to us at <span className="mail">wespeakup@gmail.com</span>
            <br/>
            <br/>
            Join our community of strong and brave women from all around the world.
            <br/>
            <p className="social">
                Reach out to us at :
                <br/><br/>
                <ul>
                    <li><FontAwesomeIcon icon={faLinkedinIn}/></li>
                    <li><FontAwesomeIcon icon={faFacebookF} /></li>
                    <li><FontAwesomeIcon icon={faTwitter} /></li>
                    <li><FontAwesomeIcon icon={faInstagram} /></li>
                </ul>
            </p>
            </p>
            </div>
        </div>
        </>
    )
}

export default Contact
