import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  Clock,
  Zap,
  IndianRupee,
  Calendar,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { EnergyInputs } from '../types';
import {
  generateHoursComparison,
  generateWattageComparison,
  generateTariffSensitivity,
  calculateFanEnergyAndCost,
} from '../calculations/energyCalculator';

interface EnergyInsightsProps {
  energyInputs: EnergyInputs;
}

export const EnergyInsights: React.FC<EnergyInsightsProps> = ({ energyInputs }) => {
  const [selectedHours, setSelectedHours] = useState(energyInputs.hoursPerDay);
  const [selectedWatts, setSelectedWatts] = useState(energyInputs.powerWatts);
  const [selectedTariff, setSelectedTariff] = useState(energyInputs.tariffPerUnit);

  const hoursData = generateHoursComparison(selectedWatts, selectedTariff);
  const wattageData = generateWattageComparison(selectedHours, selectedTariff);
  const tariffData = generateTariffSensitivity(selectedWatts, selectedHours);

  // Projections comparison data (Daily, 30-Day, 60-Day, 365-Day)
  const baseCalc = calculateFanEnergyAndCost({
    voltageV: energyInputs.voltageV,
    powerWatts: selectedWatts,
    hoursPerDay: selectedHours,
    billingDays: 30,
    tariffPerUnit: selectedTariff,
  });

  const projectionsData = [
    { period: '1 Day', units: baseCalc.dailyUnits, cost: baseCalc.dailyCost },
    { period: '15 Days', units: Number((baseCalc.dailyUnits * 15).toFixed(2)), cost: Number((baseCalc.dailyCost * 15).toFixed(1)) },
    { period: '30 Days', units: Number((baseCalc.dailyUnits * 30).toFixed(2)), cost: Number((baseCalc.dailyCost * 30).toFixed(1)) },
    { period: '60 Days', units: Number((baseCalc.dailyUnits * 60).toFixed(2)), cost: Number((baseCalc.dailyCost * 60).toFixed(1)) },
    { period: '90 Days', units: Number((baseCalc.dailyUnits * 90).toFixed(2)), cost: Number((baseCalc.dailyCost * 90).toFixed(1)) },
    { period: '1 Year (365d)', units: baseCalc.yearlyUnits, cost: baseCalc.yearlyCost },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          Module 4: Predictive Modeling
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Energy Insights & Analytics
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-3xl">
          Visual comparison models showing how fan power efficiency, daily runtime, and utility tariffs directly impact your monthly electricity bills.
        </p>
      </div>

      {/* Interactive Simulation Controls Bar */}
      <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-5 mb-8 backdrop-blur-xl">
        <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Analysis Controls (Adjust to Update All Charts in Real Time)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Fan Power (Watts):</span>
              <span className="font-bold text-cyan-300">{selectedWatts} W</span>
            </div>
            <input
              type="range"
              min="20"
              max="95"
              step="5"
              value={selectedWatts}
              onChange={(e) => setSelectedWatts(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Daily Operating Hours:</span>
              <span className="font-bold text-cyan-300">{selectedHours} hrs/day</span>
            </div>
            <input
              type="range"
              min="2"
              max="24"
              step="1"
              value={selectedHours}
              onChange={(e) => setSelectedHours(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Electricity Tariff:</span>
              <span className="font-bold text-cyan-300">₹{selectedTariff}/kWh</span>
            </div>
            <input
              type="range"
              min="3"
              max="15"
              step="0.5"
              value={selectedTariff}
              onChange={(e) => setSelectedTariff(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Daily Usage Comparison */}
        <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,180,255,0.08)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Chart 1: Operating Duration Comparison
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Estimated monthly cost (₹) and daily energy (kWh) at {selectedWatts}W & ₹{selectedTariff}/kWh.
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#172642" />
                <XAxis dataKey="hours" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#071224', borderColor: '#00f0ff', borderRadius: '12px', color: '#fff' }}
                  formatter={(val: any, name: any) => [
                    name === 'monthlyCost' ? `₹${val}` : `${val} kWh`,
                    name === 'monthlyCost' ? 'Monthly Cost' : 'Daily Energy'
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                <Bar dataKey="monthlyCost" name="Monthly Cost (₹)" fill="#00f0ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Rated Power Comparison */}
        <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,180,255,0.08)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                Chart 2: Fan Motor Type Efficiency
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparing BLDC eco fans vs standard induction motors running {selectedHours} hrs/day.
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wattageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#172642" />
                <XAxis dataKey="category" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#071224', borderColor: '#3b82f6', borderRadius: '12px', color: '#fff' }}
                  formatter={(val: any) => [`₹${val}`, 'Monthly Cost']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                <Bar dataKey="monthlyCost" name="Monthly Cost (₹)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            * Demonstration comparisons based on standardized motor benchmarks, not individual user measurements.
          </p>
        </div>

        {/* Chart 3: Electricity Tariff Sensitivity */}
        <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,180,255,0.08)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-cyan-400" />
                Chart 3: Tariff Rate Sensitivity (₹/kWh)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Impact of progressive billing tariff slabs on 30-day fan operating cost.
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tariffData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#172642" />
                <XAxis dataKey="tariff" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#071224', borderColor: '#10b981', borderRadius: '12px', color: '#fff' }}
                  formatter={(val: any) => [`₹${val}`, 'Monthly Cost']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                <Line
                  type="monotone"
                  dataKey="monthlyCost"
                  name="Monthly Cost (₹)"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#10b981' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Daily, Monthly, Yearly Cumulative Projections */}
        <div className="bg-[#091528]/85 border border-cyan-500/25 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,180,255,0.08)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                Chart 4: Temporal Projections (1 Day to 1 Year)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cumulative estimated expense curve across 1 to 365 calendar days.
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#172642" />
                <XAxis dataKey="period" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#071224', borderColor: '#00f0ff', borderRadius: '12px', color: '#fff' }}
                  formatter={(val: any, name: any) => [
                    name === 'cost' ? `₹${val}` : `${val} kWh`,
                    name === 'cost' ? 'Projected Cost' : 'Cumulative Energy'
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                <Area type="monotone" dataKey="cost" name="Projected Cost (₹)" stroke="#00f0ff" fillOpacity={1} fill="url(#costGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Mandatory Analytic Explanation */}
      <div className="mt-8 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-cyan-300">Analytical Foundation:</strong> Rated-power calculations assume continuous operation at rated power. Actual fan consumption varies dynamically with speed, motor back-EMF, line voltage conditions, and aerodynamic drag. No claim of real-world energy savings is made without direct sub-metered validation.
        </div>
      </div>
    </div>
  );
};
