import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gold-500 text-black hover:bg-gold-400 shadow-[0_0_15px_rgba(229,181,59,0.3)] hover:shadow-[0_0_25px_rgba(229,181,59,0.5)]",
    secondary: "bg-surfaceLight text-white hover:bg-white/10 border border-white/10",
    outline: "border border-gold-500 text-gold-500 hover:bg-gold-500/10",
    ghost: "text-textSecondary hover:text-white hover:bg-white/5"
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.96 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
