import React, { useContext } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import './homestyles.css'




const Home = () => {

  const { state, dispatch } = useContext(UserContext);

  const history=useHistory()
    return (
            <div className="container-fluid home">
                <div className="background"></div>
               
               <header> 
               <nav className="navbar navbar-expand-lg navbar-dark">
              <div style={{display:'flex',alignItems:'center'}}>
              <Link to="/">
                <img src="https://miro.medium.com/max/3840/1*gYptxAgBRVHvobYE8WBxJQ.png" height="50px" width="50px"
                style={{marginTop:'-10px'}}/>
                <span style={{marginLeft:'10px',fontWeight:'bold',fontSize:'30px'}}  className="navbar-brand">Speak Up</span>
                </Link>
                <div>
                  <ul className="navbar-nav" style={{display:'flex',flexDirection:'row',
                  alignItems:'center',justifyContent:'space-evenly',marginTop:'5px'}}>
                    <li className="nav-item">
                      <Link to="/add" className="nav-link" style={{color:'white',fontSize:'18px',marginRight:'5px'}}>Add</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/grid" className="nav-link" style={{color:'white',fontSize:'18px',marginRight:'5px'}}>Grid</Link>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" style={{color:'white',fontSize:'18px'}}
                    onClick={()=>{
                      localStorage.clear();
                      dispatch({type:"CLEAR"})
                      history.push("/signin");
                   }}>Logout</a></li>
                  </ul>
                </div>
              </div>
              </nav>
     
      
                <section className="header-content">

                <img src="https://assets.change.org/photos/5/bp/pr/HIBppRmSGHJIKsC-800x450-noPad.jpg?1537348802"/>


                   <div className="home-text">
                   <h1><span  className="home-title">Speak Up</span></h1>
                    <br/>
                    <p style={{fontWeight:'bolder'}}> Welcome everyone!<br/>
                    Share your issues with the community to spread awareness about the <br/>
                    social, mental and physical problems women face everyday.<br/>
                    Your account may help another women going through the same. 
                    <br/>
                    Make your voice heard.
                    <br/>
                    Hear stories of women going through it, and of women who bravely overcame it.<br/>
                    </p>
                    <Link to="/grid"><button>Read Stories</button></Link>
                    <Link to="/add"><button>Share yours'</button></Link>
                   </div>
                    
                </section>
                
                <h6 className="footer-text">Made with ❤️  by <a href="">Sristi</a> and <a href="">Soumi</a></h6>
       </header> 
      </div>
    )
}

export default Home
