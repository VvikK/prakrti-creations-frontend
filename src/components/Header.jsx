import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/theme.css';
import '../styles/header.css';

function Header() {
    return (
        <div className='header'>
            <div className="upper">
                <div className="logo">
                    <img src={require("../images/logo.png")} alt="logo"></img>
                </div>
                <div className="background">
                    <img src={require("../images/logobackground.jpg")} alt="logobackground"></img>
                </div>
            </div>
            <div className='bottom curs'>
                <ul>
                    <li className='active' ><Link to="/"><p>Home</p></Link></li>
                    <li className='inactive'><Link to="/gallery"><p>Gallery</p></Link></li>
                    <li className='inactive'><Link to="/shop"><p>Shop</p></Link></li>
                    <li className='inactive'><Link to="/contact"><p>Contact Us</p></Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Header;