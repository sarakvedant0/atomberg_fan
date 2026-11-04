import { EnergyInputs, EnergyCalculationResult } from '../types';

/**
 * Validates inputs and calculates electricity consumption and cost.
 *
 * Formulas:
 * dailyUnits = (powerWatts * hoursPerDay) / 1000
 * periodUnits = (powerWatts * hoursPerDay * billingDays) / 1000
 * estimatedCost = periodUnits * tariffPerUnit
 * dailyCost = dailyUnits * tariffPerUnit
 * yearlyUnits = dailyUnits * 365
 * yearlyCost = yearlyUnits * tariffPerUnit
 */
export function calculateFanEnergyAndCost(inputs: EnergyInputs): EnergyCalculationResult {
  const errors: Record<string, string> = {};

  const { voltageV, powerWatts, hoursPerDay, billingDays, tariffPerUnit } = inputs;

  if (isNaN(voltageV) || voltageV <= 0) {
    errors.voltageV = 'Please enter a valid AC operating voltage (e.g., 220V–240V).';
  }

  if (isNaN(powerWatts) || powerWatts <= 0) {
    errors.powerWatts = 'Fan rated power must be a positive number in Watts (e.g., 28W–75W).';
  }

  if (isNaN(hoursPerDay) || hoursPerDay < 0 || hoursPerDay > 24) {
    errors.hoursPerDay = 'Daily operating hours must be between 0 and 24 hours.';
  }

  if (isNaN(billingDays) || billingDays <= 0 || !Number.isInteger(billingDays)) {
    errors.billingDays = 'Billing period must be a positive whole number of days (e.g., 30 or 60).';
  }

  if (isNaN(tariffPerUnit) || tariffPerUnit < 0) {
    errors.tariffPerUnit = 'Electricity tariff must be zero or a positive rate (₹ per kWh).';
  }

  const isValid = Object.keys(errors).length === 0;

  if (!isValid) {
    return {
      dailyUnits: 0,
      periodUnits: 0,
      dailyCost: 0,
      periodCost: 0,
      yearlyUnits: 0,
      yearlyCost: 0,
      isValid: false,
      errors,
    };
  }

  const dailyUnits = (powerWatts * hoursPerDay) / 1000;
  const periodUnits = (powerWatts * hoursPerDay * billingDays) / 1000;
  const dailyCost = dailyUnits * tariffPerUnit;
  const periodCost = periodUnits * tariffPerUnit;
  const yearlyUnits = dailyUnits * 365;
  const yearlyCost = yearlyUnits * tariffPerUnit;

  return {
    dailyUnits: Number(dailyUnits.toFixed(4)),
    periodUnits: Number(periodUnits.toFixed(3)),
    dailyCost: Number(dailyCost.toFixed(2)),
    periodCost: Number(periodCost.toFixed(2)),
    yearlyUnits: Number(yearlyUnits.toFixed(2)),
    yearlyCost: Number(yearlyCost.toFixed(2)),
    isValid: true,
    errors: {},
  };
}

/**
 * Generates hours comparison chart data (2, 4, 6, 8, 10, 12, 16, 24 hrs)
 */
export function generateHoursComparison(powerWatts: number, tariffPerUnit: number) {
  const hourOptions = [2, 4, 6, 8, 10, 12, 16, 24];
  return hourOptions.map((hrs) => {
    const dailyKWh = (powerWatts * hrs) / 1000;
    const monthlyCost = dailyKWh * 30 * tariffPerUnit;
    return {
      hours: `${hrs}h`,
      hoursNum: hrs,
      dailyKWh: Number(dailyKWh.toFixed(3)),
      monthlyCost: Number(monthlyCost.toFixed(1)),
    };
  });
}

/**
 * Generates wattage comparison chart data (BLDC 28W, Energy-star 45W, Standard 55W, Heavy 75W, High-speed 90W)
 */
export function generateWattageComparison(hoursPerDay: number, tariffPerUnit: number) {
  const wattageOptions = [
    { label: 'BLDC Eco (28W)', watts: 28 },
    { label: '5-Star (40W)', watts: 40 },
    { label: 'Standard (55W)', watts: 55 },
    { label: 'High Speed (75W)', watts: 75 },
    { label: 'Heavy Duty (90W)', watts: 90 },
  ];

  return wattageOptions.map((item) => {
    const monthlyKWh = (item.watts * hoursPerDay * 30) / 1000;
    const monthlyCost = monthlyKWh * tariffPerUnit;
    const yearlyCost = monthlyKWh * 12 * tariffPerUnit;
    return {
      category: item.label,
      watts: item.watts,
      monthlyKWh: Number(monthlyKWh.toFixed(2)),
      monthlyCost: Number(monthlyCost.toFixed(1)),
      yearlyCost: Number(yearlyCost.toFixed(1)),
    };
  });
}

/**
 * Generates tariff sensitivity data (₹3, ₹5, ₹7, ₹9, ₹12 per kWh)
 */
export function generateTariffSensitivity(powerWatts: number, hoursPerDay: number) {
  const tariffs = [3, 5, 7, 9, 11, 13];
  const monthlyKWh = (powerWatts * hoursPerDay * 30) / 1000;
  return tariffs.map((rate) => ({
    tariff: `₹${rate}/kWh`,
    rate,
    monthlyCost: Number((monthlyKWh * rate).toFixed(1)),
    yearlyCost: Number((monthlyKWh * 12 * rate).toFixed(1)),
  }));
}
