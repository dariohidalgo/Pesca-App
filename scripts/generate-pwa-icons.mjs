import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

// Create standard PWA icon SVG (192, 512, apple-touch 180, maskable 512)
function getSvg(size, isMaskable = false) {
  // Brand color #2563eb (blue-600)
  const scale = isMaskable ? (size * 0.5) / 24 : (size * 0.65) / 24;
  const offset = (size - 24 * scale) / 2;
  const rx = isMaskable ? 0 : Math.round(size * 0.18);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1d4ed8" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${rx}" fill="url(#grad)"/>
  <g transform="translate(${offset}, ${offset}) scale(${scale})">
    <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 1.11 0 2.2.28 3.15.8l-1.16 2.58a8 8 0 0 0-4.48 2.62" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.5 12c-.94 3.46-4.94 6-8.5 6-1.11 0-2.2-.28-3.15-.8l1.16-2.58a8 8 0 0 1 4.48-2.62" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 16.5c0-.66.55-1.5 1-2.5-.5-.95-1-1.84-1-2.5" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 11v.01" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
}

const icons = [
  { name: 'pwa-192x192.png', size: 192, maskable: false },
  { name: 'pwa-512x512.png', size: 512, maskable: false },
  { name: 'maskable-icon-512x512.png', size: 512, maskable: true },
  { name: 'apple-touch-icon.png', size: 180, maskable: false }
];

for (const icon of icons) {
  const tempSvgPath = path.resolve(publicDir, `temp-${icon.size}.svg`);
  const outPngPath = path.resolve(publicDir, icon.name);

  fs.writeFileSync(tempSvgPath, getSvg(icon.size, icon.maskable));
  execSync(`sips -s format png "${tempSvgPath}" --out "${outPngPath}"`);
  fs.unlinkSync(tempSvgPath);
  console.log(`Generated ${icon.name} (${icon.size}x${icon.size})`);
}
