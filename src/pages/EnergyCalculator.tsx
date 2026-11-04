import React, { useState } from 'react';
import {
  Zap,
  Calculator,
  IndianRupee,
  Clock,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { EnergyInputs, EnergyCalculationResult } from '../types';
import { calculateFanEnergyAndCost } from '../calculations/energyCalculator';

interface EnergyCalculatorProps {
  energyInputs: EnergyInputs;
  onInputsChange: (inputs: EnergyInputs) => void;
}

export const EnergyCalculator: React.FC<EnergyCalculatorProps> = ({
  energyInputs,
  onInputsChange,
}) => {
  const [formInputs, setFormInputs] = useState<EnergyInputs>(energyInputs);
  const [calcResult, setCalcResult] = useState<EnergyCalculationResult>(() =>
    calculateFanEnergyAndCost(energyInputs)
  );

  const handleFieldChange = (field: keyof EnergyInputs, value: string) => {
    const numVal = parseFloat(value);
    const updated = {
      ...formInputs,
      [field]: isNaN(numVal) ? ('' as any) : numVal,
    };
    setFormInputs(updated);

    const result = calculateFanEnergyAndCost({
      ...updated,
      [field]: isNaN(numVal) ? 0 : numVal,
    });
    setCalcResult(result);
    if (result.isValid) {
      onInputsChange(updated);
    }
  };

  const handlePresetSelect = (watts: number, hours: number) => {
    const updated: EnergyInputs = {
      ...formInputs,
      powerWatts: watts,
      hoursPerDay: hours,
    };
    setFormInputs(updated);
    const result = calculateFanEnergyAndCost(updated);
    setCalcResult(result);
    if (result.isValid) {
      onInputsChange(updated);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Zap className="w-3.5 h-3.5" />
          Module 3: Electricity Intelligence
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Fan Energy & Cost Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-3xl">
          Accurately calculate your fan's electrical power consumption, billing period electricity cost, and long-term annual projections using your actual electricity tariff.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form & Validation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,180,255,0.08)]">
            <h2 className="text-lg font-bold text-white mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" />
                Fan Specifications & Usage Parameters
              </span>
            </h2>

            {/* Quick Presets */}
            <div className="mb-6 p-3.5 rounded-xl bg-slate-900/70 border border-slate-700/60">
              <div className="text-xs font-semibold text-slate-300 mb-2">Popular Fan Profiles:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'BLDC 5-Star (28W, 8h)', watts: 28, hours: 8 },
                  { label: 'Standard Fan (50W, 8h)', watts: 50, hours: 8 },
                  { label: 'Heavy High-Speed (75W, 12h)', watts: 75, hours: 12 },
                  { label: 'Continuous Night (40W, 10h)', watts: 40, hours: 10 },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePresetSelect(preset.watts, preset.hours)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950/70 border border-slate-700 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-200 transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Rated Power (W) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Fan Rated Power (Watts) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="300"
                    step="1"
                    value={formInputs.powerWatts}
                    onChange={(e) => handleFieldChange('powerWatts', e.target.value)}
                    className={`w-full bg-slate-900/90 border rounded-xl py-3 pl-4 pr-12 text-white font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      calcResult.errors.powerWatts ? 'border-rose-500' : 'border-slate-700'
                    }`}
                    placeholder="e.g. 50"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    W
                  </span>
                </div>
                {calcResult.errors.powerWatts && (
                  <p className="text-[11px] text-rose-400 mt-1">{calcResult.errors.powerWatts}</p>
                )}
                <p className="text-[11px] text-slate-400 mt-1">Typically 28W (BLDC) to 75W (induction)</p>
              </div>

              {/* Operating Voltage (V) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Operating Voltage (Specification)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="100"
                    max="300"
                    step="5"
                    value={formInputs.voltageV}
                    onChange={(e) => handleFieldChange('voltageV', e.target.value)}
                    className={`w-full bg-slate-900/90 border rounded-xl py-3 pl-4 pr-12 text-white font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      calcResult.errors.voltageV ? 'border-rose-500' : 'border-slate-700'
                    }`}
                    placeholder="e.g. 230"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    V AC
                  </span>
                </div>
                {calcResult.errors.voltageV && (
                  <p className="text-[11px] text-rose-400 mt-1">{calcResult.errors.voltageV}</p>
                )}
                <p className="text-[11px] text-slate-400 mt-1">Standard residential voltage (220V–240V)</p>
              </div>

              {/* Daily Operating Hours */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Daily Operating Hours (0–24h) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={formInputs.hoursPerDay}
                    onChange={(e) => handleFieldChange('hoursPerDay', e.target.value)}
                    className={`w-full bg-slate-900/90 border rounded-xl py-3 pl-4 pr-14 text-white font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      calcResult.errors.hoursPerDay ? 'border-rose-500' : 'border-slate-700'
                    }`}
                    placeholder="e.g. 8"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    hrs/day
                  </span>
                </div>
                {calcResult.errors.hoursPerDay && (
                  <p className="text-[11px] text-rose-400 mt-1">{calcResult.errors.hoursPerDay}</p>
                )}
              </div>

              {/* Billing Period Days */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  Billing Cycle (Days) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="365"
                    step="1"
                    value={formInputs.billingDays}
                    onChange={(e) => handleFieldChange('billingDays', e.target.value)}
                    className={`w-full bg-slate-900/90 border rounded-xl py-3 pl-4 pr-14 text-white font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      calcResult.errors.billingDays ? 'border-rose-500' : 'border-slate-700'
                    }`}
                    placeholder="e.g. 30"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    Days
                  </span>
                </div>
                {calcResult.errors.billingDays && (
                  <p className="text-[11px] text-rose-400 mt-1">{calcResult.errors.billingDays}</p>
                )}
              </div>

              {/* Electricity Tariff (₹/kWh) */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-cyan-400" />
                  Electricity Tariff (₹ per kWh Unit) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="0.1"
                    value={formInputs.tariffPerUnit}
                    onChange={(e) => handleFieldChange('tariffPerUnit', e.target.value)}
                    className={`w-full bg-slate-900/90 border rounded-xl py-3 pl-4 pr-16 text-white font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      calcResult.errors.tariffPerUnit ? 'border-rose-500' : 'border-slate-700'
                    }`}
                    placeholder="e.g. 7.50"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-cyan-300">
                    ₹ / kWh
                  </span>
                </div>
                {calcResult.errors.tariffPerUnit && (
                  <p className="text-[11px] text-rose-400 mt-1">{calcResult.errors.tariffPerUnit}</p>
                )}
                <p className="text-[11px] text-slate-400 mt-1">Check your electricity utility bill slab rate (typically ₹4 to ₹11/unit in India)</p>
              </div>
            </div>

            {/* Voltage Explanation Note per requirement */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
              <strong className="text-cyan-300 block mb-1">Voltage Requirement Clarification:</strong>
              Voltage alone is insufficient to calculate electricity consumption. Current and power factor are also needed to estimate real AC power. ComfortIQ uses the manufacturer's rated active power (Watts) for precise thermodynamic and cost calculations.
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Results */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#091528]/90 border border-cyan-500/35 rounded-2xl p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,210,255,0.12)]">
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">
                Cost & Energy Breakdown
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300">
                ₹ Indian Rupees
              </span>
            </div>

            {/* Primary Billing Period Result */}
            <div className="py-6 border-b border-slate-800 text-center">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {formInputs.billingDays}-Day Billing Cycle Cost
              </div>
              <div className="text-5xl font-black text-white tracking-tight mt-1 flex items-baseline justify-center gap-1">
                <span className="text-cyan-400">₹</span>
                <span>{calcResult.periodCost.toFixed(2)}</span>
              </div>
              <p className="text-xs text-cyan-300 mt-1">
                Total Energy: <strong className="text-white">{calcResult.periodUnits} kWh</strong> ({calcResult.periodUnits} electricity units)
              </p>
            </div>

            {/* Multi-Interval Grid */}
            <div className="grid grid-cols-2 gap-3 py-4 border-b border-slate-800">
              <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3.5">
                <div className="text-[11px] text-slate-400 font-medium">Daily Consumption</div>
                <div className="text-lg font-bold text-white mt-0.5">{calcResult.dailyUnits} kWh</div>
                <div className="text-xs font-semibold text-cyan-300 mt-1">≈ ₹{calcResult.dailyCost} / day</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3.5">
                <div className="text-[11px] text-slate-400 font-medium">Annual Projection (365d)</div>
                <div className="text-lg font-bold text-white mt-0.5">{calcResult.yearlyUnits} kWh</div>
                <div className="text-xs font-semibold text-cyan-300 mt-1">≈ ₹{calcResult.yearlyCost} / yr</div>
              </div>
            </div>

            {/* Parameter Summary */}
            <div className="py-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Rated Wattage:</span>
                <span className="font-semibold text-white">{formInputs.powerWatts} Watts</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Daily Run Time:</span>
                <span className="font-semibold text-white">{formInputs.hoursPerDay} hours/day</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Applied Tariff:</span>
                <span className="font-semibold text-white">₹{formInputs.tariffPerUnit} / kWh</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Hourly Running Cost:</span>
                <span className="font-semibold text-cyan-300">
                  ≈ ₹{((formInputs.powerWatts / 1000) * formInputs.tariffPerUnit).toFixed(3)} / hour
                </span>
              </div>
            </div>

            {/* Mandatory Explanation Box */}
            <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 leading-normal">
              These estimates assume that the fan continuously operates at its rated power. Actual electricity consumption can vary depending on fan speed, motor type, voltage conditions and operating conditions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
