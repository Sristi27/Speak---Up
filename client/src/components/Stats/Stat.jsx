import React,{useState,useEffect} from 'react'
import Nav from '../nav/Nav'
import {Bar,Doughnut} from 'react-chartjs-2';
import './graphStyles.css'

const Stat = () => {

const [allPosts,setAllPosts]=useState('');
const [countState,setCountState]=useState({})
const [sentimentState,setSentimentState]=useState({})

//fetch all posts
useEffect(
        async()=>
        {
            await fetch("/allPosts",
            {
            headers:
            {
                "Content-Type":"application/json",
                "Authorization":"Bearer"+localStorage.getItem("jwt")
            },
            method:"get"
            
            })
            .then(res=>res.json())
            .then(res=>
            {
                const posts=res.posts;


                //number of blogs per domain
                {
                    let finance=0,workplace=0,health=0,domestic=0,set=[];
                    for(let i of posts)
                    {
                        if(i.body.sector=="Finance") finance++;
                        else if(i.body.sector=="Workplace") workplace++;
                        else if(i.body.sector=="Domestic")  domestic++;
                        else health++;
                    }

                    set.push(workplace)
                    set.push(finance)
                    set.push(health)
                    set.push(domestic)

                    setCountState({
                        labels: ['Workplace','Finance','Health','Domestic'],
                        datasets: [
                          {
                            label: 'Post Count',
                            backgroundColor: [
                              '#C9DE00',
                              '#6800B4',
                              '#2FDE09',
                              '#00A6B4'
                            //   ''
                            ],
                            hoverBackgroundColor: [
                            '#4B4000',
                            '#35014F',
                            '#175000',
                            '#003350'
                            // '#35014F'
                            ],
                            data:set
                          }
                        ]
                      })
                }


                //overall sentiments
                {
                    let pos=0,neg=0,set=[];
                    for (let post of posts)
                    {
                        console.log(post.body.sentiment)
                        if(post.body.sentiment<0) neg=neg + Math.abs(post.body.sentiment)
                        else pos=pos+(post.body.sentiment)
                    }
                    set.push(pos)
                    set.push(neg)

                    console.log(set)
                    setSentimentState({
                        labels: ['Positive','Negative'],
                        datasets: [
                          {
                            label: 'Overall Sentiment',
                            backgroundColor: [
                                
                                '#2FDE00',
                                '#B21F00'
                            //   '#6800B4'
                            ],
                            hoverBackgroundColor: [
                            '#175000',
                            '#501800',
                            // '#35014F'
                            ],
                            data:set
                          }
                        ]
                      })

                }
                setAllPosts(res.posts);
            })
            .catch(err=>alert(err))
},[]);



    return (
        <div className="stat-container">
            <Nav/>

            <div className="graphs">


<div className="graph1">
            <h3>Blogs per Sector</h3>
            
            <div className="count">
            {/* <Bar
                data={state}
                options={{
                title:{
                    display:true,
                    text:'Average Rainfall per month',
                    fontSize:20
                },
                legend:{
                    display:true,
                    position:'right'
                }
                }}
            /> */}

        {
            countState!={}?
            <Doughnut
            data={countState}
            height={300}
            options={{
                responsive: true,
                maintainAspectRatio:false,
                legend:{
                    display:true,
                    position:'right'
                }
            }}
          />:''}
        
      </div>
      </div>

      <div className="graph-2">
      
      <h3>Overall Sentiment Analysis</h3>
       
       <div className="sentiment">
       {
            sentimentState!={}?
            <Doughnut
            data={sentimentState}
            height={300}
            options={{
                responsive: true,
                maintainAspectRatio:false,
                legend:{
                    display:true,
                    position:'right'
                }
            }}
          />:''}
              </div>  

       </div>
       
       
            </div>
            {/* <h3>Overall Sentiment Analysis</h3>
            <h3>Blogs per domain</h3> */}
           
        </div>
    )
}

export default Stat


