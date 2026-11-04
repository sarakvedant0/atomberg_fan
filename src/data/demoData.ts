import { AppSettings, ComfortInputs, EnergyInputs } from '../types';

export const DEFAULT_SETTINGS: AppSettings = {
  fanName: 'Master Bedroom BLDC Fan',
  ratedVoltage: 230,
  ratedPower: 50,
  electricityTariff: 7.5,
  defaultDailyHours: 8,
  preferredComfort: 'balanced',
  defaultActivity: 'relaxation',
  preferredFanSpeed: 3,
  defaultTempPreference: 29,
};

export const INITIAL_COMFORT_INPUTS: ComfortInputs = {
  temperatureC: 29,
  humidityPct: 58,
  activity: 'relaxation',
  occupants: 2,
  preference: 'balanced',
};

export const INITIAL_ENERGY_INPUTS: EnergyInputs = {
  voltageV: 230,
  powerWatts: 50,
  hoursPerDay: 8,
  billingDays: 30,
  tariffPerUnit: 7.5,
};
