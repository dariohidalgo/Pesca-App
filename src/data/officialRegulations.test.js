import { describe, it, expect } from 'vitest';
import { FISHING_REGULATIONS, UNVERIFIED_QUOTA_TEXT, NAUTICAL_SAFETY } from './officialRegulations';
import { DAMS_DATA } from './damsData';

describe('officialRegulations and quota consistency', () => {
  it('exports UNVERIFIED_QUOTA_TEXT with the exact required copy', () => {
    expect(UNVERIFIED_QUOTA_TEXT).toBe('Dato pendiente de verificación. Consultá la normativa oficial antes de salir');
  });

  it('all dique quotas in officialRegulations have status retirado and no hardcoded piece numbers', () => {
    const dams = Object.values(FISHING_REGULATIONS.damQuotas);
    expect(dams.length).toBeGreaterThanOrEqual(5);

    dams.forEach(dam => {
      expect(dam.statusNotice).toBe(UNVERIFIED_QUOTA_TEXT);
      expect(dam.officialPortalLink).toBe('https://cazaypesca.cba.gov.ar');
      dam.quotas.forEach(q => {
        expect(q.status).toBe('retirado');
        expect(q.limitNotice).toBe(UNVERIFIED_QUOTA_TEXT);
        // Ensure no hardcoded unbacked piece counts (e.g., 50 piezas, 40 piezas, 25 piezas, 30 piezas)
        expect(q.limitNotice).not.toMatch(/[0-9]+\s*piezas/i);
      });
    });
  });

  it('all secondary species in officialRegulations have status notice and no hardcoded numbers', () => {
    const species = FISHING_REGULATIONS.secondarySpecies;
    expect(species.length).toBe(4);

    species.forEach(sp => {
      expect(sp.statusNotice).toBe(UNVERIFIED_QUOTA_TEXT);
      expect(sp.officialPortalLink).toBe('https://cazaypesca.cba.gov.ar');
      expect(sp.notes).not.toMatch(/[0-9]+\s*piezas/i);
    });
  });

  it('San Roque in damsData matches official regulations and contains no unverified 50 pieces claim', () => {
    const sr = DAMS_DATA.find(d => d.id === 'san-roque');
    expect(sr).toBeDefined();

    const pejerrey = sr.species.find(s => s.name.includes('Pejerrey'));
    expect(pejerrey).toBeDefined();
    expect(pejerrey.regulations).toContain(UNVERIFIED_QUOTA_TEXT);
    expect(pejerrey.regulations).not.toContain('50 piezas');
    expect(pejerrey.regulations).not.toContain('Cupo oficial: hasta 50');

    // All species in San Roque must use UNVERIFIED_QUOTA_TEXT
    sr.species.forEach(sp => {
      expect(sp.regulations).toContain(UNVERIFIED_QUOTA_TEXT);
      expect(sp.regulations).not.toMatch(/[0-9]+\s*piezas/i);
    });
  });

  it('all diques in damsData have no unbacked numerical quota claims in species or vedaNote', () => {
    DAMS_DATA.forEach(dam => {
      dam.species.forEach(sp => {
        expect(sp.regulations).not.toMatch(/[0-9]+\s*piezas/i);
        expect(sp.regulations).not.toMatch(/cupo\s+oficial\s*:\s*hasta/i);
      });
      if (dam.regulations?.vedaNote) {
        expect(dam.regulations.vedaNote).not.toMatch(/[0-9]+\s*pejerreyes/i);
      }
    });
  });

  it('general rules contain verified bases and official portal links', () => {
    expect(FISHING_REGULATIONS.generalRules.length).toBeGreaterThanOrEqual(5);
    FISHING_REGULATIONS.generalRules.forEach(rule => {
      expect(rule.verification).toBe('corroborada');
      expect(rule.basis).toBeTruthy();
      expect(rule.officialPortalLink).toBe('https://cazaypesca.cba.gov.ar');
    });
  });

  it('nautical safety distinguishes legal obligations from practical recommendations', () => {
    expect(NAUTICAL_SAFETY.kayak.legalRequirements.length).toBeGreaterThan(0);
    expect(NAUTICAL_SAFETY.kayak.practicalRecommendations.length).toBeGreaterThan(0);
    expect(NAUTICAL_SAFETY.motorboat.legalRequirements.length).toBeGreaterThan(0);
  });
});
