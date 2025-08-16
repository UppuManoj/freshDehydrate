import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showLogin, setShowLogin] = useState(false);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const toggleFavorite = (product) => {
    setFavorites(prevFavorites => {
      const isFavorited = prevFavorites.some(item => item.id === product.id);
      if (isFavorited) {
        return prevFavorites.filter(item => item.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        {showLogin && <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
        <Navbar isLoggedIn={isLoggedIn} onLoginClick={() => setShowLogin(true)} onLogout={handleLogout} username="Guest User" cartCount={cart.length} favoritesCount={favorites.length} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products onAddToCart={addToCart} onToggleFavorite={toggleFavorite} favorites={favorites} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} onLoginClick={() => setShowLogin(true)} setShowLogin={setShowLogin} onLogout={handleLogout} />} />
            <Route path="/favorites" element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
