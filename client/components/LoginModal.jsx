import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      alert("Auth Failed: " + err.response?.data?.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z- bg-slate-900/80 backdrop-blur flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Welcome to TorqFix</h2>
        <p className="text-sm text-slate-500 mb-6 font-medium text-blue-500">Sign in to access 2km local engineering assets.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" placeholder="Email" required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200">
            Enter Dashboard
          </button>
        </form>
        <button onClick={onClose} className="w-full mt-4 text-slate-400 text-xs font-bold uppercase tracking-widest">Close</button>
      </div>
    </div>
  );
};

export default LoginModal;