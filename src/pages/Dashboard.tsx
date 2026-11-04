import React, { useState } from 'react';
import {
  Thermometer,
  Droplets,
  Users,
  Activity,
  Fan,
  ThumbsUp,
  Flame,
  Snowflake,
  Info,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  ComfortInputs,
  ComfortRecommendation,
  ActivityType,
  ComfortPreference,
  UserFeedback,
} from '../types';
import { calculateComfortRecommendation } from '../calculations/comfortEngine';

interface DashboardProps {
  inputs: ComfortInputs;
  onInputsChange: (newInputs: ComfortInputs) => void;
  recommendation: ComfortRecommendation;
}

export const Dashboard: React.FC<DashboardProps> = ({
  inputs,
  onInputsChange,
  recommendation,
}) => {
  const [feedback, setFeedback] = useState<UserFeedback>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleTempChange = (temp: number) => {
    onInputsChange({ ...inputs, temperatureC: temp });
  };

  const handleHumidityChange = (hum: number) => {
    onInputsChange({ ...inputs, humidityPct: hum });
  };

  const handleActivityChange = (act: ActivityType) => {
    onInputsChange({ ...inputs, activity: act });
  };

  const handleOccupantsChange = (occ: number) => {
    onInputsChange({ ...inputs, occupants: occ });
  };

  const handlePreferenceChange = (pref: ComfortPreference) => {
    onInputsChange({ ...inputs, preference: pref });
  };

  const handleFeedback = (type: UserFeedback) => {
    setFeedback(type);
    if (type === 'too_warm') {
      setFeedbackMessage('Feedback noted: Feeling too warm. We suggest bumping the fan speed by +1 level or ensuring cross-ventilation.');
    } else if (type === 'too_cold') {
      setFeedbackMessage('Feedback noted: Feeling drafty or chilly. We suggest dialing down by -1 level or setting sleep mode.');
    } else {
      setFeedbackMessage('Excellent! Your room climate is in your personal thermal sweet spot.');
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Module 1: Real-Time Intelligence
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Smart Comfort Dashboard
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-3xl">
          Adjust your room conditions and personal comfort profile below to receive tailored fan speed recommendations, evaporative cooling estimates, and thermal explanations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Controls and Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,180,255,0.08)]">
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-cyan-400" />
              Room Environmental Conditions
            </h2>

            {/* Temperature Slider */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="temp-slider" className="text-slate-300 font-medium flex items-center gap-1.5">
                  Room Temperature
                </label>
                <span className="text-xl font-extrabold text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-3 py-0.5 rounded-lg">
                  {inputs.temperatureC}°C
                </span>
              </div>
              <input
                id="temp-slider"
                type="range"
                min="18"
                max="38"
                step="0.5"
                value={inputs.temperatureC}
                onChange={(e) => handleTempChange(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>18°C (Cool)</span>
                <span>26°C (Temperate)</span>
                <span>38°C (Very Warm)</span>
              </div>
            </div>

            {/* Humidity Slider */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="humidity-slider" className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  Relative Humidity
                </label>
                <span className="text-xl font-extrabold text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-3 py-0.5 rounded-lg">
                  {inputs.humidityPct}%
                </span>
              </div>
              <input
                id="humidity-slider"
                type="range"
                min="20"
                max="95"
                step="1"
                value={inputs.humidityPct}
                onChange={(e) => handleHumidityChange(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>20% (Dry Air)</span>
                <span>55% (Moderate)</span>
                <span>95% (Heavy Sultry)</span>
              </div>
            </div>

            {/* Activity Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                Current Room Activity
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'sleep', label: 'Sleep', desc: 'Quiet, gentle air' },
                  { id: 'relaxation', label: 'Relaxation', desc: 'Balanced cooling' },
                  { id: 'study', label: 'Study / Work', desc: 'Alert focus' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleActivityChange(item.id as ActivityType)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      inputs.activity === item.id
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                        : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Occupants Count */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                Number of Occupants
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleOccupantsChange(num)}
                    className={`w-11 h-11 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                      inputs.occupants === num
                        ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {num}{num === 6 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Comfort Preference */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Personal Airflow Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'cooler', label: 'Prefer Cooler', icon: Snowflake },
                  { id: 'balanced', label: 'Balanced Comfort', icon: ThumbsUp },
                  { id: 'less_airflow', label: 'Prefer Less Airflow', icon: Flame },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePreferenceChange(item.id as ComfortPreference)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                        inputs.preference === item.id
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output & Live Recommendations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#091528]/90 border border-cyan-500/35 rounded-2xl p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,210,255,0.12)]">
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">
                Recommendation Output
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950/80 border border-cyan-400/50 text-cyan-300">
                {recommendation.status} Room Status
              </span>
            </div>

            {/* Main Speed Gauge & Recommendation */}
            <div className="py-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.4)] mb-4">
                <Fan className="w-9 h-9 stroke-[2.2] animate-[spin_6s_linear_infinite]" />
              </div>

              <div className="text-sm font-medium text-slate-300">Recommended Fan Speed</div>
              <div className="flex items-baseline justify-center gap-2 mt-1">
                <span className="text-5xl font-black text-white tracking-tight">
                  Speed {recommendation.speedLevel}
                </span>
                <span className="text-xl font-bold text-cyan-400">
                  ({recommendation.percentage}%)
                </span>
              </div>

              {/* 5-bar speed level display */}
              <div className="flex items-center gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <div
                    key={lvl}
                    className={`h-3 w-10 rounded-full transition-all duration-300 ${
                      lvl <= recommendation.speedLevel
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_#00f0ff]'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>

              {/* Apparent Feel Metric */}
              <div className="grid grid-cols-2 gap-3 w-full mt-6">
                <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 text-left">
                  <div className="text-[11px] text-slate-400 font-medium">Estimated RPM</div>
                  <div className="text-lg font-bold text-white mt-0.5">{recommendation.simulatedRpm} RPM</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 text-left">
                  <div className="text-[11px] text-slate-400 font-medium">Convective Cooling</div>
                  <div className="text-lg font-bold text-cyan-300 mt-0.5">~{recommendation.coolingEffectDeltaC}°C Feel</div>
                </div>
              </div>
            </div>

            {/* Explanation rationale */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/25 text-left mb-6">
              <div className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{recommendation.explanation}</span>
              </div>
            </div>

            {/* User Feedback System */}
            <div className="pt-4 border-t border-cyan-500/20">
              <div className="text-xs font-semibold text-slate-300 mb-2">How does this speed feel to you?</div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleFeedback('too_warm')}
                  className={`py-2 px-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    feedback === 'too_warm'
                      ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Too Warm</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFeedback('comfortable')}
                  className={`py-2 px-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    feedback === 'comfortable'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Comfortable</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFeedback('too_cold')}
                  className={`py-2 px-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    feedback === 'too_cold'
                      ? 'bg-blue-950/80 border-blue-500 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <Snowflake className="w-3.5 h-3.5 text-blue-400" />
                  <span>Too Cold</span>
                </button>
              </div>

              {feedbackMessage && (
                <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-200 animate-in fade-in">
                  {feedbackMessage}
                </div>
              )}
            </div>

            {/* Mandatory Disclaimer from specification */}
            <div className="mt-6 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 leading-normal">
              ComfortIQ currently uses an initial rule-based recommendation model. Recommendations are estimates and may not reflect every individual's comfort.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
