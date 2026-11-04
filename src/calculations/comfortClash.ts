import { ClashResult } from '../types';

/**
 * Calculates conflict compromise between two occupants.
 * Formula as per requirement:
 * compromise = round((personA + personB) / 2)
 * Allows optional manual override, clamped between 1 and 5.
 */
export function calculateComfortCompromise(
  personASpeed: number,
  personBSpeed: number,
  manualAdjustment: number | null = null
): ClashResult {
  const clampedA = Math.max(1, Math.min(5, Math.round(personASpeed)));
  const clampedB = Math.max(1, Math.min(5, Math.round(personBSpeed)));

  const rawAverage = (clampedA + clampedB) / 2;
  const suggestedCompromise = Math.max(1, Math.min(5, Math.round(rawAverage)));

  const effectiveSpeed = manualAdjustment !== null
    ? Math.max(1, Math.min(5, Math.round(manualAdjustment)))
    : suggestedCompromise;

  const deltaA = effectiveSpeed - clampedA;
  const deltaB = effectiveSpeed - clampedB;

  let advice = '';
  if (clampedA === clampedB) {
    advice = 'Both occupants have aligned comfort preferences! No compromise required.';
  } else if (Math.abs(clampedA - clampedB) >= 3) {
    advice = 'Significant preference divergence. Consider pairing this compromise with directional blade deflection, distance repositioning, or light layering for the colder occupant.';
  } else {
    advice = `A balanced compromise of Speed ${effectiveSpeed} splits the preference gap fairly between Person A (${clampedA}) and Person B (${clampedB}).`;
  }

  return {
    personASpeed: clampedA,
    personBSpeed: clampedB,
    suggestedCompromise,
    effectiveSpeed,
    deltaA,
    deltaB,
    advice,
  };
}
