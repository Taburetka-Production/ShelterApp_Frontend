import React from 'react';
import "../../styles/components/mainPage/StatisticSection.css";

export const StatisticSection = () => {
    const data = [
        {
            id: 1,
            number: 20,
            text: "притулків по всій Україні працюють разом із нами, щоб допомогти тваринам знайти дім",
        },
        {
            id: 2,
            number: 40,
            text: "тваринок щомісяця отримують новий шанс на життя завдяки вашій підтримці",
        },
        {
            id: 3,
            number: 50,
            text: "Понад 40 небайдужих людей стали спонсорами для тваринок у різних притулках.",
        },
        {
            id: 4,
            number: 65,
            text: "Ми працюємо вже 65 днів, об’єднуючи небайдужих людей та притулки.",
        },
    ];

    return (
        <div className="statistic-section">
            {data.map((item) => (
                <div key={item.id} className="statistic-section-item">
                    <div className="circle">{item.number}</div>
                    <div className="text">{item.text}</div>
                </div>
            ))}
        </div>
    );
};