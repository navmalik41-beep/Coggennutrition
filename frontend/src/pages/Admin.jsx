import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { useProducts } from '../context/ProductContext';
import { Plus, Edit2, Trash2, X, Save, Lock, LogOut } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const { products, refreshProducts, loading, error } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialFormState = {
    name: '', category: '', image: '', description: '',
    benefits: '', ingredients: '', usage: '', variants: [{ size: '', price: '' }]
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const auth = localStorage.getItem('coggenAdminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'coggen123';
    if (passwordInput === correctPassword) {
      localStorage.setItem('coggenAdminAuth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('coggenAdminAuth');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      ...product,
      benefits: product.benefits.join('\n'),
      ingredients: product.ingredients.join('\n'),
    });
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = field === 'price' ? Number(value) : value;
    setFormData({ ...formData, variants: newVariants });
  };

  const addVariantField = () => {
    setFormData({ ...formData, variants: [...formData.variants, { size: '', price: 0 }] });
  };

  const removeVariantField = (index) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedData = {
      ...formData,
      benefits: formData.benefits.split('\n').filter(b => b.trim() !== ''),
      ingredients: formData.ingredients.split('\n').filter(i => i.trim() !== ''),
      variants: formData.variants.filter(v => v.size.trim() !== '')
    };

    try {
      if (editingId) {
        await fetch(`https://coggennutrition.onrender.com/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData)
        });
      } else {
        await fetch('https://coggennutrition.onrender.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData)
        });
      }
      setIsModalOpen(false);
      refreshProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`https://coggennutrition.onrender.com/${id}`, { method: 'DELETE' });
        refreshProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background relative pt-32 pb-20 flex items-center justify-center px-4">
        <div className="relative z-20 w-full flex justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 md:p-10 max-w-md w-full"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gold-500/10 p-4 rounded-full text-gold-500">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h2>
          <p className="text-textSecondary text-center mb-8 text-sm">Please enter the master password to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className={`w-full bg-background border rounded-xl px-4 py-3 text-white focus:outline-none transition-all ${authError ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-gold-500 focus:ring-1 focus:ring-gold-500'}`}
                autoFocus
              />
              {authError && <p className="text-red-500 text-xs mt-2">{authError}</p>}
            </div>
            <div className="flex gap-4">
              <Button type="button" variant="ghost" onClick={() => navigate('/')} className="w-full bg-white/5 hover:bg-white/10 text-white border-none">Exit</Button>
              <Button type="submit" className="w-full">Login</Button>
            </div>
          </form>
        </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b border-white/10 pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-textSecondary text-sm mt-2">Manage products and catalog inventory.</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleOpenNew} className="text-sm px-5 py-2.5 shadow-lg">
              <Plus size={18} /> Add Product
            </Button>
            <Button variant="outline" onClick={handleLogout} className="text-sm px-5 py-2.5">
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <h3 className="font-bold text-lg mb-1 flex items-center gap-2">⚠️ Backend Connection Error</h3>
              <p className="text-sm text-red-400">Unable to connect to the backend server. Make sure `node server.js` is running on port 5000.</p>
            </div>
            <Button onClick={refreshProducts} variant="outline" className="text-red-500 hover:text-white border-red-500/30 hover:bg-red-500 whitespace-nowrap">Reconnect Backend</Button>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-white/10 border-t-gold-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-white/5 text-textSecondary uppercase tracking-wider text-xs">
                    <th className="p-5 font-bold border-b border-white/5 whitespace-nowrap">Product</th>
                    <th className="p-5 font-bold border-b border-white/5 whitespace-nowrap">Category</th>
                    <th className="p-5 font-bold border-b border-white/5 whitespace-nowrap">Pricing Range</th>
                    <th className="p-5 font-bold border-b border-white/5 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {products.map(product => {
                    const minPrice = product.variants?.length ? Math.min(...product.variants.map(v => v.price)) : 0;
                    return (
                      <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="p-5 flex items-center gap-4">
                          <div className="w-14 h-14 bg-background border border-white/5 rounded-xl flex items-center justify-center p-1.5 shadow-inner">
                            <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain filter drop-shadow-sm" />
                          </div>
                          <span className="font-bold text-white text-base">{product.name}</span>
                        </td>
                        <td className="p-5 text-textSecondary">{product.category}</td>
                        <td className="p-5 text-gold-500 font-medium tracking-wide">Starts at ₹{minPrice}</td>
                        <td className="p-5 text-right">
                          <button onClick={() => handleOpenEdit(product)} className="text-gold-500 p-2.5 hover:bg-gold-500/10 rounded-xl transition-colors inline-block mr-2 border border-transparent hover:border-gold-500/20">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="text-red-500 p-2.5 hover:bg-red-500/10 rounded-xl transition-colors inline-block border border-transparent hover:border-red-500/20">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 20 }} 
                className="relative bg-surface border border-white/10 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-surface/90 backdrop-blur-xl border-b border-white/10 p-6 flex justify-between items-center z-10">
                  <h2 className="text-2xl font-bold text-white">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                  <button onClick={handleClose} className="text-textSecondary hover:text-white bg-white/5 p-2 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Name</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-white/5 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all font-sans" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Category</label>
                        <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-background border border-white/5 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all font-sans" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Image URL (Cloudinary)</label>
                      <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-background border border-white/5 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all placeholder-textSecondary/30 font-sans" placeholder="https://res.cloudinary.com/..." />
                      {formData.image && (
                        <div className="mt-3 bg-white/5 p-2 rounded-xl inline-block border border-white/5">
                          <img src={formData.image} alt="Preview" className="h-16 object-contain" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Description</label>
                      <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="3" className="w-full bg-background border border-white/5 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all resize-none font-sans"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Benefits (One per line)</label>
                        <textarea value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} rows="4" className="w-full bg-background border border-white/5 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all resize-none placeholder-textSecondary/30 font-sans leading-relaxed" placeholder="Muscle Recovery&#10;High Protein..."></textarea>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Ingredients (One per line)</label>
                        <textarea value={formData.ingredients} onChange={e => setFormData({...formData, ingredients: e.target.value})} rows="4" className="w-full bg-background border border-white/5 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all resize-none placeholder-textSecondary/30 font-sans leading-relaxed" placeholder="Whey Isolate&#10;Cocoa..."></textarea>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Usage</label>
                      <input required type="text" value={formData.usage} onChange={e => setFormData({...formData, usage: e.target.value})} className="w-full bg-background border border-white/5 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all font-sans" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                        <label className="block text-sm font-bold text-white uppercase tracking-wider">Variants (Size & Pricing)</label>
                        <button type="button" onClick={addVariantField} className="text-xs text-black border border-gold-500 hover:bg-gold-400 font-bold flex items-center gap-1 bg-gold-500 px-4 py-2 rounded-full transition-colors">
                          <Plus size={14} /> Add Variant
                        </button>
                      </div>
                      <div className="space-y-3">
                        {formData.variants.map((variant, index) => (
                          <div key={index} className="flex gap-4 items-center bg-background p-2 rounded-xl border border-white/5">
                            <input required type="text" placeholder="Size (e.g., 1kg)" value={variant.size} onChange={e => handleVariantChange(index, 'size', e.target.value)} className="w-1/2 bg-transparent px-4 py-2 text-white focus:outline-none font-sans" />
                            <div className="w-[1px] h-8 bg-white/10"></div>
                            <input required type="number" placeholder="Price (₹)" value={variant.price} onChange={e => handleVariantChange(index, 'price', e.target.value)} className="w-1/2 bg-transparent px-4 py-2 text-white focus:outline-none font-sans" />
                            <button type="button" onClick={() => removeVariantField(index)} className="text-red-500 hover:bg-red-500 hover:text-white p-2.5 rounded-lg transition-colors ml-auto mr-1">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/10 flex flex-col-reverse sm:flex-row justify-end gap-4">
                    <Button type="button" variant="ghost" onClick={handleClose} className="w-full sm:w-auto">Cancel</Button>
                    <Button type="submit" className="w-full sm:w-auto shadow-lg"><Save size={18} className="mr-2" /> Save Product Config</Button>
                  </div>
                </form>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Admin;
