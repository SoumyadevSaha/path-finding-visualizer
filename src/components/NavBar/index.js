import './index.css';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import navigator from './navigator.png';

const NavBar = () => {
  return (
    <nav>
         <ul>
            <li><img src={navigator} alt=""/></li>
            <li className="logo">PathVisualizer</li>
            <li className="btn"><span className="fas fa-bars"></span></li>
            <div className="items">
               <li><a href="/">Home</a></li>
               <li><a href="/about">About</a></li>
               {/* <li><a href="#">Services</a></li>
               <li><a href="#">Contact</a></li> */}
            </div>
            <li className="search-icon">
               <input type="search" placeholder="Search" />
               <label className="icon">
               <FontAwesomeIcon icon={faSearch} color="cyan" />
               </label>
            </li>
         </ul>
      </nav>
  )
}

export default NavBar
