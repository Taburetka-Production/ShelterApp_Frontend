import React from 'react';
import './Header.css';

export const Header = () => {
    return (
        <header className = "header">
            <div className="header-menu">
                <i className="fas fa-bars"></i>
            </div>

            <div className="header-logo">
                <h1 className = "logo" >Logo</h1>
            </div>

            <div className="header-icons">
            <i className="far fa-bookmark"></i>
                <i className="far fa-heart"></i>
                <i className="far fa-user"></i>
                
            </div>
        </header>
    )
}