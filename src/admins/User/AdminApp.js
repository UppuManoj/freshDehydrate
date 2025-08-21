import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import UserProfile from './pages/UserProfile';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function AdminApp() {
  const { currentUser } = useAuth();
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

  return (
    <Router>
      <ScrollToTop />
      <div className="user-app">
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
        <Navbar 
          isLoggedIn={!!currentUser} 
          username={currentUser?.name || "Guest"} 
          cartCount={cart.length} 
          favoritesCount={favorites.length}
          onLoginClick={() => setShowLogin(true)}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products onAddToCart={addToCart} onToggleFavorite={toggleFavorite} favorites={favorites} />} />
            <Route path="/products/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} isLoggedIn={!!currentUser} onLoginClick={() => setShowLogin(true)} setShowLogin={setShowLogin} />} />
            <Route path="/favorites" element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default AdminApp;
