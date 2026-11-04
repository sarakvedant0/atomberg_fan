import React from 'react';
import {
  X,
  Thermometer,
  Fan,
  Gauge,
  Zap,
  Wifi,
  Cpu,
  Activity,
  ShieldAlert,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  Radio,
} from 'lucide-react';

export type ParameterId = 'temperature' | 'recommended_speed' | 'rpm' | 'electricity';

interface IoTParameterModalProps {
  activeParameter: ParameterId | null;
  onClose: () => void;
  onSelectParameter: (id: ParameterId) => void;
  isConnected?: boolean;
  onConnectFan?: () => void;
  currentValues: {
    temperatureC: number;
    speedLevel: number;
    percentage: number;
    rpm: number;
    hourlyCost: number;
    hourlyUnits: number;
  };
}

export const IoTParameterModal: React.FC<IoTParameterModalProps> = ({
  activeParameter,
  onClose,
  onSelectParameter,
  isConnected = false,
  onConnectFan,
  currentValues,
}) => {
  if (!activeParameter) return null;

  const parameterDetails = {
    temperature: {
      title: 'Room Temperature Telemetry',
      subtitle: 'Ambient Thermal Sensing & Dynamic Automation',
      icon: Thermometer,
      accentColor: 'text-cyan-400',
      badge: 'Sensirion SHT4x / I2C Sensor',
      liveValue: `${currentValues.temperatureC}°C`,
      connectedSpecs: [
        {
          label: 'Hardware Sensor Mechanism',
          content:
            'Integrated digital I2C humidity & temperature sensor (e.g., Sensirion SHT40 or Bosch BME280) mounted in the canopy intake away from internal motor coils to prevent self-heating skew.',
        },
        {
          label: 'Sampling & Telemetry Rate',
          content:
            'Continuously sampled every 3 seconds, filtered with a 30-second moving average algorithm. Reports precision ±0.2°C via MQTT over 2.4GHz Wi-Fi / Matter over Thread.',
        },
        {
          label: 'Connected Smart Automation',
          content:
            'When room temperature rises above the user comfort setpoint, the fan automatically ramps up airflow speed without manual remote intervention. In Sleep Mode, it tracks the natural room cooling curve through the night.',
        },
        {
          label: 'Diagnostics & Safety Alerts',
          content:
            'Detects rapid temperature spikes (>3°C in 2 minutes) indicating open windows or thermal anomalies, triggering instant push notifications to your smart home dashboard.',
        },
      ],
      comparison: {
        simulation: 'Manual slider input entered by user.',
        connected: 'Real-time telemetry stream from physical micro-sensors embedded in the fan hardware.',
      },
    },
    recommended_speed: {
      title: 'Recommended Fan Speed (%)',
      subtitle: 'Sinusoidal FOC Motor Modulation & Thermal Comfort Algorithm',
      icon: Fan,
      accentColor: 'text-cyan-400',
      badge: 'BLDC FOC PWM Modulation',
      liveValue: `${currentValues.percentage}% (Speed ${currentValues.speedLevel})`,
      connectedSpecs: [
        {
          label: 'Motor Drive Control',
          content:
            'High-frequency sinusoidal Field-Oriented Control (FOC) driver regulating current vectors at 20 kHz, delivering silent torque and stepless speed adjustment from 1% to 100%.',
        },
        {
          label: 'Adaptive Thermal Algorithm',
          content:
            'Calculates required air velocity using the ASHRAE Standard 55 Thermal Comfort Model, balancing ambient humidity, dry-bulb temperature, and room occupancy to deliver optimal skin convective cooling.',
        },
        {
          label: 'Circadian Sleep Curve Automation',
          content:
            'When in sleep mode, the connected fan follows an automated circadian profile: starts at Speed 3 (60%), gently lowers speed by 10% every 90 minutes as core body temperature drops, preventing morning stiffness.',
        },
        {
          label: 'Multi-Room Occupancy Sync',
          content:
            'Coordinates with smart room mmWave presence sensors to enter 2W ultra-low idle when no occupants are detected for more than 15 minutes.',
        },
      ],
      comparison: {
        simulation: 'Rule-based frontend decision matrix based on selected activity and entered parameters.',
        connected: 'Autonomous PID loop dynamically driving the motor inverter PWM duty cycle in response to sensor inputs.',
      },
    },
    rpm: {
      title: 'Actual Fan Speed (RPM)',
      subtitle: 'Digital Rotor Tachometer & Aerodynamic Speed Regulation',
      icon: Gauge,
      accentColor: 'text-cyan-400',
      badge: 'Dual Hall-Effect Feedback',
      liveValue: `${currentValues.rpm} RPM`,
      connectedSpecs: [
        {
          label: 'Tachometer & Position Sensing',
          content:
            'Dual or triple internal Hall-effect rotor magnetic sensors measure rotor angle and instantaneous shaft rotational speed (e.g., 340 to 820 RPM) with 99.8% precision.',
        },
        {
          label: 'Closed-Loop Back-EMF Regulation',
          content:
            'Continuous closed-loop feedback automatically increases motor torque if line voltage drops (170V–270V) or if aerodynamic resistance changes, keeping RPM perfectly steady.',
        },
        {
          label: 'Health & Bearing Diagnostics',
          content:
            'Monitors motor acoustic harmonics, rotor balance, and friction torque. Flags bearing wear, rotor wobble, or blade unbalance before mechanical damage occurs.',
        },
        {
          label: 'Stall & Anti-Entanglement Protection',
          content:
            'If an obstacle impedes the blades, the motor controller instantly cuts power within 120 milliseconds to prevent motor burnout and ensure child/pet safety.',
        },
      ],
      comparison: {
        simulation: 'Mapped speed tiers representing nominal fan RPM under standard laboratory test conditions.',
        connected: 'Direct micro-controller counter register telemetry reporting actual physical blade rotations.',
      },
    },
    electricity: {
      title: 'Electricity & Cost Metering',
      subtitle: 'Sub-Metered Energy Telemetry & Tariff Cost Intelligence',
      icon: Zap,
      accentColor: 'text-emerald-400',
      badge: 'True Active Power Shunt Metering',
      liveValue: `${currentValues.hourlyUnits} kWh (≈ ₹${currentValues.hourlyCost}/hr)`,
      connectedSpecs: [
        {
          label: 'Hardware Metering Chip',
          content:
            'Dedicated sub-metering shunt resistor and power monitoring IC (ADE7953 / INA219) measuring true active power (Watts), true RMS voltage, current, and Power Factor (PF >= 0.95).',
        },
        {
          label: 'Utility Tariff Integration',
          content:
            'Directly maps hourly kWh consumption against your local utility slab rates (₹ per unit) and Time-Of-Day (TOD) peak tariffs to compute exact rupee expenditures.',
        },
        {
          label: 'Demand-Response Eco Mode',
          content:
            'During peak utility tariff hours (e.g. 6 PM – 10 PM), the connected fan can automatically shift motor frequency by 8% to lower wattage consumption by 22% with imperceptible airflow difference.',
        },
        {
          label: 'Lifetime Efficiency Verification',
          content:
            'Maintains non-volatile flash records of cumulative run hours, daily kilowatt-hours, and carbon offset ($CO_2$ saved compared to a 75W induction motor).',
        },
      ],
      comparison: {
        simulation: 'Mathematical model assuming continuous fixed rated power consumption.',
        connected: 'Instantaneous sub-second power measurements capturing true motor draw down to 0.1 Watt.',
      },
    },
  };

  const currentParam = parameterDetails[activeParameter];
  const Icon = currentParam.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#091528] border border-cyan-400/50 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,240,255,0.25)] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Glow Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-cyan-500/20">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] shrink-0">
              <Icon className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  Physical Fan IoT Telemetry Specification
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                {currentParam.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Parameter Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers between 4 parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
          {[
            { id: 'temperature', label: 'Room Temp', icon: Thermometer },
            { id: 'recommended_speed', label: 'Rec. Speed', icon: Fan },
            { id: 'rpm', label: 'Fan RPM', icon: Gauge },
            { id: 'electricity', label: 'Energy / Cost', icon: Zap },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isSelected = activeParameter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectParameter(tab.id as ParameterId)}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto space-y-5 pr-1 py-1">
          {/* Live reading and hardware badge */}
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-400 font-medium">
                {isConnected ? 'Current Measured / Active Value:' : 'Hardware Telemetry Status:'}
              </div>
              <div className="text-2xl font-black text-white mt-0.5 tracking-tight flex items-baseline gap-2">
                <span>{isConnected ? currentParam.liveValue : '-- (Offline)'}</span>
                {isConnected ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Live Sync Telemetry
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                    No Fan Connected
                  </span>
                )}
              </div>
              {!isConnected && onConnectFan && (
                <button
                  type="button"
                  onClick={() => {
                    onConnectFan();
                    onClose();
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 text-xs font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)] hover:brightness-110 cursor-pointer"
                >
                  ⚡ Connect Smart Fan Now
                </button>
              )}
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>{currentParam.badge}</span>
            </div>
          </div>

          {/* 4 Technical Parameter Specifications */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Connected Smart Fan Behavior & Telemetry Details:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentParam.connectedSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="text-xs font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {spec.label}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{spec.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Simulation vs Connected Physical Fan Comparison */}
          <div className="p-4 rounded-2xl bg-[#06101f] border border-cyan-500/20">
            <div className="text-xs font-bold text-white mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              How This Parameter Operates: Simulation vs Connected Fan
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-slate-400 block mb-1">
                  In Current Simulation Mode:
                </span>
                <span className="text-slate-300 leading-relaxed">
                  {currentParam.comparison.simulation}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                <span className="font-semibold text-cyan-300 block mb-1">
                  When Real IoT Smart Fan is Connected:
                </span>
                <span className="text-cyan-100 leading-relaxed">
                  {currentParam.comparison.connected}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 mt-2 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span>Supported Protocols: Matter 1.3, Thread, BLE 5.2, Wi-Fi 6 (MQTT/TLS)</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold hover:brightness-110 transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
