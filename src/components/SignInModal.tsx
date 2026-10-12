import React, { useState } from 'react';
import { X, Compass, Mail, Lock, ShieldCheck, CheckCircle } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#ded8c7] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#114b3e] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Compass className="w-6 h-6 text-emerald-300" />
          </div>
          <h3 className="editorial-title text-2xl font-bold text-[#11382e]">
            Travel-Life Explorer Account
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Sign in to sync offline itineraries and access municipal field guides.
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <p className="text-sm font-bold text-[#11382e]">Explorer Session Authenticated</p>
            <p className="text-xs text-stone-500">Welcome back to the Archival Field Engine.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-mono text-[10px] font-bold text-stone-500 uppercase mb-1">
                Explorer Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="field.explorer@travel-life.org"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold text-stone-500 uppercase mb-1">
                Security Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#103e33] hover:bg-[#0b2f26] text-white py-3 rounded-xl font-medium text-xs tracking-wide transition-colors cursor-pointer shadow-xs mt-2"
            >
              Sign In to Field Dashboard
            </button>

            <div className="pt-2 text-center text-[11px] text-stone-500">
              <span>Need an exploratory field credential? </span>
              <button 
                type="button" 
                onClick={() => {
                  setEmail('explorer@travel-life.org');
                  setPassword('demo-pass-2025');
                }}
                className="text-[#114b3e] font-semibold underline"
              >
                Auto-fill demo pass
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
