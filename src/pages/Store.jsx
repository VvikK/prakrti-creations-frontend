import '../styles/theme.css';
import '../styles/store.css';

function Store() {
    return (
        <div className="store reg">
            <form className="form">
                <input type="text" className="search-bar reg"></input>
            </form>
            <div className="results">
                <ul>
                    <li className="item">
                        <div className="image">
                            <img src={require('./banana.avif')} alt="b"></img>
                        </div>
                        <div>
                            <div className="name reg">Necklace</div>
                            <div className="description reg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                        </div>
                        <div className="price">$5.00</div>
                    </li>
                    <li className="item">
                        
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Store;