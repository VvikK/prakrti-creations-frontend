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
                    <img src={require("../images/logobackground.png")} alt="logobackground"></img>
                </div>
            </div>
            <div className='bottom curs'>
                <ul>
                    <li className='active'><p>Home</p></li>
                    <li className='inactive'><p>Gallery</p></li>
                    <li className='inactive'><p>Shop</p></li>
                    <li className='inactive'><p>Contact Us</p></li>
                </ul>
            </div>
        </div>
    );
}

export default Header;