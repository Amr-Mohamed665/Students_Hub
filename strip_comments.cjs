const fs = require('fs');
const path = require('path');

function stripComments(code, isCSS) {
  if (isCSS) {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  let result = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    const ch = code[i];
    const next = code[i + 1];

    // Single / double quoted strings
    if (ch === '"' || ch === "'") {
      result += ch;
      i++;
      while (i < len) {
        if (code[i] === '\\') {
          result += code[i] + (code[i + 1] || '');
          i += 2;
          continue;
        }
        if (code[i] === ch) { result += code[i++]; break; }
        result += code[i++];
      }
      continue;
    }

    // Template literals
    if (ch === '`') {
      result += ch;
      i++;
      while (i < len) {
        if (code[i] === '\\') {
          result += code[i] + (code[i + 1] || '');
          i += 2;
          continue;
        }
        if (code[i] === '`') { result += code[i++]; break; }
        result += code[i++];
      }
      continue;
    }

    // JSX block comments: {/* ... */}
    if (ch === '{' && next === '/' && code[i + 2] === '*') {
      i += 3;
      while (i < len) {
        if (code[i] === '*' && code[i + 1] === '/' && code[i + 2] === '}') {
          i += 3;
          break;
        }
        i++;
      }
      continue;
    }

    // Line comments: // ...
    if (ch === '/' && next === '/') {
      i += 2;
      while (i < len && code[i] !== '\n') i++;
      continue;
    }

    // Block comments: /* ... */
    if (ch === '/' && next === '*') {
      i += 2;
      while (i < len) {
        if (code[i] === '*' && code[i + 1] === '/') { i += 2; break; }
        i++;
      }
      continue;
    }

    result += ch;
    i++;
  }

  return result.replace(/\n{3,}/g, '\n\n').trim();
}

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      const isJS = ['.js', '.jsx', '.ts', '.tsx'].includes(ext);
      const isCSS = ext === '.css';
      if (isJS || isCSS) {
        try {
          const original = fs.readFileSync(fullPath, 'utf-8');
          const stripped = stripComments(original, isCSS);
          fs.writeFileSync(fullPath, stripped + '\n');
          console.log('OK  ' + entry.name);
        } catch (e) {
          console.error('ERR ' + fullPath + ' — ' + e.message);
        }
      }
    }
  }
}

const srcDir = path.join(__dirname, 'src');
console.log('Removing comments from:', srcDir, '\n');
processDir(srcDir);
console.log('\nAll done.');
