import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white block mb-4">
              COGGEN <span className="text-gradient">NUTRITION</span>
            </Link>
            <p className="text-textSecondary text-sm leading-relaxed mb-6">
              Design your perfect physique. Premium sports nutrition crafted for elite athletes and serious lifters. No compromises, just results.
            </p>
          </div>
          
          {/* Shop Links */}
          <div>
            <h4 className="text-white font-medium mb-4 tracking-wide uppercase text-sm">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/shop?category=Proteins" className="text-textSecondary hover:text-gold-500 text-sm transition-colors">Proteins</Link></li>
              <li><Link to="/shop?category=Weight Gainers" className="text-textSecondary hover:text-gold-500 text-sm transition-colors">Weight Gainers</Link></li>
              <li><Link to="/shop?category=Pre-Workout" className="text-textSecondary hover:text-gold-500 text-sm transition-colors">Pre-Workout</Link></li>
              <li><Link to="/shop?category=Recovery" className="text-textSecondary hover:text-gold-500 text-sm transition-colors">Recovery & Amino</Link></li>
              <li><Link to="/shop?category=Wellness" className="text-textSecondary hover:text-gold-500 text-sm transition-colors">Wellness</Link></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="text-white font-medium mb-4 tracking-wide uppercase text-sm">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-textSecondary hover:text-gold-500 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-textSecondary hover:text-gold-500 text-sm transition-colors">Contact</Link></li>
              <li><Link to="/refund" className="text-textSecondary hover:text-gold-500 text-sm transition-colors">Refund Policy</Link></li>
              <li><Link to="/privacy" className="text-textSecondary hover:text-gold-500 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-textSecondary hover:text-gold-500 text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-4 tracking-wide uppercase text-sm">Stay Updated</h4>
            <p className="text-textSecondary text-sm mb-4">Subscribe for exclusive offers and hardcore training tips.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-surface border border-white/10 text-white px-4 py-2 text-sm w-full rounded-l-md focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all font-sans"
              />
              <button className="bg-gold-500 text-black px-4 font-semibold text-sm rounded-r-md hover:bg-gold-400 transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-textSecondary text-xs">
            &copy; {new Date().getFullYear()} Coggen Nutrition. All rights reserved.
          </p>
          <div className="flex gap-4">
             <span className="text-textSecondary text-xs">Based in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
