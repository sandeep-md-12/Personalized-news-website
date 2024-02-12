import React from 'react';
import { FaFish } from 'react-icons/fa';
import './NewsList.css'
const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'rgb(3,3,44)', color: 'white', padding: '10px',top:'20px' ,position:'relative'}}>
      <p id="baby_sharks">
        <span style={{color:'#00ff95'}}>© {new Date().getFullYear()} newsile</span> *created by Baby Sharks  <FaFish id="fish" />
      </p>
    </footer>
  );
};

export default Footer;
