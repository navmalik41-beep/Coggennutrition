import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { useProducts } from '../context/ProductContext';
import { Dumbbell, ShieldCheck, Zap, Truck } from 'lucide-react';

const Home = () => {
  const { products, loading, error } = useProducts();
  
  const featuredProducts = products.slice(0, 4);

  const features = [
    { icon: <Zap size={32} />, title: "Premium Quality", desc: "Highest grade raw materials sourced globally." },
    { icon: <Dumbbell size={32} />, title: "Formulated for Elite", desc: "Scientific blends purely for maximum performance." },
    { icon: <ShieldCheck size={32} />, title: "Lab Tested", desc: "Every batch verified for purity and safety." },
    { icon: <Truck size={32} />, title: "Fast Delivery", desc: "Express delivery straight to your door." },
  ];

  return (
    <div className="min-h-screen">
      <HeroSlider />
      
      {/* Featured Section */}
      <section className="relative py-24">
        <div className="bg-layer bg-product"></div>
        <div className="overlay-layer"></div>
        
        <div className="content-layer container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-sm text-gold-500 font-bold uppercase tracking-widest mb-2">Our Best Sellers</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white">Elite <span className="text-gradient">Selection</span></h3>
          </div>
          <Link to="/shop" className="hidden md:block">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>
        
        {error ? (
          <div className="text-center py-20 text-red-400/90 glass-panel max-w-3xl mx-auto border-red-500/20">
            <p className="text-lg bg-red-500/10 p-6 rounded-xl inline-block border border-red-500/10">Unable to load featured products. The backend server might be offline.</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-white/10 border-t-gold-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-12 flex justify-center md:hidden">
          <Link to="/shop"><Button variant="outline">View All Products</Button></Link>
        </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-surface border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm text-gold-500 font-bold uppercase tracking-widest mb-2">Coggen Advantage</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white">Why Train With Us?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 text-center flex flex-col items-center"
              >
                <div className="text-gold-500 bg-gold-500/10 p-4 rounded-full mb-6">
                  {feat.icon}
                </div>
                <h4 className="text-white font-bold text-xl mb-3">{feat.title}</h4>
                <p className="text-textSecondary leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
