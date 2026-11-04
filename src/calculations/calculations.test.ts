import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateComfortRecommendation } from './comfortEngine';
import { calculateComfortCompromise } from './comfortClash';
import { calculateFanEnergyAndCost, generateHoursComparison } from './energyCalculator';

test('comfortEngine: recommends appropriate level within 1-5', () => {
  const coolSleep = calculateComfortRecommendation({
    temperatureC: 21,
    humidityPct: 45,
    activity: 'sleep',
    occupants: 1,
    preference: 'less_airflow',
  });
  assert.equal(coolSleep.speedLevel, 1);
  assert.equal(coolSleep.percentage, 25);
  assert.equal(coolSleep.simulatedRpm, 340);

  const hotStudy = calculateComfortRecommendation({
    temperatureC: 33,
    humidityPct: 75,
    activity: 'study',
    occupants: 3,
    preference: 'cooler',
  });
  assert.equal(hotStudy.speedLevel, 5);
  assert.equal(hotStudy.percentage, 100);
  assert.equal(hotStudy.simulatedRpm, 820);

  const balanced = calculateComfortRecommendation({
    temperatureC: 29,
    humidityPct: 55,
    activity: 'relaxation',
    occupants: 2,
    preference: 'balanced',
  });
  assert.ok(balanced.speedLevel >= 3 && balanced.speedLevel <= 4);
  assert.ok(balanced.explanation.length > 10);
});

test('comfortClash: computes accurate compromise speed and bounds', () => {
  // Average of 2 and 4 is 3
  const res1 = calculateComfortCompromise(2, 4);
  assert.equal(res1.suggestedCompromise, 3);
  assert.equal(res1.effectiveSpeed, 3);
  assert.equal(res1.deltaA, 1);
  assert.equal(res1.deltaB, -1);

  // Average of 1 and 4 is 2.5 -> rounds to 3
  const res2 = calculateComfortCompromise(1, 4);
  assert.equal(res2.suggestedCompromise, 3);

  // Manual adjustment overrides suggested compromise
  const res3 = calculateComfortCompromise(1, 5, 4);
  assert.equal(res3.suggestedCompromise, 3);
  assert.equal(res3.effectiveSpeed, 4);
});

test('energyCalculator: accurate calculations and validation', () => {
  // 50W fan running 8 hours a day, 30 days, tariff ₹7/unit
  // dailyUnits = 50 * 8 / 1000 = 0.4 kWh
  // periodUnits = 0.4 * 30 = 12 kWh
  // dailyCost = 0.4 * 7 = ₹2.8
  // periodCost = 12 * 7 = ₹84
  // yearlyUnits = 0.4 * 365 = 146 kWh
  // yearlyCost = 146 * 7 = ₹1022
  const result = calculateFanEnergyAndCost({
    voltageV: 230,
    powerWatts: 50,
    hoursPerDay: 8,
    billingDays: 30,
    tariffPerUnit: 7,
  });

  assert.equal(result.isValid, true);
  assert.equal(result.dailyUnits, 0.4);
  assert.equal(result.periodUnits, 12);
  assert.equal(result.dailyCost, 2.8);
  assert.equal(result.periodCost, 84);
  assert.equal(result.yearlyUnits, 146);
  assert.equal(result.yearlyCost, 1022);

  // Invalid hours > 24
  const invalid = calculateFanEnergyAndCost({
    voltageV: 230,
    powerWatts: 50,
    hoursPerDay: 26,
    billingDays: 30,
    tariffPerUnit: 7,
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.hoursPerDay);

  // Hours comparison generation
  const hoursData = generateHoursComparison(50, 7);
  assert.equal(hoursData.length, 8);
  assert.equal(hoursData[0].hours, '2h');
  assert.equal(hoursData[0].dailyKWh, 0.1);
});
