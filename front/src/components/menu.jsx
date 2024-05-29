import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <header>
            <div className="headerTitle">
                UBar
            </div>
            <div className="navbar">
                <ul className="navlist">
                    <li href="#">Accueil</li>
                    <li href="#">Bars</li>
                    <li href="#">Commandes</li>
                    <li href="#">Qui sommes-nous</li>
                </ul>
            </div>
            <div className="logbar">

            </div>
        </header>
    );
};

export default Menu;