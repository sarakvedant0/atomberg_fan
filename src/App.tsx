import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { ComfortClash } from './pages/ComfortClash';
import { EnergyCalculator } from './pages/EnergyCalculator';
import { EnergyInsights } from './pages/EnergyInsights';
import { HowItWorks } from './pages/HowItWorks';
import { Settings } from './pages/Settings';
import {
  ActiveTab,
  ComfortInputs,
  EnergyInputs,
  AppSettings,
} from './types';
import {
  DEFAULT_SETTINGS,
  INITIAL_COMFORT_INPUTS,
  INITIAL_ENERGY_INPUTS,
} from './data/demoData';
import { calculateComfortRecommendation } from './calculations/comfortEngine';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [settings, setSettings] = useLocalStorage<AppSettings>(
    'comfortiq_settings_v1',
    DEFAULT_SETTINGS
  );

  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    // Check URL search params for autostart or direct tab routing
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as ActiveTab;
    if (params.get('autostart') === '1') return 'dashboard';
    if (tabParam && ['home', 'dashboard', 'comfort-clash', 'energy-calculator', 'energy-insights', 'how-it-works', 'settings'].includes(tabParam)) {
      return tabParam;
    }
    return 'home';
  });

  const [comfortInputs, setComfortInputs] = useState<ComfortInputs>(() => ({
    ...INITIAL_COMFORT_INPUTS,
    preference: settings.preferredComfort,
    activity: settings.defaultActivity,
    temperatureC: settings.defaultTempPreference,
  }));

  const [energyInputs, setEnergyInputs] = useState<EnergyInputs>(() => ({
    ...INITIAL_ENERGY_INPUTS,
    voltageV: settings.ratedVoltage,
    powerWatts: settings.ratedPower,
    tariffPerUnit: settings.electricityTariff,
    hoursPerDay: settings.defaultDailyHours,
  }));

  const [isFanConnected, setIsFanConnected] = useState<boolean>(false);

  // Reactive live comfort recommendation
  const comfortRecommendation = calculateComfortRecommendation(comfortInputs);

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFanConnection = () => {
    setIsFanConnected((prev) => !prev);
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    // Sync into active calculations
    setComfortInputs((prev) => ({
      ...prev,
      preference: newSettings.preferredComfort,
      activity: newSettings.defaultActivity,
      temperatureC: newSettings.defaultTempPreference,
    }));
    setEnergyInputs((prev) => ({
      ...prev,
      voltageV: newSettings.ratedVoltage,
      powerWatts: newSettings.ratedPower,
      tariffPerUnit: newSettings.electricityTariff,
      hoursPerDay: newSettings.defaultDailyHours,
    }));
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    setComfortInputs(INITIAL_COMFORT_INPUTS);
    setEnergyInputs(INITIAL_ENERGY_INPUTS);
  };

  return (
    <div className="min-h-screen bg-[#050B17] text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Fixed Navigation */}
      <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            comfortInputs={comfortInputs}
            recommendation={comfortRecommendation}
            energyInputs={energyInputs}
            onNavigate={handleNavigate}
            isFanConnected={isFanConnected}
            onToggleConnection={handleToggleFanConnection}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            inputs={comfortInputs}
            onInputsChange={setComfortInputs}
            recommendation={comfortRecommendation}
          />
        )}

        {activeTab === 'comfort-clash' && <ComfortClash />}

        {activeTab === 'energy-calculator' && (
          <EnergyCalculator
            energyInputs={energyInputs}
            onInputsChange={setEnergyInputs}
          />
        )}

        {activeTab === 'energy-insights' && (
          <EnergyInsights energyInputs={energyInputs} />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorks onNavigate={handleNavigate} />
        )}

        {activeTab === 'settings' && (
          <Settings
            settings={settings}
            onSaveSettings={handleSaveSettings}
            onResetDefaults={handleResetSettings}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
