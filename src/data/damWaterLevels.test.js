import { describe, it, expect } from 'vitest';
import {
  evaluateWaterLevel,
  getDamWaterLevel,
  getAllDamWaterLevels,
  normalizeDamId,
  STATUS_STYLES
} from './damWaterLevels';

describe('damWaterLevels module', () => {
  describe('evaluateWaterLevel', () => {
    it('categorizes bajante < 2m as green with correct label', () => {
      // Dique San Roque: vertedero 35.30m, actual 33.50m => diff -1.80m
      const evalSanRoque = evaluateWaterLevel(33.50, 35.30);
      expect(evalSanRoque.status).toBe('green');
      expect(evalSanRoque.diff).toBe(-1.80);
      expect(evalSanRoque.diffFormatted).toBe('-1.80m');
      expect(evalSanRoque.label).toBe('Cota: -1.80m del vertedero');
      expect(evalSanRoque.styles).toEqual(STATUS_STYLES.green);
      expect(evalSanRoque.percentage).toBeCloseTo(94.9, 1);
    });

    it('categorizes bajante between 2m and 4m as yellow', () => {
      // Dique Los Molinos: vertedero 53.00m, actual 50.80m => diff -2.20m
      const evalLosMolinos = evaluateWaterLevel(50.80, 53.00);
      expect(evalLosMolinos.status).toBe('yellow');
      expect(evalLosMolinos.diff).toBe(-2.20);
      expect(evalLosMolinos.diffFormatted).toBe('-2.20m');
      expect(evalLosMolinos.label).toBe('Cota: -2.20m del vertedero');
      expect(evalLosMolinos.styles).toEqual(STATUS_STYLES.yellow);

      // Boundary check: exactly 4m bajante (-4.00m) is still yellow
      const evalBoundary4m = evaluateWaterLevel(31.30, 35.30);
      expect(evalBoundary4m.status).toBe('yellow');
      expect(evalBoundary4m.diff).toBe(-4.00);
    });

    it('categorizes bajante > 4m as orange', () => {
      // Dique Cruz del Eje: vertedero 37.20m, actual 32.50m => diff -4.70m
      const evalCruzDelEje = evaluateWaterLevel(32.50, 37.20);
      expect(evalCruzDelEje.status).toBe('orange');
      expect(evalCruzDelEje.diff).toBe(-4.70);
      expect(evalCruzDelEje.diffFormatted).toBe('-4.70m');
      expect(evalCruzDelEje.label).toBe('Cota: -4.70m del vertedero');
      expect(evalCruzDelEje.styles).toEqual(STATUS_STYLES.orange);
    });

    it('handles exact spillway level and overflow (> 0m) as green', () => {
      const atSpillway = evaluateWaterLevel(35.30, 35.30);
      expect(atSpillway.status).toBe('green');
      expect(atSpillway.diff).toBe(0);
      expect(atSpillway.diffFormatted).toBe('0.00m');
      expect(atSpillway.label).toContain('A nivel de vertedero');

      const overflow = evaluateWaterLevel(35.50, 35.30);
      expect(overflow.status).toBe('green');
      expect(overflow.diff).toBe(0.20);
      expect(overflow.diffFormatted).toBe('+0.20m');
      expect(overflow.label).toContain('+0.20m sobre vertedero');
    });

    it('handles invalid or missing inputs gracefully', () => {
      const invalid = evaluateWaterLevel(null, null);
      expect(invalid.status).toBe('gray');
      expect(invalid.diff).toBeNull();
      expect(invalid.label).toBe('Cota: Sin dato oficial');
    });
  });

  describe('normalizeDamId', () => {
    it('normalizes common aliases', () => {
      expect(normalizeDamId('rio-tercero')).toBe('embalse');
      expect(normalizeDamId('arturo-illia')).toBe('cruz-del-eje');
      expect(normalizeDamId('medina-allende')).toBe('la-vina');
      expect(normalizeDamId('san-roque')).toBe('san-roque');
    });
  });

  describe('getDamWaterLevel and getAllDamWaterLevels', () => {
    it('returns evaluated water level for known dam', () => {
      const sr = getDamWaterLevel('san-roque');
      expect(sr).not.toBeNull();
      expect(sr.currentLevel).toBe(33.50);
      expect(sr.spillwayLevel).toBe(35.30);
      expect(sr.status).toBe('green');
    });

    it('works with aliases', () => {
      const rioTercero = getDamWaterLevel('rio-tercero');
      expect(rioTercero).not.toBeNull();
      expect(rioTercero.spillwayLevel).toBe(46.50);
    });

    it('returns null for unknown dam id', () => {
      expect(getDamWaterLevel('dique-inexistente')).toBeNull();
    });

    it('getAllDamWaterLevels returns map of all dams in configuration', () => {
      const all = getAllDamWaterLevels();
      expect(Object.keys(all).length).toBeGreaterThanOrEqual(6);
      expect(all['san-roque']).toBeDefined();
      expect(all['los-molinos']).toBeDefined();
      expect(all['embalse']).toBeDefined();
    });
  });
});
