import './index.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';;

const Footer = () => {
  return (
    <footer className = "footer-distributed">
  
        <div className = "footer-right">
  
          <a href='/'><FontAwesomeIcon icon={faFacebook} /></a>
          <a href='/'><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://www.linkedin.com/in/soumyadev-saha-5ab6a8237/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
          <a href="https://github.com/SoumyadevSaha/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
  
        </div>
  
        <div className = "footer-left">
  
          <p className = "footer-links">
            <a className = "link-1" href="/"> Home </a>
  
            <a href='/'> Blog </a>
  
            <a href='/'> Pricing </a>
  
            <a href="/about"> About </a>
  
            <a href='/'> Faq </a>
  
            <a href='/'> Contact </a>
          </p>
  
          <p>Soumyadev's Creations &copy; 2022</p>
        </div>
  
        </footer>
  )
}

export default Footer
