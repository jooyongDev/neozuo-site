const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('assets/motion.js', 'utf8');

function setup({ reduced = false, fine = true } = {}) {
  const animations = [], frames = new Map(), observers = [];
  let nextFrame = 0, time = 0;
  function node() {
    const listeners = new Map();
    return {
      style: {}, dataset: {}, children: [], computedTransform: 'none',
      addEventListener(type, fn) { (listeners.get(type) || listeners.set(type, []).get(type)).push(fn); },
      emit(type, event = {}) { for (const fn of listeners.get(type) || []) fn(event); },
      setAttribute() {}, append() {}, querySelector() { return null; }, querySelectorAll() { return []; },
      getBoundingClientRect() { return { left: 0, top: 0, width: 1440, height: 782 }; },
      animate(keyframes, options) {
        const animation = { element: this, keyframes, options, cancelled: false,
          cancel() { this.cancelled = true; }, finished: new Promise(() => {}) };
        animations.push(animation);
        return animation;
      },
    };
  }
  const root = node(), header = node(), hero = node(), frame = node(), button = node();
  const title = node(), description = node(), actions = node(), part = node(), figure = node();
  part.computedTransform = 'matrix(0.996, -0.087, 0.087, 0.996, 0, 18)';
  figure.querySelectorAll = () => [part];
  hero.querySelector = () => frame;
  const reducedMedia = Object.assign(node(), { matches: reduced });
  const pointerMedia = Object.assign(node(), { matches: fine });
  const nodes = { '.home-page .nav': header, '.home-page .hero': hero,
    '.hero h1': title, '.hero-copy > p, .detail-heading > p': description, '.hero-actions': actions };
  const document = Object.assign(node(), { documentElement: root, hidden: false,
    createElement: () => button, querySelector: selector => nodes[selector] || null,
    querySelectorAll: selector => selector === '.pmp-demo, .viliv-visual, .allclass-visual' ? [figure] : [] });
  class Observer {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    enter(target) { if (this.targets.has(target)) this.callback([{ target, isIntersecting: true }]); }
  }
  const window = Object.assign(node(), { scrollY: 0, IntersectionObserver: Observer });
  vm.runInNewContext(source, { document, window, IntersectionObserver: Observer,
    matchMedia: query => query.includes('prefers-reduced') ? reducedMedia : pointerMedia,
    getComputedStyle: element => ({ transform: element.computedTransform, opacity: '1' }),
    requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id) });
  const move = (pointerType = 'mouse') => hero.emit('pointermove', { pointerType, clientX: 1440, clientY: 782 });
  function settleFrames() {
    for (let i = 0; frames.size && i < 600; i++) {
      const pending = [...frames.values()]; frames.clear(); time += 1000 / 60;
      pending.forEach(callback => callback(time));
    }
    assert.equal(frames.size, 0, 'the spring must stop scheduling frames when settled');
  }
  return { root, header, hero, frame, button, part, figure, document, window, reducedMedia,
    animations, frames, observer: observers[0], move, settleFrames };
}

test('pointer movement stays bounded, settles without an idle loop, and returns home', () => {
  const s = setup();
  s.move(); s.settleFrames();
  assert.equal(s.frame.style.transform, 'translate3d(7px,5px,0)');
  s.hero.emit('pointerleave'); s.settleFrames();
  assert.equal(s.frame.style.transform, '');
  s.move('touch'); assert.equal(s.frames.size, 0);
  const mobile = setup({ fine: false }); mobile.move(); assert.equal(mobile.frames.size, 0);
});

test('reduced motion prevents starts; opt-out and keyboard cancel active movement', () => {
  const reduced = setup({ reduced: true });
  reduced.move(); reduced.observer.enter(reduced.figure);
  assert.equal(reduced.animations.length, 0); assert.equal(reduced.frames.size, 0);
  assert.equal(reduced.button.hidden, true);
  const s = setup(); s.move(); s.button.emit('click');
  assert.equal(s.root.dataset.motion, 'off'); assert.equal(s.frames.size, 0);
  assert.ok(s.animations.every(a => a.cancelled));
  s.button.emit('click'); s.move(); assert.ok(s.frames.size);
  s.document.emit('keydown', { key: 'Tab' });
  assert.equal(s.frames.size, 0); assert.equal(s.frame.style.transform, '');
  s.move(); assert.equal(s.frames.size, 0);
  const before = s.animations.length; s.observer.enter(s.figure);
  assert.equal(s.animations.length, before, 'keyboard scrolling must not trigger reveals');
  s.document.emit('pointermove', { pointerType: 'mouse', movementX: 2 });
  s.move(); assert.ok(s.frames.size, 'deliberate mouse movement restores pointer feedback');
});

test('diagram sequence runs once and retains its authored resting transform', () => {
  const s = setup(); const before = s.animations.length;
  s.observer.enter(s.figure); s.observer.enter(s.figure);
  assert.equal(s.animations.length, before + 1);
  const last = s.animations.at(-1);
  assert.ok(last.keyframes[1].transform.includes(s.part.computedTransform));
  assert.equal(last.keyframes[1].opacity, 1);
  assert.equal(s.part.style.opacity, undefined, 'no hidden CSS state is needed to reveal content');
});

test('scroll, hidden tabs and system preference changes release animation work', () => {
  const s = setup(); s.move(); s.window.scrollY = 400; s.window.emit('scroll');
  assert.equal(s.header.dataset.scrolled, 'true'); assert.equal(s.frames.size, 0);
  s.move(); s.document.hidden = true; s.document.emit('visibilitychange');
  assert.equal(s.frames.size, 0); assert.ok(s.animations.every(a => a.cancelled));
  s.document.hidden = false; s.move();
  s.reducedMedia.matches = true; s.reducedMedia.emit('change');
  assert.equal(s.root.dataset.motion, 'off'); assert.equal(s.frames.size, 0);
});
