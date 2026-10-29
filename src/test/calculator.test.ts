import { describe, it, expect } from 'vitest';
import { calculateScenario } from '@/site/calculator';
describe('Illustrative booking scenario', () => {
  const base = { leads: 100, bookingRate: 20, scenarioRate: 35, closeRate: 50, jobValue: 500 };
  it('calculates leads × rates and additional customers × job value', () => {
    expect(calculateScenario(base)).toEqual({ current: 20, potential: 35, additional: 15, customers: 7.5, revenue: 3750 });
  });
  it('handles zero and blank numerical input without division by zero', () => {
    expect(calculateScenario({ ...base, leads: NaN }).revenue).toBe(0);
    expect(calculateScenario({ ...base, leads: 0 }).additional).toBe(0);
  });
  it('validates percentages to the zero-to-100 range', () => {
    const result = calculateScenario({ ...base, bookingRate: -20, scenarioRate: 140, closeRate: 150 });
    expect(result.current).toBe(0); expect(result.potential).toBe(100); expect(result.revenue).toBe(50000);
  });
  it('preserves negative scenario changes instead of guaranteeing uplift', () => {
    expect(calculateScenario({ ...base, scenarioRate: 10 }).revenue).toBe(-2500);
  });
});