import React from 'react';
import { ActiveTab } from '../types';
import { Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#030712] border-t border-cyan-500/15 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-[0_0_12px_rgba(0,240,255,0.6)]">
                IQ
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Comfort<span className="text-cyan-400">IQ</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Smart fan comfort recommendations, occupant conflict resolution, and electricity cost intelligence platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Core Modules
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Smart Comfort Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('comfort-clash')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Resolve Comfort Conflicts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('energy-calculator')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Fan Energy & Cost Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('energy-insights')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Energy Insights & Charts
                </button>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Platform & System
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('settings')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  User Preferences & Hardware
                </button>
              </li>
              <li>
                <span className="text-slate-500">Frontend Simulation Engine v1.0</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Safety & Honesty Disclaimer per Master Prompt */}
        <div className="pt-8 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-3">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300">Safety & Simulation Notice:</strong> ComfortIQ is currently a software-based simulation. Recommendations and electricity costs are estimates based on user inputs. Actual fan performance and electricity consumption may vary. No physical fan or electrical appliance is controlled by this application.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              © 2026 ComfortIQ Platform. Smart Comfort. Intelligent Energy.
            </div>
            <div className="flex items-center gap-4">
              <span>Client-Side Local Processing</span>
              <span>Zero Hardware Connection</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
