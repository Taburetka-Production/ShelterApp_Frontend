import React from 'react';
import { Button } from "../Button.js";
import { Link } from "react-router-dom";
import "../../styles/components/mainPage/SecondSection.css";

export const SecondSection = () => {
    return (
    <div class = "second-section">
        <div className = "second-section-img">
            Image
        </div>

        <div className = "second-section-group">
            <h1>About us</h1>
            <div className = "second-section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia. </div>
                            
            <Link to="/shelters" style={{ textDecoration: 'none' }}>

                <Button className="second-section-btn">Visit Animals</Button>
            </Link>
        </div>
    </div>

    )
}