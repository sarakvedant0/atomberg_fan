import React, { useState } from 'react';
import { Menu, X, ArrowRight, ArrowLeft, Fan, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; tab: ActiveTab }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Dashboard', tab: 'dashboard' },
    { label: 'Comfort Conflicts', tab: 'comfort-clash' },
    { label: 'Energy Calculator', tab: 'energy-calculator' },
    { label: 'Energy Insights', tab: 'energy-insights' },
    { label: 'How It Works', tab: 'how-it-works' },
    { label: 'Settings', tab: 'settings' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050B17]/85 backdrop-blur-xl border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo matching reference */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
        >
          {/* Cyan swirl logo icon matching reference image */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-10 h-10 transform group-hover:rotate-45 transition-transform duration-500 filter drop-shadow-[0_0_10px_rgba(0,240,255,0.7)]"
            >
              <defs>
                <linearGradient id="swirlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#0077ff" />
                </linearGradient>
              </defs>
              {/* 6 aerodynamic curved spirals */}
              {[0, 60, 120, 180, 240, 300].map((rot, idx) => (
                <path
                  key={idx}
                  d="M50 50 C 50 30, 70 20, 85 30 C 75 45, 60 48, 50 50 Z"
                  fill="url(#swirlGrad)"
                  transform={`rotate(${rot} 50 50)`}
                  opacity="0.9"
                />
              ))}
              <circle cx="50" cy="50" r="10" fill="#050B17" />
              <circle cx="50" cy="50" r="6" fill="#00f0ff" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
            Comfort<span className="text-cyan-400">IQ</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`relative py-2 text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? 'text-cyan-300 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_#00f0ff]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button: Get Started on Home, Return Home on inside pages */}
        <div className="hidden sm:flex items-center gap-4">
          {activeTab === 'home' ? (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-400/60 hover:border-cyan-300 bg-cyan-950/20 hover:bg-cyan-500/15 text-cyan-300 hover:text-cyan-100 text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_22px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-400/60 hover:border-cyan-300 bg-cyan-950/30 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-100 text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_22px_rgba(0,240,255,0.45)] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>Return Home</span>
            </button>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800/80 border border-cyan-500/30 text-cyan-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050B17]/95 border-b border-cyan-500/30 px-6 py-6 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />}
                </button>
              );
            })}
            {activeTab === 'home' ? (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('home')}
                className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-600/30 border border-cyan-400/60 text-cyan-200 font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.2)] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return Home</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
