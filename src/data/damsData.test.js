import { describe, it, expect } from 'vitest';
import { DAMS_DATA, getDamById, getPublishedDams } from './damsData';

describe('damsData', () => {
  it('exports DAMS_DATA with core Córdoba dams', () => {
    expect(DAMS_DATA.length).toBeGreaterThanOrEqual(5);
    const slugs = DAMS_DATA.map(d => d.id);
    expect(slugs).toContain('san-roque');
    expect(slugs).toContain('los-molinos');
    expect(slugs).toContain('embalse');
    expect(slugs).toContain('cruz-del-eje');
    expect(slugs).toContain('pichanas');
  });

  it('getPublishedDams returns only published dams with complete verified information', () => {
    const published = getPublishedDams();
    expect(published.length).toBeGreaterThanOrEqual(5);
    published.forEach(dam => {
      expect(dam.status).toBe('published');
      expect(dam.name).toBeTruthy();
      expect(dam.department).toBeTruthy();
      expect(dam.coordinates).toHaveLength(2);
      expect(dam.species.length).toBeGreaterThan(0);
      expect(dam.publicAccess.length).toBeGreaterThan(0);
      expect(dam.fishingModalities.length).toBeGreaterThan(0);
      expect(dam.recommendedGear.length).toBeGreaterThan(0);
      expect(dam.regulations.permitRequired).toBeTruthy();
      expect(dam.verification.source).toBeTruthy();
      expect(dam.verification.lastVerified).toBeTruthy();
    });
  });

  it('getDamById finds existing dam by ID', () => {
    const sr = getDamById('san-roque');
    expect(sr).toBeDefined();
    expect(sr.name).toBe('Dique San Roque');
    expect(sr.species.some(s => s.name.includes('Pejerrey'))).toBe(true);
  });

  it('keeps incomplete dams as draft instead of empty placeholders', () => {
    const drafts = DAMS_DATA.filter(d => d.status === 'draft');
    expect(drafts.length).toBeGreaterThan(0);
    expect(drafts.length).toBeGreaterThan(0);
    drafts.forEach(d => {
      expect(d.status).toBe('draft');
      expect(d.fullDescription).toContain('borrador');
    });
  });

  it('includes waterLevel model with currentLevel and spillwayLevel for published dams', () => {
    const sr = getDamById('san-roque');
    expect(sr.waterLevel).toBeDefined();
    expect(sr.waterLevel.currentLevel).toBe(33.50);
    expect(sr.waterLevel.spillwayLevel).toBe(35.30);
    expect(sr.waterLevel.diff).toBe(-1.80);
    expect(sr.waterLevel.status).toBe('green');
    expect(sr.waterLevel.label).toBe('Cota: -1.80m del vertedero');
  });
});
