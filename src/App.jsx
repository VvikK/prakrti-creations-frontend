import './styles/app.css';
import Header from './components/Header.jsx';
import Shop from './pages/Shop.jsx';
import Home from './pages/Home.jsx';

function App() {
    return (
        <div className='app'>
            <Header />
            <Home />
        </div>
    );
}

export default App;
