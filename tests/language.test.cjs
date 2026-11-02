const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const read = path => fs.readFileSync(path, 'utf8');

test('each translated public page links to its corresponding language version', () => {
  for (const [ko, en, koUrl, enUrl] of [
    ['index.html', 'en/index.html', '/', '/en/'],
    ...['pmp', 'viliv', 'allclass'].map(name => [`work/${name}.html`, `en/work/${name}.html`, `/work/${name}.html`, `/en/work/${name}.html`]),
  ]) {
    for (const path of [ko, en]) {
      const html = read(path);
      assert.match(html, new RegExp(`hreflang="ko" href="https://neozuo\\.com${koUrl.replace('.', '\\.')}"`));
      assert.match(html, new RegExp(`hreflang="en" href="https://neozuo\\.com${enUrl.replace('.', '\\.')}"`));
    }
    assert.match(read(ko), new RegExp(`href="${enUrl.replace('.', '\\.')}"[^>]*hreflang="en"`));
    assert.match(read(en), new RegExp(`href="${koUrl.replace('.', '\\.')}"[^>]*hreflang="ko"`));
  }
});

test('English pages are listed for discovery and confirmation page stays out', () => {
  const sitemap = read('sitemap.xml');
  for (const path of ['/en/', '/en/work/pmp.html', '/en/work/viliv.html', '/en/work/allclass.html', '/en/privacy.html']) assert.ok(sitemap.includes(`https://neozuo.com${path}`));
  assert.ok(!sitemap.includes('/en/thanks.html'));
  assert.match(read('en/thanks.html'), /name="robots" content="noindex"/);
  assert.match(read('en/index.html'), /action="https:\/\/api.web3forms.com\/submit"/);
  assert.match(read('en/index.html'), /name="privacy_consent"[^>]*required/);
});
