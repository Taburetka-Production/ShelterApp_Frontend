import React from 'react';
import { Button } from "../Button.js";
import { Link } from "react-router-dom";
import "../../styles/components/mainPage/ThirdSection.css";

export const ThirdSection = () => {

    return (

        <div class = "third-section">
                <div className = "third-section-group">
                            <h1>Об’єднуємо сили заради чотирилапих друзів!</h1>
                            <div className = "third-section-text">Наша ініціатива співпрацює з десятками притулків по всій Україні, щоб кожна тварина знайшла люблячу родину. Завдяки цій співпраці ми допомагаємо тисячам хвостатих знайти новий дім. Підтримайте нашу місію – дайте їм шанс на краще життя. </div>
                        
                            <Link to="/shelters" style={{ textDecoration: 'none' }}>
                                <Button className="third-section-btn">Дізнатися більше</Button>
                            </Link>

                        </div>
            <div className = "third-section-photo-container">
                
                    <img className="third-section-first" src="/images/5.svg" alt="Description"/>

                    <img className="third-section-second"src="/images/4.svg" alt="Description"/>
                        
            </div>

            <div className = "third-section-animal-container">
                <img src="/images/9.svg" alt="Description" />
            </div>
        </div>
    )
}

