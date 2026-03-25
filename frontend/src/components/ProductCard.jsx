import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // Use default variant or lowest price
  const defaultVariant = product.variants?.[0] || { size: 'Default', price: 0 };
  const startingPrice = defaultVariant.price;

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevents Link wrap if any
    addToCart(product, defaultVariant, 1);
    // Could add a toast notification here
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="glass-card overflow-hidden group flex flex-col h-full bg-surface"
    >
      <Link to={`/product/${product.id}`} className="block relative pt-6 pb-2 px-6 bg-gradient-to-b from-white/5 to-transparent h-[250px] flex items-center justify-center">
        <motion.img 
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs text-gold-500 font-semibold mb-2 uppercase tracking-wider">{product.category}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-white text-lg font-medium">₹{startingPrice}</span>
          <div className="flex gap-2">
            <Link 
              to={`/product/${product.id}`}
              className="text-[10px] md:text-xs uppercase tracking-wider font-semibold bg-white/5 hover:bg-white/20 text-white py-2 px-4 rounded-full transition-all duration-300 border border-white/10 flex items-center"
            >
              View Details
            </Link>
            <button 
              onClick={handleAddToCart}
              title="Add to Cart"
              className="text-[10px] md:text-xs uppercase tracking-wider font-semibold bg-gold-500 hover:bg-gold-400 text-black py-2 px-4 rounded-full transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_10px_rgba(229,181,59,0.2)] hover:shadow-[0_0_15px_rgba(229,181,59,0.4)]"
            >
              <ShoppingCart size={14} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
