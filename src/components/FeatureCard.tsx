import React from 'react';
import { Home, Fan, Users, Leaf, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  iconType: 'home' | 'fan' | 'users' | 'leaf';
  targetTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  iconType,
  targetTab,
  onNavigate,
}) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'home':
        return <Home className="w-6 h-6 text-cyan-400 stroke-[2.2]" />;
      case 'fan':
        return <Fan className="w-6 h-6 text-cyan-400 stroke-[2.2]" />;
      case 'users':
        return <Users className="w-6 h-6 text-cyan-400 stroke-[2.2]" />;
      case 'leaf':
        return <Leaf className="w-6 h-6 text-cyan-400 stroke-[2.2]" />;
    }
  };

  return (
    <button
      onClick={() => onNavigate(targetTab)}
      className="group text-left w-full relative bg-[#091528]/80 hover:bg-[#0c1d37]/90 border border-cyan-500/25 hover:border-cyan-400/70 rounded-2xl p-5 backdrop-blur-md shadow-[0_8px_24px_rgba(3,15,35,0.6)] hover:shadow-[0_12px_32px_rgba(0,210,255,0.2)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-start gap-4"
    >
      {/* Luminous square icon container matching reference */}
      <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-cyan-950/80 to-blue-900/60 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_24px_rgba(6,182,212,0.6)] group-hover:border-cyan-300 transition-all duration-300">
        {renderIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
            {title}
          </h3>
          <ArrowRight className="w-4 h-4 text-cyan-400/40 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
        </div>
        <p className="text-xs text-slate-300/80 mt-1.5 leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  );
};
