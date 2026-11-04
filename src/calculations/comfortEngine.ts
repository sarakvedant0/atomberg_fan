import { ComfortInputs, ComfortRecommendation } from '../types';

/**
 * Calculates fan speed recommendation (levels 1-5) based on room temperature,
 * relative humidity, occupant activity, number of occupants, and personal preference.
 *
 * Rules rationale:
 * 1. Base thermal baseline:
 *    <= 22°C -> Level 1 (Gentle breeze)
 *    23°C - 26°C -> Level 2 (Comfort flow)
 *    27°C - 29°C -> Level 3 (Optimal moderate cooling)
 *    30°C - 32°C -> Level 4 (Strong circulation)
 *    >= 33°C -> Level 5 (Maximum convective cooling)
 * 2. Humidity effect: High humidity (>= 65%) inhibits sweat evaporation, adding +0.5 to +1 offset.
 *    Low humidity (< 35%) with mild temps reduces -0.5.
 * 3. Activity metabolic rate: 'sleep' (-1 level, min 1), 'relaxation' (0), 'study' (0).
 * 4. Multi-occupants: >= 3 occupants add +0.5, >= 5 add +1.
 * 5. Comfort preference: 'cooler' (+1), 'less_airflow' (-1), 'balanced' (0).
 * 6. Bounds clamped strictly to [1, 5].
 */
export function calculateComfortRecommendation(inputs: ComfortInputs): ComfortRecommendation {
  const { temperatureC, humidityPct, activity, occupants, preference } = inputs;

  let baseScore = 3;

  if (temperatureC <= 22) {
    baseScore = 1;
  } else if (temperatureC <= 26) {
    baseScore = 2;
  } else if (temperatureC <= 29) {
    baseScore = 3;
  } else if (temperatureC <= 32) {
    baseScore = 4;
  } else {
    baseScore = 5;
  }

  // Humidity adjustment
  if (humidityPct >= 75) {
    baseScore += 1;
  } else if (humidityPct >= 65 && temperatureC >= 27) {
    baseScore += 0.5;
  } else if (humidityPct < 35 && temperatureC <= 24) {
    baseScore -= 0.5;
  }

  // Activity adjustment
  if (activity === 'sleep') {
    baseScore -= 1;
  }

  // Occupants adjustment
  if (occupants >= 5) {
    baseScore += 1;
  } else if (occupants >= 3 && temperatureC >= 27) {
    baseScore += 0.5;
  }

  // Preference adjustment
  if (preference === 'cooler') {
    baseScore += 1;
  } else if (preference === 'less_airflow') {
    baseScore -= 1;
  }

  // Clamp strictly between 1 and 5
  const roundedLevel = Math.max(1, Math.min(5, Math.round(baseScore)));

  // Simulated representative metrics matching reference image
  const rpmMap: Record<number, number> = {
    1: 340,
    2: 480,
    3: 650,
    4: 720,
    5: 820,
  };

  const percentageMap: Record<number, number> = {
    1: 25,
    2: 40,
    3: 60,
    4: 80,
    5: 100,
  };

  const coolingDeltaMap: Record<number, number> = {
    1: 1.0,
    2: 1.8,
    3: 2.5,
    4: 3.2,
    5: 4.0,
  };

  let status: 'Optimal' | 'Mild' | 'Warm' | 'Humid' | 'Cool' = 'Optimal';
  if (temperatureC < 23) status = 'Cool';
  else if (temperatureC > 31) status = 'Warm';
  else if (humidityPct > 70) status = 'Humid';
  else if (temperatureC >= 28) status = 'Optimal';
  else status = 'Mild';

  let explanation = '';
  if (temperatureC >= 30) {
    explanation = `At ${temperatureC}°C and ${humidityPct}% humidity, elevated room heat requires Speed ${roundedLevel} (${percentageMap[roundedLevel]}%) to induce a wind-chill convective cooling effect of ~${coolingDeltaMap[roundedLevel]}°C.`;
  } else if (activity === 'sleep') {
    explanation = `For sleep mode at ${temperatureC}°C, Speed ${roundedLevel} provides gentle continuous circulation without disruptive aerodynamic turbulence or draftiness.`;
  } else if (humidityPct >= 65) {
    explanation = `High ambient humidity (${humidityPct}%) retards natural perspiration evaporation. Speed ${roundedLevel} boosts skin vapor removal to maintain thermal comfort.`;
  } else {
    explanation = `Balanced room condition (${temperatureC}°C, ${humidityPct}% RH). Speed ${roundedLevel} (${percentageMap[roundedLevel]}%) produces optimal air renewal for ${occupants} occupant${occupants > 1 ? 's' : ''}.`;
  }

  const apparentFeel = `${(temperatureC - coolingDeltaMap[roundedLevel]).toFixed(1)}°C (with airflow)`;

  return {
    speedLevel: roundedLevel,
    percentage: percentageMap[roundedLevel],
    simulatedRpm: rpmMap[roundedLevel],
    apparentFeel,
    status,
    explanation,
    coolingEffectDeltaC: coolingDeltaMap[roundedLevel],
  };
}
