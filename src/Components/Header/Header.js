import React from 'react';
import './Header.css';

export const Header = () => {

    const handleIconClicked = (iconName) => {
        console.log(`${iconName} icon clicked!`);
    }
    return (
        <header className = "header">
            <div className="header-menu">

                <button onClick={() => handleIconClicked('menu')} className="header-menu icon-style">
                    <i className="fas fa-bars"></i>
                </button>

            </div>

            <div className="header-logo">
                <h1 className = "logo" >Logo</h1>
            </div>

            <div className="header-icons">
                <button onClick={() => handleIconClicked('bookmark')} className="header-icons icon-style">
                    <i className="far fa-bookmark"></i>
                </button>
                <button onClick={() => handleIconClicked('heart')} className="header-icons icon-style">
                    <i className="far fa-heart"></i>
                </button>
                <button onClick={() => handleIconClicked('user')} className="header-icons icon-style">
                    <i className="far fa-user"></i>
                </button>
            </div>

        </header>
    )
}