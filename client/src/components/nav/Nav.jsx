import { Link,useHistory } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from '../../App'
import logo from './../../images/logo.png'
import './navstyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {


  const { state, dispatch } = useContext(UserContext);
  const history=useHistory();


    return (
        <nav class="navbar navbar-expand-lg navbar-light sticky-top">

        <a href="/" className="navbar-brand">
            <img src={logo} height="60px" width="40px"/>
            <span style={{marginLeft:'10px',fontWeight:'bold',fontSize:'30px'}}>Speak Up</span>
        </a>


        <button class="navbar-toggler" type="button" data-toggle="collapse"
         data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
          aria-expanded="false" aria-label="Toggle navigation">

          <span class="navbar-toggler-icon"></span>

        </button>
      
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/add">Add</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/grid">Read</a>
            </li>
          </ul>

          <ul class="navbar-nav my-2 my-lg-0">

          <li className="nav-item">

              <a className="nav-link" href="/contact">
               Contact Us</a>

                </li>
                <li className="nav-item">

              <a className="nav-link" href="https://github.com/Sristi27/BW-Hacks"
              target="_blank">
              <i class="fa fa-github" style={{fontSize:'27px',color:'black'}}></i></a>
                </li>
          <li className="nav-item">

           <a className="nav-link" style={{color:'red'}}
                    onClick={()=>{
                      localStorage.clear();
                      dispatch({type:"CLEAR"})
                      history.push("/signin");
                   }}>Logout</a>

          </li>
          </ul>
        </div>
      </nav>
    )
}

export default Nav


     
      
                