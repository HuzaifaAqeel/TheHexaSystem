import { describe, expect, it } from 'vitest';
import { stepFromProgress } from '@/site/components/Design';

describe('Process scroll steps', () => {
  it('shows the first step when the section starts', () => { expect(stepFromProgress(0)).toBe(0); });
  it('moves to the next step every sixth of the scroll', () => { expect(stepFromProgress(0.17)).toBe(1); expect(stepFromProgress(0.5)).toBe(3); });
  it('stays on the last step at the end and beyond', () => { expect(stepFromProgress(1)).toBe(5); expect(stepFromProgress(1.4)).toBe(5); expect(stepFromProgress(-0.2)).toBe(0); });
});
