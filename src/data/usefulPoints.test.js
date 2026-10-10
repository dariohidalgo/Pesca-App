import { describe, it, expect } from 'vitest';
import { USEFUL_POINTS, POINT_CATEGORIES, getPointsByDam, getPointsByCategory } from './usefulPoints';

describe('usefulPoints', () => {
  it('covers all five required categories', () => {
    const requiredCats = ['acceso_publico', 'bajada_embarcacion', 'estacionamiento', 'camping', 'servicio'];
    requiredCats.forEach(cat => {
      expect(POINT_CATEGORIES[cat]).toBeDefined();
      expect(USEFUL_POINTS.some(p => p.category === cat)).toBe(true);
    });
  });

  it('all points have valid verified or pending structure and geographical coordinates', () => {
    USEFUL_POINTS.forEach(p => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.damId).toBeTruthy();
      expect(typeof p.isVerified).toBe('boolean');
      expect(p.coordinates).toHaveLength(2);
      // Valid coordinates for Córdoba province (latitude around -29 to -34, longitude around -63 to -66)
      const [lat, lon] = p.coordinates;
      expect(lat).toBeLessThan(-29);
      expect(lat).toBeGreaterThan(-35);
      expect(lon).toBeLessThan(-63);
      expect(lon).toBeGreaterThan(-66);
      expect(p.source).toBeTruthy();
      expect(p.verificationDate).toBeTruthy();
    });
  });

  it('filters points by dam correctly', () => {
    const srPoints = getPointsByDam('san-roque');
    expect(srPoints.length).toBeGreaterThan(0);
    expect(srPoints.every(p => p.damId === 'san-roque')).toBe(true);

    const all = getPointsByDam('todos');
    expect(all.length).toBe(USEFUL_POINTS.length);
  });

  it('filters points by category correctly', () => {
    const boatRamps = getPointsByCategory('bajada_embarcacion');
    expect(boatRamps.length).toBeGreaterThan(0);
    expect(boatRamps.every(p => p.category === 'bajada_embarcacion')).toBe(true);
  });
});
