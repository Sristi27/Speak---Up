import React, { useContext } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import Footer from '../Footer/Footer'
import Nav from '../nav/Nav'
import './homestyles.css'
import mh1 from './../../images/mh1.png'
import mh2 from './../../images/mh2.jpeg'
import mh3 from './../../images/mh3.png'
import mental from './../../images/mental.png'

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
    <img class="d-block w-100"  height="655px" src={mh3}  alt="First slide"/>
    <div class="carousel-caption  d-md-block">
    <button className="btn btn-primary">
    <a href="#content" class="smooth-scroll">Read More</a>
    </button>
      </div>
    </div>


    <div class="carousel-item">
      <img class="d-block w-100 "  height="655px" src={mh2} alt="Second slide"/> 
      <div class="carousel-caption d-md-block">
      <button className="btn btn-primary">
          <a href="#content" class="smooth-scroll">Read More</a></button>
        </div>
    </div>


    <div class="carousel-item">
      <img class="d-block w-100"  height="655px" src={mh1} alt="Third slide"/>
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

                <img src={mental}/>


                   <div className="home-text">
                   <h1><span  className="home-title">Speak Up</span></h1>
                    <br/>
                    <p style={{fontWeight:'bolder'}}> Welcome everyone!<br/>
                    Share your mental issues with the community to spread awareness about the <br/>
                    various problems people face everyday.<br/>
                    <br/>
                    Make your voice heard.
                    <br/>
                    Hear stories of others going through it, and of people who bravely overcame it.<br/>
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
