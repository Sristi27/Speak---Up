import { Link,useHistory } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from '../../App'
import logo from './../../images/logo.png'
import './navstyles.css'

const Nav = () => {


  const { state, dispatch } = useContext(UserContext);
  const history=useHistory();


    return (
        <nav className="navbar navbar-expand-lg navbar-light sticky-top">

        <a href="/" className="navbar-brand">
            <img src={logo} height="60px" width="40px"/>
            <span style={{marginLeft:'10px',fontWeight:'bold',fontSize:'30px'}}>Speak Up</span>
        </a>


        <button className="navbar-toggler" type="button" data-toggle="collapse"
         data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
          aria-expanded="false" aria-label="Toggle navigation">

          <span className="navbar-toggler-icon"></span>

        </button>
      
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/add">Add</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/grid">Read</a>
            </li>
          </ul>

          <ul className="navbar-nav my-2 my-lg-0">
          <li className="nav-item">

              <a className="nav-link" href="/contact">
               Contact Us</a>
          </li>

          <li className="nav-item">

              <a className="nav-link" href="/stats">
               Stats</a>
          </li>

                {/* <li className="nav-item">

              <a className="nav-link" 
              // href="https://github.com/Sristi27/BW-Hacks"
              href=""
              // target="_blank"
              >
              <i class="fa fa-github icon"></i></a>
                </li> */}
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


     
      
                