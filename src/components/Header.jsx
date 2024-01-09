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
                    <Link to="/"><li className='active' ><p>Home</p></li></Link>
                    <Link to="/gallery"><li className='inactive'><p>Gallery</p></li></Link>
                    <Link to="/shop"><li className='inactive'><p>Shop</p></li></Link>
                    <Link to="/contact"><li className='inactive'><p>Contact Us</p></li></Link>
                </ul>
            </div>
        </div>
    );
}

export default Header;
