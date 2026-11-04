import React, { useState } from 'react';
import { ArrowRight, Radio, Info, Sparkles, Cpu } from 'lucide-react';
import { Fan3D } from './Fan3D';
import {
  RoomTempPanel,
  RecommendedSpeedPanel,
  FanSpeedGaugePanel,
  ElectricityEstimatePanel,
} from './InfoPanel';
import { FeatureCard } from './FeatureCard';
import { IoTParameterModal, ParameterId } from './IoTParameterModal';
import { ActiveTab, ComfortInputs, ComfortRecommendation } from '../types';

interface HeroProps {
  comfortInputs: ComfortInputs;
  recommendation: ComfortRecommendation;
  onNavigate: (tab: ActiveTab) => void;
  isFanConnected?: boolean;
  onToggleConnection?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  comfortInputs,
  recommendation,
  onNavigate,
  isFanConnected: externalIsConnected,
  onToggleConnection,
}) => {
  const [internalConnected, setInternalConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectStep, setConnectStep] = useState<string>('');
  const [activeIoTParam, setActiveIoTParam] = useState<ParameterId | null>(null);

  // Controlled or uncontrolled
  const isConnected = externalIsConnected !== undefined ? externalIsConnected : internalConnected;

  const handleToggleConnection = () => {
    if (isConnected) {
      if (onToggleConnection) {
        onToggleConnection();
      } else {
        setInternalConnected(false);
      }
    } else {
      setIsConnecting(true);
      setConnectStep('Scanning BLE & Wi-Fi for ComfortIQ fans...');
      setTimeout(() => {
        setConnectStep('Pairing with ComfortIQ AeroBLDC (Matter)...');
        setTimeout(() => {
          setIsConnecting(false);
          setConnectStep('');
          if (onToggleConnection) {
            onToggleConnection();
          } else {
            setInternalConnected(true);
          }
        }, 700);
      }, 700);
    }
  };

  return (
    <section className="relative pt-20 pb-8 overflow-hidden bg-transparent">
      {/* Neon Blue Wave-Tech Ambient Lighting Atmosphere matching reference */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src="/assets/aistudio/Neon_Blue_Wave-Tech_Background_a2923561.png"
          alt=""
          className="w-full h-full object-cover object-top opacity-95 pointer-events-none select-none"
        />
        {/* Soft edge ambient illumination */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020611]/20 via-transparent to-[#020611]/70" />
        <div className="absolute top-[12%] right-[10%] w-[680px] h-[680px] rounded-full bg-cyan-400/12 blur-[130px]" />
        <div className="absolute top-[28%] right-[28%] w-[420px] h-[420px] rounded-full bg-blue-600/15 blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[460px] lg:min-h-[500px]">
          {/* Left Column: Branding and Introduction matching reference */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tagline with horizontal accent line */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-cyan-400">
                Smarter Fans. Greater Comfort. Lower Energy Costs.
              </span>
              <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-cyan-400/80 to-transparent max-w-[120px]" />
            </div>

            {/* Massive Heading matching reference */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-3">
              Comfort<span className="text-cyan-400">IQ</span>
            </h1>

            {/* Subheading */}
            <h2 className="text-base sm:text-lg font-semibold text-slate-100 mb-2.5 leading-snug">
              A smart fan comfort and electricity-cost recommendation platform.
            </h2>

            {/* Supporting Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-xl">
              Understand your room conditions, get personalized fan-speed recommendations,
              resolve comfort conflicts and estimate fan electricity consumption and cost.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-5">
              <button
                onClick={() => onNavigate('dashboard')}
                className="group px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Start Now</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('how-it-works')}
                className="px-6 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 text-white font-medium text-sm tracking-wide shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all cursor-pointer"
              >
                Learn More
              </button>
            </div>

            {/* Smart Fan Hardware Connection Controller */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 max-w-lg ${
              isConnected
                ? 'bg-gradient-to-r from-cyan-950/60 to-emerald-950/40 border-cyan-400/50 shadow-[0_0_25px_rgba(0,240,255,0.15)]'
                : 'bg-slate-900/80 border-slate-700/80'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Radio className={`w-4 h-4 mt-0.5 shrink-0 ${
                    isConnected ? 'text-emerald-400 animate-pulse' : 'text-slate-500'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isConnected ? 'text-emerald-300' : 'text-slate-300'
                      }`}>
                        {isConnected ? 'Smart Fan Connected (Online)' : 'No Fan Connected'}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${
                        isConnected ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'
                      }`} />
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                      {isConnected
                        ? 'Master Bedroom AeroBLDC Fan active. Telemetry streaming live room temperature, RPM, speed %, and power draw.'
                        : 'Telemetry stats are withheld until a fan is connected. Connect to stream real-time temperature, tachometer RPM & wattage.'}
                    </p>
                    {isConnecting && (
                      <div className="text-[11px] font-semibold text-cyan-300 mt-1.5 flex items-center gap-1.5 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-spin" />
                        {connectStep}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggleConnection}
                  disabled={isConnecting}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md ${
                    isConnecting
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40 cursor-wait'
                      : isConnected
                      ? 'bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/40 hover:border-rose-400'
                      : 'bg-gradient-to-r from-cyan-400 to-cyan-300 hover:brightness-110 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  }`}
                >
                  {isConnecting ? 'Pairing...' : isConnected ? 'Disconnect' : '⚡ Connect Fan'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Ceiling Fan with 4 Floating Info Panels */}
          <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center">
            {/* Sleek Neon Wave Tech Backdrop Card matching reference */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-cyan-400/25 bg-[#061226]/50 backdrop-blur-md shadow-[0_0_50px_rgba(0,140,255,0.18),inset_0_0_80px_rgba(0,210,255,0.06)]">
              {/* Dynamic cyan-blue wave accent blooms echoing the reference curves */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-400/15 rounded-full blur-[80px]" />
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-600/25 rounded-full blur-[90px]" />
            </div>

            {/* 3D Animated Ceiling Fan */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Fan3D speedLevel={recommendation.speedLevel} isRotating={isConnected} />
            </div>

            {/* 4 Floating Information Panels with isConnected flag */}
            
            {/* Panel 1: Top-Left of Fan (Room Temperature) */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 w-44 sm:w-52">
              <RoomTempPanel
                temperatureC={comfortInputs.temperatureC}
                status={recommendation.status}
                isConnected={isConnected}
                onClick={() => setActiveIoTParam('temperature')}
              />
            </div>

            {/* Panel 2: Bottom-Left of Fan (Recommended Fan Speed) */}
            <div className="absolute bottom-3 left-2 sm:bottom-5 sm:left-4 z-20 w-48 sm:w-56">
              <RecommendedSpeedPanel
                percentage={recommendation.percentage}
                speedLevel={recommendation.speedLevel}
                isConnected={isConnected}
                onClick={() => setActiveIoTParam('recommended_speed')}
              />
            </div>

            {/* Panel 3: Top-Right of Fan (Fan Speed 650 RPM circular gauge) */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-36 sm:w-42">
              <FanSpeedGaugePanel
                rpm={recommendation.simulatedRpm}
                statusLabel="Recommended"
                isConnected={isConnected}
                onClick={() => setActiveIoTParam('rpm')}
              />
            </div>

            {/* Panel 4: Bottom-Right of Fan (Electricity Estimate) */}
            <div className="absolute bottom-3 right-2 sm:bottom-5 sm:right-4 z-20 w-48 sm:w-60">
              <ElectricityEstimatePanel
                hourlyUnits={0.042}
                hourlyCost={3.4}
                isConnected={isConnected}
                onClick={() => setActiveIoTParam('electricity')}
              />
            </div>
          </div>
        </div>

        {/* Section Divider: "Key Features" matching reference image */}
        <div className="mt-8 mb-6 flex items-center justify-center gap-4">
          <div className="h-[1px] w-20 sm:w-36 bg-gradient-to-r from-transparent to-cyan-400/80" />
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <span>Key Features</span>
          </h2>
          <div className="h-[1px] w-20 sm:w-36 bg-gradient-to-l from-transparent to-cyan-400/80" />
        </div>

        {/* 4 Feature Cards in 1 Row on Desktop matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            id="room-awareness"
            title="Room Awareness"
            description="Monitor temperature and room conditions in real-time."
            iconType="home"
            targetTab="dashboard"
            onNavigate={onNavigate}
          />

          <FeatureCard
            id="personalized-recommendations"
            title="Personalized Recommendations"
            description="Get the ideal fan speed for maximum comfort."
            iconType="fan"
            targetTab="dashboard"
            onNavigate={onNavigate}
          />

          <FeatureCard
            id="resolve-comfort-conflicts"
            title="Resolve Comfort Conflicts"
            description="Balance preferences between multiple users."
            iconType="users"
            targetTab="comfort-clash"
            onNavigate={onNavigate}
          />

          <FeatureCard
            id="energy-cost-insights"
            title="Energy & Cost Insights"
            description="Track electricity usage and know your estimated cost."
            iconType="leaf"
            targetTab="energy-calculator"
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* IoT Connected Fan Parameters Detail Modal */}
      <IoTParameterModal
        activeParameter={activeIoTParam}
        onClose={() => setActiveIoTParam(null)}
        onSelectParameter={setActiveIoTParam}
        isConnected={isConnected}
        onConnectFan={handleToggleConnection}
        currentValues={{
          temperatureC: comfortInputs.temperatureC,
          speedLevel: recommendation.speedLevel,
          percentage: recommendation.percentage,
          rpm: recommendation.simulatedRpm,
          hourlyCost: 3.4,
          hourlyUnits: 0.042,
        }}
      />
    </section>
  );
};
