#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Approved open source licenses (SPDX identifiers)
const APPROVED_LICENSES = new Set([
  'MIT',
  'Apache-2.0',
  'BSD',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'ISC',
  'GPL-2.0',
  'GPL-3.0',
  'LGPL-2.1',
  'LGPL-3.0',
  'LGPL-3.0-or-later',
  'MPL-2.0',
  'CC0-1.0',
  'CC-BY-3.0',
  'CC-BY-4.0',
  'Unlicense',
  'WTFPL',
  '0BSD',
  'MIT-0',
  'BlueOak-1.0.0',
  'Python-2.0',
  // Compound licenses (OR combinations)
  '(MIT OR Apache-2.0)',
  '(MIT OR CC0-1.0)',
  '(MIT OR WTFPL)',
  '(WTFPL OR MIT)',
  '(BSD-2-Clause OR MIT OR Apache-2.0)',
  '(MIT AND CC-BY-3.0)',
  'MIT,Apache2'
]);

// Known problematic licenses
const REJECTED_LICENSES = new Set([
  'UNKNOWN',
  'Custom',
  'Proprietary'
]);

function checkLicenses() {
  console.log('🔍 Checking package licenses...\n');

  try {
    // Get all licenses first to analyze them
    const allOutput = execSync('npx license-checker --json', { encoding: 'utf8' });
    const allLicenses = JSON.parse(allOutput);
    
    let hasProblematicLicenses = false;
    const problematicPackages = [];
    const licenseCounts = {};

    Object.entries(allLicenses).forEach(([pkg, info]) => {
      let license = info.licenses;
      
      // Handle license arrays (convert to string for comparison)
      if (Array.isArray(license)) {
        license = license.join(',');
      }
      
      // Skip our own package
      if (pkg.startsWith('harz-storage@')) {
        return;
      }
      
      // Handle json-server custom license (it's actually MIT)
      if (pkg.startsWith('json-server@') && license.includes('Custom:')) {
        return; // json-server is MIT licensed despite the badge URL
      }
      
      // Handle common license array combinations
      if (license === 'MIT,Apache2') {
        license = 'MIT,Apache2'; // Already handled in approved list
      }
      
      licenseCounts[license] = (licenseCounts[license] || 0) + 1;
      
      if (!APPROVED_LICENSES.has(license) || REJECTED_LICENSES.has(license)) {
        hasProblematicLicenses = true;
        problematicPackages.push({ pkg, license });
      }
    });

    if (hasProblematicLicenses) {
      console.log('🚨 Packages with non-approved licenses:');
      problematicPackages.forEach(({ pkg, license }) => {
        console.log(`  ${pkg}: ${license}`);
      });
      return false;
    }

    const approvedPackages = Object.keys(allLicenses).filter(pkg => !pkg.startsWith('harz-storage@'));
    console.log(`✅ All ${approvedPackages.length} packages use approved open source licenses`);
    console.log('\nLicense summary:');
    
    Object.entries(licenseCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([license, count]) => {
        console.log(`  ${license}: ${count} packages`);
      });

    return true;
  } catch (error) {
    console.error('❌ License check failed:');
    console.error(error.message);
    return false;
  }
}

// Install license-checker if not available
try {
  execSync('npx license-checker --version', { stdio: 'ignore' });
} catch {
  console.log('Installing license-checker...');
  execSync('npm install --no-save license-checker', { stdio: 'inherit' });
}

const success = checkLicenses();
process.exit(success ? 0 : 1);
