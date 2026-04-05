const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');
const tailwind = path.join(process.cwd(), 'tailwind.config.js');

const colorMap = {
  '#8A00FF': '#9200FF',
  '#7D00E6': '#9200FF',
  '#B500FF': '#9200FF',
  '#8a00ff': '#9200FF',
  '#7d00e6': '#9200FF',
  '#b500ff': '#9200FF'
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      processDir(p);
    } else if (p.endsWith('.js') || p.endsWith('.jsx') || p.endsWith('.css')) {
      replaceInFile(p);
    }
  }
}

function replaceInFile(p) {
  let content = fs.readFileSync(p, 'utf8');
  let changed = false;
  for (const [oldC, newC] of Object.entries(colorMap)) {
    if (content.includes(oldC)) {
      content = content.split(oldC).join(newC);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(p, content, 'utf8');
    console.log('Updated', p);
  }
}

processDir(srcDir);
replaceInFile(tailwind);
console.log('Color updates complete.');
