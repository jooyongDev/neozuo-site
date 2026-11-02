const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const values = (html, regex) => [...html.matchAll(regex)].map(match => match[1]);

test('English pages retain the Korean page sections and product imagery', () => {
  for (const page of ['index.html', 'work/pmp.html', 'work/viliv.html', 'work/allclass.html']) {
    const original = read(page), translated = read(`en/${page}`);
    assert.deepEqual(values(translated, /<section\b[^>]*\bid="([^"]+)"/g), values(original, /<section\b[^>]*\bid="([^"]+)"/g), page);
    assert.deepEqual(values(translated, /<img\b[^>]*\bsrc="([^"]+)"/g), values(original, /<img\b[^>]*\bsrc="([^"]+)"/g), page);
    assert.match(translated, /<html lang="en">/);
    assert.ok(translated.includes(`href="https://neozuo.com/en/${page === 'index.html' ? '' : page}"`));
  }
});

test('English interactive components use localized scripts', () => {
  const home = read('en/index.html'), pmp = read('en/work/pmp.html');
  assert.match(home, /\/en\/assets\/site\.js/);
  assert.match(home, /\/en\/assets\/project-devices\.js/);
  assert.match(home, /\/en\/assets\/image-viewer\.js/);
  assert.match(pmp, /\/en\/assets\/image-viewer\.js/);
  for (const name of ['site.js', 'project-devices.js', 'image-viewer.js']) {
    assert.doesNotMatch(read(`en/assets/${name}`), /[가-힣]/, name);
  }
});
