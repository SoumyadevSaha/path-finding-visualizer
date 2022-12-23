import './index.css'
import myImg from './myImg.png'
import React from 'react'

const About = () => {
  return (
    <div className='aboutMe cards_item'>
      <div class="card" style={{width: "40%"}}>
        <img src={myImg} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Soumyadev Saha</h5>
          <p class="card-text">I am a 3rd year student pursuing Computer Science Engineering at Jadavpur University, as of 2022.</p>
          <p class="card-text">This is a simple path-finding-simulator that uses Dijkstra's shortest path algorithm to find the shortest path between the source and destination node minding the obstacle nodes.<br/>This Web app is built in React JS with custom CSS animations</p>
          <a href="https://soumyadev-portfolio-1.netlify.app/" class="btn" target="_blank" rel="noreferrer">My Portfolio</a>
        </div>
      </div>
    </div>
  )
}

export default About
