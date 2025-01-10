import React from "react";
import { FirstSection } from './FirstSection.js';
import "../../styles/components/mainPage/MainContent.css";
import { SecondSection } from "./SecondSection.js";
import { ThirdSection } from "./ThirdSection.js";
import { StatisticSection } from "./StatisticSection.js";


export const MainContent = () => {
    return (
        <div className = "all-sections">
            <FirstSection></FirstSection>
            <StatisticSection></StatisticSection>
            <SecondSection></SecondSection>
            <ThirdSection></ThirdSection>
        </div>
        
    )
}