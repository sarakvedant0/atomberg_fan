import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Save,
  RotateCcw,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AppSettings, ActivityType, ComfortPreference } from '../types';
import { DEFAULT_SETTINGS } from '../data/demoData';

interface SettingsProps {
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
  onResetDefaults: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  settings,
  onSaveSettings,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fanName.trim()) {
      errors.fanName = 'Fan name cannot be empty.';
    }
    if (formData.ratedPower <= 0 || formData.ratedPower > 300) {
      errors.ratedPower = 'Power must be between 1W and 300W.';
    }
    if (formData.ratedVoltage <= 50 || formData.ratedVoltage > 300) {
      errors.ratedVoltage = 'Voltage must be between 50V and 300V.';
    }
    if (formData.electricityTariff < 0 || formData.electricityTariff > 50) {
      errors.electricityTariff = 'Tariff must be between ₹0 and ₹50 per kWh.';
    }
    if (formData.defaultDailyHours < 0 || formData.defaultDailyHours > 24) {
      errors.defaultDailyHours = 'Daily hours must be between 0 and 24.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSaveSettings(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleReset = () => {
    onResetDefaults();
    setFormData(DEFAULT_SETTINGS);
    setValidationErrors({});
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <SettingsIcon className="w-3.5 h-3.5" />
          Module 5: System Preferences
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Application Settings
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-1">
          Customize your default fan hardware specifications and comfort parameters. All preferences are preserved in local browser storage.
        </p>
      </div>

      {savedSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-400/60 text-emerald-300 text-sm font-semibold flex items-center gap-2.5 animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Settings successfully saved and synchronized across all modules!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Fan Hardware Settings */}
        <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,180,255,0.08)]">
          <h2 className="text-lg font-bold text-white mb-4 pb-3 border-b border-cyan-500/15 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            Fan Hardware & Utility Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Fan Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Fan Device Label / Room Location
              </label>
              <input
                type="text"
                value={formData.fanName}
                onChange={(e) => setFormData({ ...formData, fanName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="e.g. Master Bedroom Ceiling Fan"
              />
              {validationErrors.fanName && (
                <p className="text-xs text-rose-400 mt-1">{validationErrors.fanName}</p>
              )}
            </div>

            {/* Rated Power */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Rated Power (Watts)
              </label>
              <input
                type="number"
                min="1"
                max="300"
                value={formData.ratedPower}
                onChange={(e) => setFormData({ ...formData, ratedPower: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {validationErrors.ratedPower && (
                <p className="text-xs text-rose-400 mt-1">{validationErrors.ratedPower}</p>
              )}
            </div>

            {/* Rated Voltage */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Rated Voltage (V AC)
              </label>
              <input
                type="number"
                min="50"
                max="300"
                value={formData.ratedVoltage}
                onChange={(e) => setFormData({ ...formData, ratedVoltage: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {validationErrors.ratedVoltage && (
                <p className="text-xs text-rose-400 mt-1">{validationErrors.ratedVoltage}</p>
              )}
            </div>

            {/* Electricity Tariff */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Electricity Tariff (₹ / kWh)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="50"
                value={formData.electricityTariff}
                onChange={(e) => setFormData({ ...formData, electricityTariff: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {validationErrors.electricityTariff && (
                <p className="text-xs text-rose-400 mt-1">{validationErrors.electricityTariff}</p>
              )}
            </div>

            {/* Default Daily Operating Hours */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Default Daily Hours (hrs/day)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={formData.defaultDailyHours}
                onChange={(e) => setFormData({ ...formData, defaultDailyHours: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {validationErrors.defaultDailyHours && (
                <p className="text-xs text-rose-400 mt-1">{validationErrors.defaultDailyHours}</p>
              )}
            </div>
          </div>
        </div>

        {/* Comfort Profile Settings */}
        <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,180,255,0.08)]">
          <h2 className="text-lg font-bold text-white mb-4 pb-3 border-b border-cyan-500/15 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Comfort Baseline Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Preferred Comfort Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Preferred Airflow Sensation
              </label>
              <select
                value={formData.preferredComfort}
                onChange={(e) => setFormData({ ...formData, preferredComfort: e.target.value as ComfortPreference })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="cooler">Prefer Cooler Airflow (+1 Offset)</option>
                <option value="balanced">Balanced Comfort (Standard)</option>
                <option value="less_airflow">Prefer Less Airflow (-1 Offset)</option>
              </select>
            </div>

            {/* Default Activity */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Default Primary Activity
              </label>
              <select
                value={formData.defaultActivity}
                onChange={(e) => setFormData({ ...formData, defaultActivity: e.target.value as ActivityType })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="sleep">Sleep (Quiet Night Mode)</option>
                <option value="relaxation">Relaxation (Standard)</option>
                <option value="study">Study / Focused Work</option>
              </select>
            </div>

            {/* Preferred Default Fan Speed */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Preferred Baseline Speed (1 to 5)
              </label>
              <select
                value={formData.preferredFanSpeed}
                onChange={(e) => setFormData({ ...formData, preferredFanSpeed: parseInt(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {[1, 2, 3, 4, 5].map((s) => (
                  <option key={s} value={s}>
                    Speed {s} ({s * 20}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Default Target Temperature */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Default Target Temperature (°C)
              </label>
              <input
                type="number"
                min="18"
                max="36"
                value={formData.defaultTempPreference}
                onChange={(e) => setFormData({ ...formData, defaultTempPreference: parseFloat(e.target.value) || 26 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Factory Defaults</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
