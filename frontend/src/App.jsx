import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider, useCart } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import StaticPage from './pages/StaticPage';
import WhatsAppButton from './components/WhatsAppButton';

const AppContent = () => {
  const { getCartCount } = useCart();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartCount={getCartCount()} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<StaticPage title="About Us" />} />
          <Route path="/contact" element={<StaticPage title="Contact" />} />
          <Route path="/privacy" element={<StaticPage title="Privacy Policy" />} />
          <Route path="/refund" element={<StaticPage title="Refund Policy" />} />
          <Route path="/terms" element={<StaticPage title="Terms of Service" />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
