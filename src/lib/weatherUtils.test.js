import { describe, it, expect } from 'vitest';
import { getCordobaTodayString, getCardinalDirection } from './weatherUtils';

describe('weatherUtils', () => {
  describe('getCordobaTodayString', () => {
    it('formats date to YYYY-MM-DD in America/Argentina/Cordoba timezone', () => {
      // 2026-10-15 01:00:00 UTC corresponds to 2026-10-14 22:00:00 in Cordoba (UTC-3)
      const dateNearMidnightBefore = new Date('2026-10-15T01:00:00Z');
      expect(getCordobaTodayString(dateNearMidnightBefore)).toBe('2026-10-14');

      // 2026-10-15 03:00:00 UTC corresponds to 2026-10-15 00:00:00 in Cordoba (UTC-3)
      const dateMidnight = new Date('2026-10-15T03:00:00Z');
      expect(getCordobaTodayString(dateMidnight)).toBe('2026-10-15');

      // 2026-10-15 15:00:00 UTC corresponds to 2026-10-15 12:00:00 in Cordoba (UTC-3)
      const dateNoon = new Date('2026-10-15T15:00:00Z');
      expect(getCordobaTodayString(dateNoon)).toBe('2026-10-15');
    });

    it('defaults to current date when no argument is passed', () => {
      const todayStr = getCordobaTodayString();
      expect(todayStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('getCardinalDirection', () => {
    it('correctly maps 8 cardinal points in Spanish: N, NE, E, SE, S, SO, O, NO', () => {
      expect(getCardinalDirection(0)).toBe('N');
      expect(getCardinalDirection(45)).toBe('NE');
      expect(getCardinalDirection(90)).toBe('E');
      expect(getCardinalDirection(135)).toBe('SE');
      expect(getCardinalDirection(180)).toBe('S');
      expect(getCardinalDirection(225)).toBe('SO');
      expect(getCardinalDirection(270)).toBe('O');
      expect(getCardinalDirection(315)).toBe('NO');
      expect(getCardinalDirection(360)).toBe('N');
    });

    it('handles boundary degree angles around sector transitions', () => {
      // 0° +/- 22.5° -> N
      expect(getCardinalDirection(22)).toBe('N');
      expect(getCardinalDirection(23)).toBe('NE');

      // 45° +/- 22.5° -> NE (22.5 to 67.5)
      expect(getCardinalDirection(67)).toBe('NE');
      expect(getCardinalDirection(68)).toBe('E');

      // 90° +/- 22.5° -> E (67.5 to 112.5)
      expect(getCardinalDirection(112)).toBe('E');
      expect(getCardinalDirection(113)).toBe('SE');

      // 180° +/- 22.5° -> S (157.5 to 202.5)
      expect(getCardinalDirection(202)).toBe('S');
      expect(getCardinalDirection(203)).toBe('SO');

      // 270° +/- 22.5° -> O (247.5 to 292.5)
      expect(getCardinalDirection(247)).toBe('SO');
      expect(getCardinalDirection(248)).toBe('O');
      expect(getCardinalDirection(292)).toBe('O');
      expect(getCardinalDirection(293)).toBe('NO');

      // 360° boundary
      expect(getCardinalDirection(337)).toBe('NO');
      expect(getCardinalDirection(338)).toBe('N');
    });

    it('handles values exceeding 360 or negative degrees', () => {
      expect(getCardinalDirection(405)).toBe('NE'); // 405 % 360 = 45
      expect(getCardinalDirection(-90)).toBe('O'); // 270
    });

    it('returns empty string for null, undefined or NaN', () => {
      expect(getCardinalDirection(null)).toBe('');
      expect(getCardinalDirection(undefined)).toBe('');
      expect(getCardinalDirection(NaN)).toBe('');
    });
  });
});
