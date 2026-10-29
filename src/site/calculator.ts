export interface Scenario { leads: number; bookingRate: number; scenarioRate: number; closeRate: number; jobValue: number }
export function calculateScenario(input: Scenario) {
  const finite = (n: number) => Number.isFinite(n) ? Math.max(0, n) : 0;
  const rate = (n: number) => Math.min(100, finite(n)) / 100;
  const current = finite(input.leads) * rate(input.bookingRate);
  const potential = finite(input.leads) * rate(input.scenarioRate);
  const additional = potential - current;
  const customers = additional * rate(input.closeRate);
  return { current, potential, additional, customers, revenue: customers * finite(input.jobValue) };
}