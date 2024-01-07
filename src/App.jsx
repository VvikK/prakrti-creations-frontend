import { Route, Routes } from 'react-router-dom';

import './styles/app.css';
import Layout from "./components/Layout";
import Header from './components/Header.jsx';
import Shop from './pages/Shop.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* PUBLIC ROUTES */}
                <Route index element={<Home />} />
                {/* END PUBLIC ROUTES */}
            </Route>
        </Routes>
    );
}

export default App;
