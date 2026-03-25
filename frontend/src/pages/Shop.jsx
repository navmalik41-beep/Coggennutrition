import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Filter } from 'lucide-react';

const Shop = () => {
  const { products, loading, error, refreshProducts } = useProducts();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(products.map(p => p.category))];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryQuery = params.get('category');
    if (categoryQuery && categories.includes(categoryQuery)) {
      setActiveCategory(categoryQuery);
    }
  }, [location, products]);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen relative py-12 pt-28">
      <div className="bg-layer bg-fitness"></div>
      <div className="overlay-layer"></div>
      
      <div className="content-layer container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8 mt-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Our <span className="text-gradient">Products</span>
          </h1>
          <p className="text-textSecondary max-w-2xl text-lg">
            Browse our complete selection of premium sports nutrition designed to help you achieve your ultimate physique.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-2 text-textSecondary uppercase tracking-widest text-sm font-bold">
            <Filter size={18} /> Filters
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-gold-500 text-black shadow-[0_0_15px_rgba(229,181,59,0.3)]' 
                    : 'bg-surface text-textSecondary hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {error ? (
          <div className="text-center py-20 text-red-400 glass-panel max-w-2xl mx-auto border border-red-500/20">
            <div className="bg-red-500/5 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Connection Lost</h3>
              <p className="text-lg mb-8 text-white/70">Unable to connect to the backend server API. Please ensure it is running on port 5000.</p>
              <button onClick={refreshProducts} className="bg-red-500/20 text-red-400 px-8 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold tracking-wide border border-red-500/30">
                Retry Connection
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-white/10 border-t-gold-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-textSecondary glass-panel max-w-2xl mx-auto">
            <p className="text-xl mb-4">No products found in this category.</p>
            <button 
              onClick={() => setActiveCategory("All")}
              className="text-gold-500 hover:text-gold-400 font-medium"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
