import '../styles/theme.css';
import '../styles/header.css';

function Header() {
    return (
        <div className='header'>
            <div className="logo">logo area</div>
            <div className='curs'>
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