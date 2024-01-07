import { Route, Routes } from 'react-router-dom';

import './styles/app.css';
import Layout from "./components/Layout";
// import Header from './components/Header.jsx';
import Shop from './pages/Shop.jsx';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* PUBLIC ROUTES */}
                <Route index element={<Home />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="shop" element={<Shop />} />
                <Route path="contact" element={<Contact />} />
                {/* END PUBLIC ROUTES */}
            </Route>
        </Routes>
    );
}

export default App;
