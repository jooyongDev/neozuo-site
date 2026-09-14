# neozuo.com

NEOZUO 홈페이지. Static HTML/CSS, Firebase Hosting.

- Deploy: `firebase deploy --only hosting --project <project-id>`
- Copy source of truth: Paperclip NEO-3 `positioning` document.
- Case studies (`/work/`): only copy cleared by the Delivery Lead final fact-check (NEO-7) goes here. PMP and allclass are live; viliv waits for founder attribution.
- Font: `fonts/pretendard-subset.woff2` holds only the glyphs used on the site (fast mobile first paint). Pages still load CDN Pretendard as a fallback for any new characters. After big copy changes, regenerate it: collect every character from the HTML pages into `chars.txt`, then run `pip install fonttools brotli` and `python -m fontTools.subset PretendardVariable.woff2 --text-file=chars.txt --flavor=woff2 --layout-features='*' --output-file=fonts/pretendard-subset.woff2`. Get `PretendardVariable.woff2` from pretendard v1.3.9.
