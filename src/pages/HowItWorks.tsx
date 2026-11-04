import React from 'react';
import {
  Thermometer,
  Fan,
  Scale,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HowItWorksProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const steps = [
    {
      step: '01',
      title: 'Enter Room Conditions',
      desc: 'Input your ambient room temperature, relative humidity percentage, occupancy count, and activity type (sleep, relax, study).',
      icon: Thermometer,
      actionLabel: 'Try Dashboard Input',
      tab: 'dashboard' as ActiveTab,
    },
    {
      step: '02',
      title: 'Receive Smart Recommendations',
      desc: 'ComfortIQ calculates the required aerodynamic air speed (levels 1–5) and displays the estimated apparent wind-chill cooling effect.',
      icon: Fan,
      actionLabel: 'View Fan Recommendation',
      tab: 'dashboard' as ActiveTab,
    },
    {
      step: '03',
      title: 'Resolve Shared Comfort Conflicts',
      desc: 'When room partners disagree on fan speed, our conflict engine computes a balanced compromise with actionable airflow distribution advice.',
      icon: Scale,
      actionLabel: 'Resolve Conflicts',
      tab: 'comfort-clash' as ActiveTab,
    },
    {
      step: '04',
      title: 'Calculate Energy & Costs',
      desc: 'Input fan motor wattage, operating hours, and electricity tariff to simulate daily, billing period, and annual running costs in Indian Rupees (₹).',
      icon: Zap,
      actionLabel: 'Open Energy Calculator',
      tab: 'energy-calculator' as ActiveTab,
    },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          System Workflow
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How ComfortIQ Works
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          Four structured steps transforming environmental sensory inputs into optimal fan speed settings, shared conflict harmony, and electricity cost clarity.
        </p>
      </div>

      {/* 4 Steps Grid with connecting lines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="relative bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,180,255,0.08)] flex flex-col justify-between group hover:border-cyan-400/70 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Step badge & icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-black text-cyan-400/50 group-hover:text-cyan-300 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(item.tab)}
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{item.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Science & Thermal Model Explanation */}
      <div className="mt-16 bg-[#091528]/70 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-xl max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          The Thermodynamic Principle of Ceiling Fans
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Ceiling fans do not physically chill or refrigerate room air. Instead, they produce a convective breeze that enhances skin evaporation and sensible heat loss, creating an apparent wind-chill cooling effect of 1.5°C to 4.0°C. By understanding your ambient temperature and relative humidity, ComfortIQ identifies the exact aerodynamic circulation needed so you stay cool while preventing unnecessary motor energy expenditure.
        </p>
      </div>
    </div>
  );
};
