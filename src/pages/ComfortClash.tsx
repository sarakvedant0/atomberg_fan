import React, { useState } from 'react';
import { Users, Scale, CheckCircle2, RotateCcw, Sliders, ThumbsUp, Flame, Snowflake, Sparkles, AlertCircle } from 'lucide-react';
import { calculateComfortCompromise } from '../calculations/comfortClash';
import { UserFeedback } from '../types';

export const ComfortClash: React.FC = () => {
  const [personASpeed, setPersonASpeed] = useState<number>(2);
  const [personBSpeed, setPersonBSpeed] = useState<number>(4);
  const [manualAdjustment, setManualAdjustment] = useState<number | null>(null);
  const [isCompromiseAccepted, setIsCompromiseAccepted] = useState(false);

  const [personAFeedback, setPersonAFeedback] = useState<UserFeedback>(null);
  const [personBFeedback, setPersonBFeedback] = useState<UserFeedback>(null);

  const clashResult = calculateComfortCompromise(personASpeed, personBSpeed, manualAdjustment);

  const handleReset = () => {
    setPersonASpeed(2);
    setPersonBSpeed(4);
    setManualAdjustment(null);
    setIsCompromiseAccepted(false);
    setPersonAFeedback(null);
    setPersonBFeedback(null);
  };

  const handleAcceptCompromise = () => {
    setIsCompromiseAccepted(true);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Scale className="w-3.5 h-3.5" />
          Module 2: Multi-Occupant Harmony
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Resolve Comfort Conflicts
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-3xl">
          When two people in the same room prefer different airflow levels, ComfortIQ helps compute a fair, mathematically balanced compromise to satisfy both occupants.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Both Occupant Preference Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Person A Card */}
            <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,180,255,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Person A
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-400/30 text-cyan-300">
                  Speed {personASpeed}
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-4">Select preferred fan speed:</p>

              {/* 1-5 speed selector */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => {
                      setPersonASpeed(speed);
                      setManualAdjustment(null);
                      setIsCompromiseAccepted(false);
                    }}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                      personASpeed === speed
                        ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>

              {/* Person A Feedback */}
              <div className="pt-4 border-t border-cyan-500/15">
                <div className="text-[11px] font-semibold text-slate-400 mb-2">Person A's feeling at compromise:</div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPersonAFeedback('too_warm')}
                    className={`p-1.5 rounded-lg border text-[11px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      personAFeedback === 'too_warm'
                        ? 'bg-rose-950 border-rose-500 text-rose-300'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <Flame className="w-3 h-3 text-rose-400" />
                    Warm
                  </button>
                  <button
                    type="button"
                    onClick={() => setPersonAFeedback('comfortable')}
                    className={`p-1.5 rounded-lg border text-[11px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      personAFeedback === 'comfortable'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Comfort
                  </button>
                  <button
                    type="button"
                    onClick={() => setPersonAFeedback('too_cold')}
                    className={`p-1.5 rounded-lg border text-[11px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      personAFeedback === 'too_cold'
                        ? 'bg-blue-950 border-blue-500 text-blue-300'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <Snowflake className="w-3 h-3 text-blue-400" />
                    Cold
                  </button>
                </div>
              </div>
            </div>

            {/* Person B Card */}
            <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,180,255,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Person B
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 border border-blue-400/30 text-blue-300">
                  Speed {personBSpeed}
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-4">Select preferred fan speed:</p>

              {/* 1-5 speed selector */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => {
                      setPersonBSpeed(speed);
                      setManualAdjustment(null);
                      setIsCompromiseAccepted(false);
                    }}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                      personBSpeed === speed
                        ? 'bg-blue-500 text-slate-950 border-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>

              {/* Person B Feedback */}
              <div className="pt-4 border-t border-cyan-500/15">
                <div className="text-[11px] font-semibold text-slate-400 mb-2">Person B's feeling at compromise:</div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPersonBFeedback('too_warm')}
                    className={`p-1.5 rounded-lg border text-[11px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      personBFeedback === 'too_warm'
                        ? 'bg-rose-950 border-rose-500 text-rose-300'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <Flame className="w-3 h-3 text-rose-400" />
                    Warm
                  </button>
                  <button
                    type="button"
                    onClick={() => setPersonBFeedback('comfortable')}
                    className={`p-1.5 rounded-lg border text-[11px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      personBFeedback === 'comfortable'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Comfort
                  </button>
                  <button
                    type="button"
                    onClick={() => setPersonBFeedback('too_cold')}
                    className={`p-1.5 rounded-lg border text-[11px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      personBFeedback === 'too_cold'
                        ? 'bg-blue-950 border-blue-500 text-blue-300'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <Snowflake className="w-3 h-3 text-blue-400" />
                    Cold
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Comparison Bar */}
          <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-white mb-4">Preference Spectrum Comparison</h3>
            <div className="relative pt-6 pb-4">
              {/* Baseline Track */}
              <div className="h-3 w-full bg-slate-800 rounded-full relative">
                {/* Person A marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 border-2 border-slate-950 flex items-center justify-center shadow-[0_0_10px_#00f0ff]"
                  style={{ left: `${((personASpeed - 1) / 4) * 100}%` }}
                >
                  <span className="text-[10px] font-black text-slate-950">A</span>
                </div>

                {/* Compromise Marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center shadow-[0_0_15px_#10b981]"
                  style={{ left: `${((clashResult.effectiveSpeed - 1) / 4) * 100}%` }}
                >
                  <span className="text-xs font-black text-slate-950">{clashResult.effectiveSpeed}</span>
                </div>

                {/* Person B marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-2 border-slate-950 flex items-center justify-center shadow-[0_0_10px_#3b82f6]"
                  style={{ left: `${((personBSpeed - 1) / 4) * 100}%` }}
                >
                  <span className="text-[10px] font-black text-white">B</span>
                </div>
              </div>

              {/* Axis labels */}
              <div className="flex justify-between text-xs text-slate-400 mt-4">
                <span>Speed 1 (Low)</span>
                <span>Speed 2</span>
                <span>Speed 3 (Medium)</span>
                <span>Speed 4</span>
                <span>Speed 5 (High)</span>
              </div>
            </div>

            {/* Manual Speed Adjustment Control */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  Manual Compromise Adjustment Override:
                </span>
                <span className="font-bold text-cyan-300">Speed {clashResult.effectiveSpeed}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={clashResult.effectiveSpeed}
                onChange={(e) => {
                  setManualAdjustment(parseInt(e.target.value));
                  setIsCompromiseAccepted(false);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Compromise Result & Action Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#091528]/90 border border-cyan-500/35 rounded-2xl p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,210,255,0.12)]">
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">
                Compromise Recommendation
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400/50 text-emerald-300">
                Formula: round((A+B)/2)
              </span>
            </div>

            <div className="py-6 flex flex-col items-center text-center">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Suggested Shared Fan Speed
              </div>
              <div className="text-6xl font-black text-white tracking-tight mt-2 flex items-baseline gap-2">
                <span>Speed {clashResult.effectiveSpeed}</span>
              </div>
              <p className="text-xs text-cyan-300 mt-1 font-medium">
                {manualAdjustment !== null ? '(Manually adjusted by occupants)' : '(Calculated mathematical median)'}
              </p>

              {/* Delta offsets */}
              <div className="grid grid-cols-2 gap-3 w-full mt-6">
                <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 text-left">
                  <div className="text-[11px] text-slate-400">Person A Adjustment</div>
                  <div className="text-base font-bold text-cyan-300 mt-0.5">
                    {clashResult.deltaA > 0 ? `+${clashResult.deltaA} (Faster)` : clashResult.deltaA < 0 ? `${clashResult.deltaA} (Slower)` : 'Exact match'}
                  </div>
                </div>
                <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 text-left">
                  <div className="text-[11px] text-slate-400">Person B Adjustment</div>
                  <div className="text-base font-bold text-blue-300 mt-0.5">
                    {clashResult.deltaB > 0 ? `+${clashResult.deltaB} (Faster)` : clashResult.deltaB < 0 ? `${clashResult.deltaB} (Slower)` : 'Exact match'}
                  </div>
                </div>
              </div>
            </div>

            {/* Advice box */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/25 text-left mb-6">
              <p className="text-xs text-slate-200 leading-relaxed">
                {clashResult.advice}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleAcceptCompromise}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isCompromiseAccepted
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompromiseAccepted ? 'Compromise Accepted ✓' : 'Accept Compromise'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Preferences</span>
              </button>
            </div>

            {/* Mandatory Specification Explanation */}
            <div className="mt-6 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 leading-normal">
              The average-speed method is a simple starting point and may not fully resolve individual comfort differences. Adjust fan positioning, distance, or clothing for personalized micro-climate comfort.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
