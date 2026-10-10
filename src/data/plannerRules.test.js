import { describe, it, expect } from 'vitest';
import { generateTripPlan } from './plannerRules';

describe('plannerRules', () => {
  it('generates proposal with checklist and recommended rigs for pejerrey in San Roque', () => {
    const plan = generateTripPlan({
      damId: 'san-roque',
      tripDate: new Date().toISOString().split('T')[0],
      species: 'Pejerrey',
      modality: 'costa',
      experienceLevel: 'intermedio'
    });

    expect(plan.dam.name).toBe('Dique San Roque');
    expect(plan.recommendedRigs.some(r => r.id === 'flote-pejerrey-tres-boyas')).toBe(true);
    expect(plan.checklist.length).toBeGreaterThanOrEqual(4);
    expect(plan.checklist.some(c => c.category.includes('Documentación'))).toBe(true);
    expect(plan.checklist.some(c => c.category.includes('Equipo'))).toBe(true);
  });

  it('includes mandatory safety reminders according to modality', () => {
    const kayakPlan = generateTripPlan({
      damId: 'los-molinos',
      tripDate: new Date().toISOString().split('T')[0],
      species: 'Tararira',
      modality: 'kayak',
      experienceLevel: 'intermedio'
    });

    const kayakItems = kayakPlan.checklist.flatMap(c => c.items);
    expect(kayakItems.some(i => i.text.toLowerCase().includes('chaleco salvavidas'))).toBe(true);
    expect(kayakItems.some(i => i.text.toLowerCase().includes('fondeo'))).toBe(true);

    const boatPlan = generateTripPlan({
      damId: 'embalse',
      tripDate: new Date().toISOString().split('T')[0],
      species: 'Pejerrey',
      modality: 'embarcado',
      experienceLevel: 'intermedio'
    });

    const boatItems = boatPlan.checklist.flatMap(c => c.items);
    expect(boatItems.some(i => i.text.toLowerCase().includes('seguridad náutica'))).toBe(true);
  });

  it('detects dates beyond 7 days and alerts the user without inventing forecasts', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);
    const dateStr = futureDate.toISOString().split('T')[0];

    const plan = generateTripPlan({
      damId: 'san-roque',
      tripDate: dateStr,
      species: 'Carpa',
      modality: 'costa',
      experienceLevel: 'intermedio'
    });

    expect(plan.forecastStatus).toBe('beyond_range');
    expect(plan.forecastMessage).toContain('a más de 7 días');
  });
});
