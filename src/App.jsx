import './styles/app.css';
import Header from './components/Header.jsx';
import Shop from './pages/Shop.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';

function App() {
    return (
        <div className='app'>
            <Header />
            <Contact />
        </div>
    );
}

export default App;
