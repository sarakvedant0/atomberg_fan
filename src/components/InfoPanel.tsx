import React from 'react';
import { Thermometer, Fan, Zap, Leaf, Check, Radio, Info, WifiOff } from 'lucide-react';

interface RoomTempPanelProps {
  temperatureC: number;
  status?: string;
  className?: string;
  onClick?: () => void;
  isConnected?: boolean;
}

export const RoomTempPanel: React.FC<RoomTempPanelProps> = ({
  temperatureC = 29,
  status = 'Optimal',
  className = '',
  onClick,
  isConnected = false,
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      className={`group bg-[#0a172c]/85 backdrop-blur-md border ${
        isConnected ? 'border-cyan-400/40 hover:border-cyan-300' : 'border-slate-700/60 hover:border-cyan-500/40'
      } rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,180,255,0.18)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer relative ${className}`}
      title={isConnected ? 'Click to view IoT hardware details' : 'No Fan Connected - Click to view pairing details'}
    >
      {/* Telemetry badge */}
      <div className="flex items-center justify-between mb-2">
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
          isConnected ? 'text-cyan-300/80 group-hover:text-cyan-200' : 'text-slate-400'
        }`}>
          {isConnected ? (
            <>
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              Live Telemetry
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-slate-500" />
              Sensor Offline
            </>
          )}
        </span>
        <span className="text-[10px] text-cyan-400/60 group-hover:text-cyan-300 flex items-center gap-0.5">
          <Info className="w-3 h-3" />
          Details
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
          isConnected
            ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]'
            : 'bg-slate-900 border-slate-700 text-slate-500'
        }`}>
          <Thermometer className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-slate-300 tracking-wide">Room Temperature</div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold tracking-tight text-slate-400">
              {isConnected ? `${temperatureC}°C` : '--'}
            </span>
          </div>
          <div className="mt-1">
            {isConnected ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 border border-emerald-400/40 text-emerald-300">
                <Check className="w-3 h-3 stroke-[3]" />
                {status}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800/80 border border-slate-600 text-slate-400">
                No Fan Connected
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Temperature wave or flat dashed line */}
      <div className="mt-3 pt-2 border-t border-cyan-500/15">
        <svg className="w-full h-6 overflow-visible" viewBox="0 0 160 24" fill="none">
          {isConnected ? (
            <>
              <path
                d="M 0 14 Q 25 10 50 15 T 100 8 T 130 16 T 160 11"
                stroke="#00f0ff"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="160" cy="11" r="3" fill="#00f0ff" />
            </>
          ) : (
            <line x1="0" y1="12" x2="160" y2="12" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
          )}
        </svg>
      </div>
    </div>
  );
};

interface RecommendedSpeedPanelProps {
  percentage: number;
  speedLevel: number;
  className?: string;
  onClick?: () => void;
  isConnected?: boolean;
}

export const RecommendedSpeedPanel: React.FC<RecommendedSpeedPanelProps> = ({
  percentage = 60,
  speedLevel = 3,
  className = '',
  onClick,
  isConnected = false,
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      className={`group bg-[#0a172c]/85 backdrop-blur-md border ${
        isConnected ? 'border-cyan-400/40 hover:border-cyan-300' : 'border-slate-700/60 hover:border-cyan-500/40'
      } rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,180,255,0.18)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer relative ${className}`}
      title={isConnected ? 'Click to view IoT automation details' : 'No Fan Connected - Click to view pairing details'}
    >
      {/* Telemetry badge */}
      <div className="flex items-center justify-between mb-2">
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
          isConnected ? 'text-cyan-300/80 group-hover:text-cyan-200' : 'text-slate-400'
        }`}>
          {isConnected ? (
            <>
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              FOC Modulation
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-slate-500" />
              Standby
            </>
          )}
        </span>
        <span className="text-[10px] text-cyan-400/60 group-hover:text-cyan-300 flex items-center gap-0.5">
          <Info className="w-3 h-3" />
          Details
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
          isConnected
            ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]'
            : 'bg-slate-900 border-slate-700 text-slate-500'
        }`}>
          <Fan className={`w-5 h-5 stroke-[2.2] ${isConnected ? 'animate-[spin_8s_linear_infinite]' : ''}`} />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-slate-300 tracking-wide">Recommended Fan Speed</div>
          <div className="flex items-end justify-between mt-1">
            <span className={`text-2xl font-bold tracking-tight ${isConnected ? 'text-white' : 'text-slate-400'}`}>
              {isConnected ? `${percentage}%` : '--'}
            </span>
            {/* 5-bar vertical signal indicator */}
            <div className="flex items-end gap-1 h-5 pb-0.5">
              {[1, 2, 3, 4, 5].map((lvl) => {
                const isActive = isConnected && lvl <= speedLevel;
                const heights = ['h-2', 'h-2.5', 'h-3.5', 'h-4', 'h-5'];
                return (
                  <div
                    key={lvl}
                    className={`w-1.5 ${heights[lvl - 1]} rounded-sm transition-colors duration-300 ${
                      isActive ? 'bg-cyan-400 shadow-[0_0_6px_#00f0ff]' : 'bg-slate-800'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FanSpeedGaugePanelProps {
  rpm: number;
  statusLabel?: string;
  className?: string;
  onClick?: () => void;
  isConnected?: boolean;
}

export const FanSpeedGaugePanel: React.FC<FanSpeedGaugePanelProps> = ({
  rpm = 650,
  statusLabel = 'Recommended',
  className = '',
  onClick,
  isConnected = false,
}) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isConnected ? circumference * 0.32 : circumference;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      className={`group bg-[#0a172c]/85 backdrop-blur-md border ${
        isConnected ? 'border-cyan-400/40 hover:border-cyan-300' : 'border-slate-700/60 hover:border-cyan-500/40'
      } rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,180,255,0.18)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer flex flex-col items-center relative ${className}`}
      title={isConnected ? 'Click to view IoT tachometer details' : 'No Fan Connected - Click to view pairing details'}
    >
      {/* Telemetry badge */}
      <div className="flex items-center justify-between w-full mb-1">
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
          isConnected ? 'text-cyan-300/80 group-hover:text-cyan-200' : 'text-slate-400'
        }`}>
          {isConnected ? (
            <>
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              Tachometer
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-slate-500" />
              Offline
            </>
          )}
        </span>
        <span className="text-[10px] text-cyan-400/60 group-hover:text-cyan-300 flex items-center gap-0.5">
          <Info className="w-3 h-3" />
          Details
        </span>
      </div>

      <div className="text-xs font-medium text-slate-300 tracking-wide mb-1 self-center">Fan Speed</div>

      {/* Circular Gauge */}
      <div className="relative w-26 h-26 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#13243f"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
          />
          {isConnected && (
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#00f0ff"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="filter drop-shadow-[0_0_8px_#00f0ff] group-hover:drop-shadow-[0_0_12px_#00f0ff] transition-all"
            />
          )}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-xl font-extrabold leading-tight ${isConnected ? 'text-white' : 'text-slate-400'}`}>
            {isConnected ? rpm : '--'}
          </span>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">RPM</span>
        </div>
      </div>

      <div className="mt-1">
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
          isConnected
            ? 'bg-cyan-950/70 border-cyan-400/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
            : 'bg-slate-800/80 border-slate-600 text-slate-400'
        }`}>
          {isConnected ? statusLabel : 'No Fan Connected'}
        </span>
      </div>
    </div>
  );
};

interface ElectricityEstimatePanelProps {
  hourlyUnits: number;
  hourlyCost: number;
  className?: string;
  onClick?: () => void;
  isConnected?: boolean;
}

export const ElectricityEstimatePanel: React.FC<ElectricityEstimatePanelProps> = ({
  hourlyUnits = 0.042,
  hourlyCost = 3.4,
  className = '',
  onClick,
  isConnected = false,
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      className={`group bg-[#0a172c]/85 backdrop-blur-md border ${
        isConnected ? 'border-cyan-400/40 hover:border-cyan-300' : 'border-slate-700/60 hover:border-cyan-500/40'
      } rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,180,255,0.18)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer relative ${className}`}
      title={isConnected ? 'Click to view IoT sub-metering details' : 'No Fan Connected - Click to view pairing details'}
    >
      {/* Telemetry badge */}
      <div className="flex items-center justify-between mb-2">
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
          isConnected ? 'text-cyan-300/80 group-hover:text-cyan-200' : 'text-slate-400'
        }`}>
          {isConnected ? (
            <>
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              Sub-Metered
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-slate-500" />
              Meter Offline
            </>
          )}
        </span>
        <span className="text-[10px] text-cyan-400/60 group-hover:text-cyan-300 flex items-center gap-0.5">
          <Info className="w-3 h-3" />
          Details
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
          isConnected
            ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]'
            : 'bg-slate-900 border-slate-700 text-slate-500'
        }`}>
          <Zap className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-slate-300 tracking-wide">Electricity Estimate</div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className={`text-xl font-bold tracking-tight ${isConnected ? 'text-white' : 'text-slate-400'}`}>
              {isConnected ? hourlyUnits : '--'}
            </span>
            <span className="text-xs text-slate-400 font-medium">kWh</span>
          </div>
          <div className="text-sm font-semibold text-cyan-300 mt-0.5">
            {isConnected ? `≈ ₹${hourlyCost} / hr` : 'Awaiting Connection'}
          </div>
        </div>

        {/* Micro bar chart indicator */}
        <div className="flex items-end gap-1 h-8 pt-1">
          <div className={`w-1.5 h-3 rounded-sm ${isConnected ? 'bg-cyan-500/50' : 'bg-slate-800'}`} />
          <div className={`w-1.5 h-4.5 rounded-sm ${isConnected ? 'bg-cyan-400/70' : 'bg-slate-800'}`} />
          <div className={`w-1.5 h-6 rounded-sm ${isConnected ? 'bg-cyan-400 shadow-[0_0_6px_#00f0ff]' : 'bg-slate-800'}`} />
          <div className={`w-1.5 h-7.5 rounded-sm ${isConnected ? 'bg-cyan-300 shadow-[0_0_8px_#00f0ff]' : 'bg-slate-800'}`} />
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-cyan-500/15 flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
          isConnected ? 'text-emerald-400' : 'text-slate-500'
        }`}>
          <Leaf className="w-3.5 h-3.5" />
          {isConnected ? 'Eco Friendly' : 'Standby'}
        </span>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
          {isConnected ? 'Active Wattage' : 'Awaiting Fan'}
        </span>
      </div>
    </div>
  );
};
