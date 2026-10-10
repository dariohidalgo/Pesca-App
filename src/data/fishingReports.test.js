import { describe, it, expect } from 'vitest';
import { getInitialReports, MODALITIES, SPECIES_FILTER_OPTIONS } from './fishingReports';

describe('fishingReports', () => {
  it('exports modalities and species filter options', () => {
    expect(MODALITIES.length).toBeGreaterThanOrEqual(4);
    expect(SPECIES_FILTER_OPTIONS.length).toBeGreaterThanOrEqual(4);
  });

  it('reports have valid structure with dates, dam, modality and disclaimer', () => {
    const reports = getInitialReports();
    // In dev mode, test reports exist
    if (reports.length > 0) {
      reports.forEach(r => {
        expect(r.id).toBeTruthy();
        expect(r.tripDate).toBeTruthy();
        expect(r.publishDate).toBeTruthy();
        expect(r.damId).toBeTruthy();
        expect(r.zone).toBeTruthy();
        expect(['costa', 'embarcado', 'kayak']).toContain(r.modality);
        expect(r.targetSpecies).toBeTruthy();
        expect(r.baitAndRig).toBeTruthy();
        expect(r.conditions).toBeTruthy();
        expect(typeof r.result.hasCatches).toBe('boolean');
        expect(r.disclaimer).toBeTruthy();
      });
    }
  });

  it('supports outings without catches (honest report documentation)', () => {
    const reports = getInitialReports();
    if (reports.length > 0) {
      const zeroCatchReport = reports.find(r => r.result.hasCatches === false);
      if (zeroCatchReport) {
        expect(zeroCatchReport.result.catchesCount).toBe(0);
        expect(zeroCatchReport.result.notes).toBeTruthy();
      }
    }
  });
});
