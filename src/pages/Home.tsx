import React from 'react';
import { Hero } from '../components/Hero';
import {
  ComfortInputs,
  ComfortRecommendation,
  EnergyInputs,
  ActiveTab,
} from '../types';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Gauge,
  Thermometer,
  Wind,
} from 'lucide-react';

interface HomeProps {
  comfortInputs: ComfortInputs;
  recommendation: ComfortRecommendation;
  energyInputs: EnergyInputs;
  onNavigate: (tab: ActiveTab) => void;
  isFanConnected?: boolean;
  onToggleConnection?: () => void;
}

export const Home: React.FC<HomeProps> = ({
  comfortInputs,
  recommendation,
  energyInputs,
  onNavigate,
  isFanConnected,
  onToggleConnection,
}) => {
  return (
    <div className="min-h-screen">
      {/* Strict Reference Image Recreation Hero */}
      <Hero
        comfortInputs={comfortInputs}
        recommendation={recommendation}
        onNavigate={onNavigate}
        isFanConnected={isFanConnected}
        onToggleConnection={onToggleConnection}
      />

      {/* Value Comparison & Architectural Intelligence Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <TrendingDown className="w-3.5 h-3.5" />
              Efficiency Benchmark
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Why Aerodynamic & Energy Intelligence Matters
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Ceiling fans operate for thousands of hours every year. Choosing the optimal speed based on real ambient humidity and switching to high-efficiency motors can cut running electricity costs by up to 60%.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('energy-insights')}
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm group cursor-pointer"
              >
                <span>Explore Energy Analytics & Charts</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Induction Fan Profile */}
            <div className="bg-[#091528]/80 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-xl">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Conventional Induction Fan
              </div>
              <div className="text-2xl font-black text-white mt-1">75W Rated</div>
              <p className="text-xs text-slate-400 mt-2">
                Typical AC capacitor motor running 10 hours daily.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Monthly Energy:</span>
                  <span className="font-bold text-white">22.5 kWh</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Monthly Cost (@ ₹7.5):</span>
                  <span className="font-bold text-rose-400">₹168.75 / month</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Yearly Cost:</span>
                  <span className="font-bold text-rose-400">₹2,053 / year</span>
                </div>
              </div>
            </div>

            {/* BLDC Smart Fan Profile */}
            <div className="bg-gradient-to-b from-[#0b1d3a] to-[#08152b] border border-cyan-400/50 rounded-2xl p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,240,255,0.12)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  BLDC Eco Smart Fan
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400/50 text-cyan-300 font-bold">
                  5-STAR
                </span>
              </div>
              <div className="text-2xl font-black text-cyan-300 mt-1">28W Rated</div>
              <p className="text-xs text-slate-300 mt-2">
                Brushless DC motor with precision speed regulation.
              </p>
              <div className="mt-4 pt-4 border-t border-cyan-500/20 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Monthly Energy:</span>
                  <span className="font-bold text-cyan-300">8.4 kWh</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Monthly Cost (@ ₹7.5):</span>
                  <span className="font-bold text-emerald-300">₹63.00 / month</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Yearly Cost:</span>
                  <span className="font-bold text-emerald-300">₹766 / year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
