import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    let orderDetails = cart.map(item => 
      `${item.product.name} (${item.variant.size}) - ₹${item.variant.price} x ${item.quantity}`
    ).join('\n');
    
    const message = `*New Order from Coggen Nutrition*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}\n\n*Order:*\n${orderDetails}\n\n*Total:* ₹${getCartTotal()}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917392825062?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen relative pt-32 pb-20 flex flex-col items-center justify-center px-4">
        <div className="bg-layer bg-fitness"></div>
        <div className="overlay-layer"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-surface p-8 rounded-full mb-6 shadow-2xl">
          <ShoppingBag size={48} className="text-gold-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Your Cart is Empty</h2>
        <p className="text-textSecondary mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Discover our premium supplements.</p>
        <Link to="/shop">
          <Button>Return to Shop</Button>
        </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pt-28 pb-20">
      <div className="bg-layer bg-fitness"></div>
      <div className="overlay-layer"></div>
      <div className="content-layer container mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-10 border-b border-white/10 pb-6">
          Shopping <span className="text-gradient">Cart</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.variant.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="glass-panel p-4 md:p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-contain filter drop-shadow-lg bg-surfaceLight rounded-xl p-2" />
                  
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-bold text-white mb-1">{item.product.name}</h3>
                    <p className="text-textSecondary text-sm mb-2 uppercase tracking-wide text-gold-500">{item.product.category} | <span className="text-white">{item.variant.size}</span></p>
                    <div className="text-white font-medium text-lg">₹{item.variant.price} <span className="text-sm text-textSecondary font-normal ml-1">each</span></div>
                  </div>
                  
                  <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
                    <div className="flex items-center bg-background border border-white/10 rounded-full h-10 overflow-hidden shadow-inner">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.variant.size, item.quantity - 1)}
                        className="w-8 h-full flex items-center justify-center text-textSecondary hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <div className="w-8 text-center text-white font-medium bg-white/5 h-full flex items-center justify-center text-sm">{item.quantity}</div>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.variant.size, item.quantity + 1)}
                        className="w-8 h-full flex items-center justify-center text-textSecondary hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.variant.size)}
                      className="text-textSecondary hover:text-red-500 transition-colors bg-background border border-white/5 rounded-full p-2.5 shadow-md hover:border-red-500/30"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 md:p-8 sticky top-32">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h3>
              
              <div className="flex justify-between items-center mb-4 text-textSecondary">
                <span>Subtotal</span>
                <span className="text-white font-medium">₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between items-center mb-6 text-textSecondary border-b border-white/10 pb-6">
                <span>Shipping</span>
                <span className="text-gold-500 font-medium">Free</span>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-3xl font-black text-gold-500 tracking-tight">₹{getCartTotal()}</span>
              </div>
              
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-textSecondary/50 font-sans shadow-inner"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-textSecondary/50 font-sans shadow-inner"
                  />
                </div>
                <div>
                  <textarea 
                    name="address" 
                    required 
                    placeholder="Complete Delivery Address" 
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-textSecondary/50 resize-none font-sans shadow-inner"
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full mt-4 h-14 text-lg">
                  Checkout via WhatsApp
                </Button>
                <p className="text-xs text-textSecondary text-center mt-4">
                  Checkout is processed securely.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
