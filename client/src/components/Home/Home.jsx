import React, { useContext } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import Footer from '../Footer/Footer'
import Nav from '../nav/Nav'
import './homestyles.css'
import violence3 from './../../images/violence3.jpeg'
import violence4 from './../../images/violence4.jpeg'
import home from './../../images/home.png'
import v5 from '../../images/v5.jpeg'
import forwomen from '../../images/forwomen.jpeg'
import hear from '../../images/hear.jpeg'
import w from '../../images/w.jpeg'

const Home = () => {

  const { state, dispatch } = useContext(UserContext);

  const history=useHistory();


    return (
           
           
           <div className="container-fluid home">
            <Nav/>


            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div className="carousel-item active">
    <img class="d-block w-100" src={w}  alt="First slide"/>
    <div class="carousel-caption  d-md-block">
    <button className="btn btn-primary">
    <a href="#content" class="smooth-scroll">Read More</a>
    </button>
      </div>
    </div>


    <div class="carousel-item">
      <img class="d-block w-100" src={violence3} alt="Second slide"/> 
      <div class="carousel-caption d-md-block">
      <button className="btn btn-primary">
          <a href="#content" class="smooth-scroll">Read More</a></button>
        </div>
    </div>


    <div class="carousel-item">
      <img class="d-block w-100" src={violence4} alt="Third slide"/>
      <div class="carousel-caption  d-md-block">
        <button className="btn btn-primary">
          <a href="#content" class="smooth-scroll">Read More</a></button>
         </div>
    </div>

  </div>

  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div>
               
               
               
               <section className="header-content" id="content">

                <img src={home}/>


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
               <Footer/>
                {/*  */}
       
      </div>
    )
}

export default Home
