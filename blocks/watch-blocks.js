#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

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
  console.log('No blocks found to watch.');
  process.exit(0);
}

console.log(`Found ${blockDirs.length} block(s): ${blockDirs.join(', ')}\n`);

// Copy block.json files initially
console.log('Copying block.json files...');
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

// Build each block separately for watch mode
console.log('\nStarting watch mode...');
const firstBlock = blockDirs[0];
const args = ['start', `${firstBlock}/index.js`, `--output-path=build/${firstBlock}`];

if (blockDirs.length > 1) {
  console.log('⚠️  Watch mode only supports one block at a time. Watching:', firstBlock);
}

const child = spawn('wp-scripts', args, { 
  stdio: 'inherit',
  cwd: blocksDir,
  shell: true
});

console.log('\n👀 Watching for changes...\n');

child.on('close', (code) => {
  process.exit(code);
});
