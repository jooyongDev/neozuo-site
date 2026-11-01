const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const pages = ['index.html', 'work/pmp.html', 'work/viliv.html', 'work/allclass.html', 'privacy.html', 'thanks.html', '404.html'];
const read = file => fs.readFileSync(file, 'utf8');

test('canonical site has no preview navigation or runtime dependencies', () => {
  for (const page of pages) {
    const html = read(page);
    assert.doesNotMatch(html, /version-bar|B · Night|디자인 시안/, page);
    assert.doesNotMatch(html, /(?:href|src)=["']\/(?:versions|archive)\//, page);
    if (!['thanks.html','404.html'].includes(page)) assert.doesNotMatch(html, /name="robots" content="noindex/, page);
  }
});

test('all canonical page links, local resources and fragments resolve', () => {
  for (const page of pages) {
    const html = read(page);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length, `${page}: duplicate IDs`);
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const url = new URL(match[1], 'https://neozuo.com/' + page);
      if (url.origin !== 'https://neozuo.com') continue;
      let file = decodeURIComponent(url.pathname).replace(/^\//, '') || 'index.html';
      if (file.endsWith('/')) file += 'index.html';
      assert.ok(fs.existsSync(file), `${page}: missing ${file}`);
      if (url.hash) assert.ok(read(file).includes(`id="${url.hash.slice(1)}"`), `${page}: missing ${url.hash} in ${file}`);
    }
  }
});

test('historical and internal files are excluded from Firebase hosting', () => {
  const { hosting } = JSON.parse(read('firebase.json'));
  for (const pattern of ['versions/**', 'archive/**', '**/*.md', 'tests/**', '**/.*', '**/.*/**', '**/*.log', 'firepit-log.txt']) {
    assert.ok(hosting.ignore.includes(pattern), `missing exclusion: ${pattern}`);
  }
  assert.doesNotMatch(read('sitemap.xml'), /\/versions\/|\/archive\/|\/thanks.html/);
});

test('stylesheet assets resolve independently of comparison files', () => {
  for (const file of ['styles.css', 'assets/base.css', 'assets/showcase.css', 'assets/case.css', 'assets/utility.css']) {
    for (const match of read(file).matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
      if (/^(data:|https?:)/.test(match[1])) continue;
      const asset = decodeURIComponent(new URL(match[1], 'https://neozuo.com/' + file).pathname).slice(1);
      assert.ok(fs.existsSync(asset), `${file}: missing ${asset}`);
      assert.doesNotMatch(asset, /^(versions|archive)\//);
    }
  }
});

test('selected homepage ships working inquiry and self-contained device scenes', () => {
  const html = read('index.html');
  assert.doesNotMatch(html, /concepts\/snapshot|preview\.js|Preview only|홈페이지 미리보기/);
  assert.match(html, /action="https:\/\/api.web3forms.com\/submit"/);
  assert.match(html, /<button class="btn" type="submit">/);
  const loop = read('assets/project-devices.js');
  assert.doesNotMatch(loop, /concepts\/snapshot/);
  for (const name of ['hwpx-upload', 'hwpx-review', 'student-attempt', 'teacher-attempt', 'student-result', 'student-review']) {
    assert.ok(fs.existsSync(`assets/pmp/${name}.webp`));
    assert.ok(loop.includes(`'${name}'`));
  }
});
