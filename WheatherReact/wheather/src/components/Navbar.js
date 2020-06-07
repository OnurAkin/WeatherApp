import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/fontawesome-free-solid'
import logo from '../img/cloudy-day-1.svg';


function Navbar() {
    return (

        <nav>
            <img src={logo} className="logo" alt="WeatherApp" />
            <h2>WeatherApp</h2>



        </nav>


    )
}

export default Navbar