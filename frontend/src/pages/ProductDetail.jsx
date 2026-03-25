import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Check, ArrowLeft, ShoppingBag, Plus, Minus, Star } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 31) + 10);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewers(Math.floor(Math.random() * 31) + 10);
    }, 5000);

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find(p => p.id === id);
      if (found) {
        setProduct(found);
        if (found.variants?.length > 0) {
          setSelectedVariant(found.variants[0]);
        }
      }
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addToCart(product, selectedVariant, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen relative pt-32 pb-20 flex justify-center items-center">
        <div className="bg-layer bg-product"></div>
        <div className="overlay-layer"></div>
        <div className="w-16 h-16 border-4 border-white/10 border-t-gold-500 rounded-full animate-spin relative z-10"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pt-28 pb-20">
      <div className="bg-layer bg-product"></div>
      <div className="overlay-layer"></div>
      <div className="content-layer container mx-auto px-4 md:px-8">
        
        <Link to="/shop" className="inline-flex items-center gap-2 text-textSecondary hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-bold">
          <ArrowLeft size={16} /> Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 md:p-12 flex items-center justify-center relative aspect-square xl:aspect-auto xl:h-[700px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/5 to-transparent rounded-2xl pointer-events-none"></div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain filter drop-shadow-2xl z-10"
            />
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col py-4"
          >
            <div className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-3">
              {product.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-gold-500">
                {Array(5).fill(0).map((_, i) => {
                  const rating = product.reviews?.length > 0 ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length) : 5;
                  return <Star key={i} size={18} fill={i < Math.round(rating) ? "currentColor" : "none"} />;
                })}
              </div>
              <span className="text-textSecondary text-sm uppercase tracking-wider font-bold ml-2">
                {product.reviews?.length > 0 ? `${(product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)}/5 Based on ${product.reviews.length} reviews` : "No reviews yet"}
              </span>
            </div>

            <div className="text-3xl font-medium text-white mb-6 tracking-wide">
              ₹{selectedVariant?.price}
            </div>

            {/* Conversion Boosters */}
            <div className="space-y-3 mb-8 bg-black/20 p-5 rounded-xl border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-sm text-red-400 font-bold tracking-wide">
                <span className="text-lg">🔥</span> {viewers} people are viewing this right now
              </div>
              <div className="flex items-center gap-3 text-sm text-gold-500 font-bold tracking-wide">
                <span className="text-lg">⏳</span> Offer ends in {formatTime(timeLeft)}
              </div>
              {product.stock && (
                <div className="flex items-center gap-3 text-sm text-orange-400 font-bold tracking-wide">
                  <span className="text-lg">📦</span> Only {product.stock} left in stock - Order soon!
                </div>
              )}
            </div>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-widest text-textSecondary font-bold mb-4">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map(variant => (
                    <button
                      key={variant.size}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-6 py-3 rounded-xl border font-medium transition-all duration-300 ${
                        selectedVariant?.size === variant.size
                          ? 'bg-gold-500/10 border-gold-500 text-gold-500 shadow-[0_0_15px_rgba(229,181,59,0.15)]'
                          : 'bg-surface border-white/10 text-textSecondary hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <div className="flex items-center bg-surface border border-white/10 rounded-full h-14 overflow-hidden focus-within:border-gold-500/50 transition-colors">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-14 h-full flex items-center justify-center text-textSecondary hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <div className="w-10 text-center text-white font-medium bg-white/5 h-full flex items-center justify-center">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-14 h-full flex items-center justify-center text-textSecondary hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="h-14 flex-grow text-lg shadow-xl"
                disabled={added}
              >
                {added ? (
                  <><Check size={20} /> Added to Cart</>
                ) : (
                  <><ShoppingBag size={20} /> Add to Cart</>
                )}
              </Button>
            </div>
            
            {/* Trust Indicator */}
            <div className="flex justify-center items-center gap-2 -mt-6 mb-10 text-textSecondary text-sm font-medium">
              <Check size={16} className="text-green-500" /> Trusted by 1000+ customers
            </div>

            {/* Tabs for extra details */}
            <div className="mt-auto">
              <div className="flex flex-wrap gap-6 md:gap-8 border-b border-white/10 mb-6 px-2">
                {['description', 'benefits', 'ingredients', 'usage'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${
                      activeTab === tab ? 'text-gold-500' : 'text-textSecondary hover:text-white'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTab" 
                        className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-gold-500"
                      />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="text-textSecondary leading-relaxed min-h-[150px] px-2 text-sm md:text-base selection:bg-gold-500/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'description' && <p>{product.description}</p>}
                    {activeTab === 'benefits' && (
                      <ul className="list-disc pl-5 space-y-2 marker:text-gold-500">
                        {product.benefits?.map((benefit, i) => <li key={i}>{benefit}</li>)}
                      </ul>
                    )}
                    {activeTab === 'ingredients' && (
                      <ul className="list-disc pl-5 space-y-2 marker:text-gold-500">
                        {product.ingredients?.map((ing, i) => <li key={i}>{ing}</li>)}
                      </ul>
                    )}
                    {activeTab === 'usage' && <p>{product.usage}</p>}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="mt-16 pt-10 border-t border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review, idx) => (
                    <div key={idx} className="glass-panel p-6 border border-white/5">
                      <div className="flex items-center gap-2 mb-3 text-gold-500">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <p className="text-textSecondary text-xs mb-3 font-bold uppercase tracking-wide">By {review.name} - Verified Buyer</p>
                      <p className="text-white/80 leading-relaxed text-sm">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <div className="glass-panel p-6 text-center text-textSecondary italic border border-white/5">
                    No reviews yet. Be the first to review this product!
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
