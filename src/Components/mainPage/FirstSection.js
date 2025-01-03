import React from 'react';
import { Button } from "../Button.js";
import { Link } from "react-router-dom";
import { Slider } from "C:/projects/Garage/ShelterApp_Frontend/src/Components/mainPage/Slider.js";
import "../../styles/components/mainPage/FirstSection.css";

export const FirstSection = () => {
    return (
        
        <div class="first-section">
            <div class ="first-section-group">
                <h1>Header</h1>
                <div className = "first-section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                
                <Link to="/shelters" style={{ textDecoration: 'none' }}>
                    <Button className="first-section-btn">Visit Shelters</Button>
                </Link>
                
            </div>
            <Slider></Slider>
        </div>
    
    )
}