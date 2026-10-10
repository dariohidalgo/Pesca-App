import { describe, it, expect } from 'vitest';
import { RIG_TUTORIALS, getRigById } from './rigTutorials';

describe('rigTutorials', () => {
  it('includes core line tutorials', () => {
    const slugs = RIG_TUTORIALS.map(r => r.id);
    expect(slugs).toContain('flote-pejerrey-tres-boyas');
    expect(slugs).toContain('paternoster-pejerrey');
    expect(slugs).toContain('fondo-carpa-feeder');
    expect(slugs).toContain('fondo-pesado-tararira-bagre');
    expect(slugs).toContain('flote-boya-plop');
  });

  it('each tutorial has all required fields for complete documentation', () => {
    RIG_TUTORIALS.forEach(rig => {
      expect(rig.id).toBeTruthy();
      expect(rig.title).toBeTruthy();
      expect(rig.species.length).toBeGreaterThan(0);
      expect(rig.purposeAndConditions.summary).toBeTruthy();
      expect(rig.purposeAndConditions.bestConditions).toBeTruthy();
      expect(rig.materials.length).toBeGreaterThanOrEqual(4);
      expect(rig.measurements.totalLength).toBeTruthy();
      expect(rig.measurements.adaptationRules.length).toBeGreaterThan(0);
      expect(rig.numberedSteps.length).toBeGreaterThanOrEqual(4);
      expect(rig.knots.length).toBeGreaterThan(0);
      rig.knots.forEach(k => {
        expect(k.name).toBeTruthy();
        expect(k.path).toBe('/nudos');
        expect(k.hash).toBeTruthy();
      });
      expect(rig.commonErrors.length).toBeGreaterThan(0);
      expect(rig.alternatives.length).toBeGreaterThan(0);
    });
  });

  it('getRigById retrieves a tutorial correctly', () => {
    const flote = getRigById('flote-pejerrey-tres-boyas');
    expect(flote).toBeDefined();
    expect(flote.title).toContain('3 boyas');
  });
});
