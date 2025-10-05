#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Approved open source licenses (SPDX identifiers)
const APPROVED_LICENSES = new Set([
  'MIT',
  'Apache-2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'ISC',
  'GPL-2.0',
  'GPL-3.0',
  'LGPL-2.1',
  'LGPL-3.0',
  'MPL-2.0',
  'CC0-1.0',
  'Unlicense',
  'WTFPL',
  '0BSD'
]);

// Known problematic licenses
const REJECTED_LICENSES = new Set([
  'UNLICENSED',
  'UNKNOWN',
  'Custom',
  'Proprietary'
]);

function checkLicenses() {
  console.log('🔍 Checking package licenses...\n');

  try {
    // Use license-checker to get all licenses
    const output = execSync('npx license-checker --json --onlyAllow "' + Array.from(APPROVED_LICENSES).join(';') + '"', {
      encoding: 'utf8',
      stdio: 'pipe'
    });

    const licenses = JSON.parse(output);
    const packages = Object.keys(licenses);
    
    console.log(`✅ All ${packages.length} packages use approved open source licenses`);
    console.log('\nLicense summary:');
    
    const licenseCounts = {};
    Object.values(licenses).forEach(pkg => {
      const license = pkg.licenses;
      licenseCounts[license] = (licenseCounts[license] || 0) + 1;
    });

    Object.entries(licenseCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([license, count]) => {
        console.log(`  ${license}: ${count} packages`);
      });

    return true;
  } catch (error) {
    console.error('❌ License check failed:');
    console.error(error.message);
    
    // Try to get detailed info about problematic licenses
    try {
      const allLicenses = execSync('npx license-checker --json', { encoding: 'utf8' });
      const allPackages = JSON.parse(allLicenses);
      
      console.log('\n🚨 Packages with non-approved licenses:');
      Object.entries(allPackages).forEach(([pkg, info]) => {
        const license = info.licenses;
        if (!APPROVED_LICENSES.has(license) || REJECTED_LICENSES.has(license)) {
          console.log(`  ${pkg}: ${license}`);
        }
      });
    } catch (detailError) {
      console.error('Could not get detailed license information');
    }
    
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
