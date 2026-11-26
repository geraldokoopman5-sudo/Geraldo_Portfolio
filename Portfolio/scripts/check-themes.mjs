import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { applyTheme, contrastRatio, getTheme, readSavedTheme, themes, themeVariables, THEME_STORAGE_KEY } from '../src/data/themes.ts'

assert.equal(themes.length, 6, 'Original plus five new palettes')
assert.equal(new Set(themes.map(theme => theme.id)).size, 6, 'Each palette has a stable unique ID')
assert.deepEqual(themes.map(theme => theme.colours.length), [5, 5, 5, 5, 6, 5], 'Keep all six colours in Cedar & Hearth')
assert.ok(themes.every(theme => theme.available), 'Every named palette is selectable')

const styles = new Map()
const storage = new Map()
const meta = new Map()
globalThis.window = { localStorage: {
  getItem: key => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
} }
globalThis.document = {
  documentElement: { style: { setProperty: (key, value) => styles.set(key, value) }, dataset: {} },
  querySelector: selector => selector === 'meta[name="theme-color"]' ? { setAttribute: (key, value) => meta.set(key, value) } : null,
}

for (const theme of themes) {
  assert.ok(existsSync('public' + theme.preview), 'Local preview exists: ' + theme.preview)
  for (const colour of theme.colours) assert.match(colour.hex, /^#[0-9A-F]{6}$/)
  const vars = themeVariables(theme)
  const pairs = [
    [theme.roles.dark, theme.roles.light, 'body text'],
    [vars['--on-light-muted'], theme.roles.light, 'secondary body text'],
    [vars['--on-hero'], vars['--hero'], 'hero text'],
    [vars['--on-dark-muted'], theme.roles.dark, 'secondary text on dark surfaces'],
    [vars['--on-soft'], vars['--soft-surface'], 'soft buttons and next-project text'],
    [theme.roles.light, theme.roles.strong, 'primary buttons'],
  ]
  for (const [text, background, role] of pairs) {
    const contrast = contrastRatio(text, background)
    assert.ok(contrast >= 4.5, theme.name + ': ' + role + ' contrast ' + contrast.toFixed(2))
  }
  applyTheme(theme.id)
  assert.equal(document.documentElement.dataset.theme, theme.id, 'Applying changes the document theme')
  assert.equal(styles.get('--hero'), theme.roles.hero ?? theme.roles.strong, 'Hero follows the chosen palette')
  assert.equal(meta.get('content'), styles.get('--hero'), 'Browser theme colour follows the palette')
  assert.equal(storage.get(THEME_STORAGE_KEY), theme.id, 'Selection is saved')
  assert.equal(readSavedTheme(), theme.id, 'Reload restores the chosen palette')
}

storage.set(THEME_STORAGE_KEY, 'missing-theme')
assert.equal(readSavedTheme(), 'original', 'Invalid saved themes recover to Original')
assert.equal(getTheme(null).id, 'original')
window.localStorage.getItem = () => { throw new Error('Storage blocked') }
window.localStorage.setItem = () => { throw new Error('Storage blocked') }
assert.equal(readSavedTheme(), 'original', 'Blocked storage does not break startup')
assert.doesNotThrow(() => applyTheme('blue-hour'), 'Themes still apply with storage blocked')
assert.equal(document.documentElement.dataset.theme, 'blue-hour')
delete globalThis.window
delete globalThis.document

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { default: ThemeSelector } = await server.ssrLoadModule('/src/components/ThemeSelector.tsx')
  for (const theme of themes) {
    const markup = renderToStaticMarkup(createElement(ThemeSelector, {
      currentThemeId: theme.id, onApply() {}, onClose() {},
    }))
    assert.equal((markup.match(/aria-roledescription="slide"/g) ?? []).length, 6)
    assert.equal((markup.match(/: current theme"/g) ?? []).length, 1, 'Exactly one theme is marked current')
    assert.equal((markup.match(/: available"/g) ?? []).length, 5, 'Five other palettes are available')
    assert.ok(markup.includes(theme.name.replaceAll('&', '&amp;') + ': current theme'))
    assert.match(markup, /Active theme/)
    assert.doesNotMatch(markup, /Coming soon/)
    for (const colour of theme.colours) assert.ok(markup.includes(colour.hex), 'Selected palette exposes its hex codes')
  }
} finally {
  await server.close()
}

console.log('Theme checks passed: all six palettes, text contrast, application, persistence, storage recovery, current-state rendering and colour swatches.')
