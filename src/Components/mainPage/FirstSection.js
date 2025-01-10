import React from 'react';
import { Button } from "../Button.js";
import { Link } from "react-router-dom";
import "../../styles/components/mainPage/FirstSection.css";

export const FirstSection = () => {
    return (
        
        <div className="first-section">
            <div className ="first-section-group">
                <h1>Тваринкам теж потрібен дім!</h1>
                <div className = "first-section-text">Станьте чиїмось дивом вже сьогодні! У притулках на вас чекають чотирилапі друзі, які мріють про турботу та любов. Відкрийте своє серце та подаруйте їм справжню домівку. Натисніть нижче, щоб знайти свого нового улюбленця. </div>
                
                <Link to="/shelters" style={{ textDecoration: 'none' }}>
                    <Button className="first-section-btn">Дізнатися більше</Button>
                </Link>
            </div>

            <div className = "first-section-photo-container">
                    <img src="/images/2.png" alt="Description" />
                    <img src="/images/3.png" alt="Description" />
            </div>
            <div className = "first-section-animal-container">
                <img src="/images/6.png" alt="Description" />
            </div>
        </div>
    
    )
}