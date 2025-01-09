import React from "react";
import { FirstSection } from './FirstSection.js';
import "../../styles/components/mainPage/MainContent.css";
import { SecondSection } from "./SecondSection.js";

export const MainContent = () => {
    return (
        <div className = "all-sections">
            <FirstSection></FirstSection>
            <SecondSection></SecondSection>
        </div>
        
    )
}