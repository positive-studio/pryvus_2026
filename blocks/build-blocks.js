#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all block directories (subdirectories with block.json)
const blocksDir = __dirname;
const blockDirs = fs.readdirSync(blocksDir)
  .filter(item => {
    const itemPath = path.join(blocksDir, item);
    return fs.statSync(itemPath).isDirectory() && 
           item !== 'node_modules' && 
           item !== 'build' &&
           fs.existsSync(path.join(itemPath, 'block.json'));
  });

if (blockDirs.length === 0) {
  console.log('No blocks found to build.');
  process.exit(0);
}

console.log(`Found ${blockDirs.length} block(s): ${blockDirs.join(', ')}\n`);

// Build each block separately to ensure proper output structure
console.log('Building blocks...');
blockDirs.forEach(dir => {
  console.log(`\nBuilding ${dir}...`);
  try {
    execSync(`wp-scripts build ${dir}/index.js --output-path=build/${dir}`, { 
      stdio: 'inherit',
      cwd: blocksDir 
    });
  } catch (error) {
    console.error(`Build failed for ${dir}`);
    process.exit(1);
  }
});

// Copy block.json files to build directories
console.log('\nCopying block.json files...');
blockDirs.forEach(dir => {
  const sourceJson = path.join(blocksDir, dir, 'block.json');
  const buildDir = path.join(blocksDir, 'build', dir);
  const targetJson = path.join(buildDir, 'block.json');
  
  // Ensure build directory exists
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  
  // Copy block.json
  fs.copyFileSync(sourceJson, targetJson);
  console.log(`✓ Copied ${dir}/block.json to build/${dir}/`);
});

console.log('\n✨ Build complete!');
