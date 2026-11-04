export type ActivityType = 'sleep' | 'relaxation' | 'study';

export type ComfortPreference = 'cooler' | 'balanced' | 'less_airflow';

export type UserFeedback = 'too_warm' | 'comfortable' | 'too_cold' | null;

export interface ComfortInputs {
  temperatureC: number;
  humidityPct: number;
  activity: ActivityType;
  occupants: number;
  preference: ComfortPreference;
}

export interface ComfortRecommendation {
  speedLevel: number; // 1 to 5
  percentage: number; // 20% to 100%
  simulatedRpm: number;
  apparentFeel: string;
  status: 'Optimal' | 'Mild' | 'Warm' | 'Humid' | 'Cool';
  explanation: string;
  coolingEffectDeltaC: number;
}

export interface ConflictInputs {
  personASpeed: number;
  personBSpeed: number;
  personAFeedback: UserFeedback;
  personBFeedback: UserFeedback;
  manualAdjustment: number | null;
}

export interface ClashResult {
  personASpeed: number;
  personBSpeed: number;
  suggestedCompromise: number;
  effectiveSpeed: number;
  deltaA: number;
  deltaB: number;
  advice: string;
}

export interface EnergyInputs {
  voltageV: number;
  powerWatts: number;
  hoursPerDay: number;
  billingDays: number;
  tariffPerUnit: number;
}

export interface EnergyCalculationResult {
  dailyUnits: number; // kWh
  periodUnits: number; // kWh
  dailyCost: number; // ₹
  periodCost: number; // ₹
  yearlyUnits: number; // kWh
  yearlyCost: number; // ₹
  isValid: boolean;
  errors: Record<string, string>;
}

export interface AppSettings {
  fanName: string;
  ratedVoltage: number;
  ratedPower: number;
  electricityTariff: number;
  defaultDailyHours: number;
  preferredComfort: ComfortPreference;
  defaultActivity: ActivityType;
  preferredFanSpeed: number;
  defaultTempPreference: number;
}

export type ActiveTab = 'home' | 'dashboard' | 'comfort-clash' | 'energy-calculator' | 'energy-insights' | 'how-it-works' | 'settings';
