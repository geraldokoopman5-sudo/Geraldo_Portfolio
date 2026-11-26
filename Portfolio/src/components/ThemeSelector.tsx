import { useEffect, useRef, useState } from 'react'
import CircularCarousel from './CircularCarousel'
import { getTheme, themes } from '../data/themes'
import './ThemeSelector.css'

const carouselItems = themes.map(theme => ({
  src: theme.preview,
  alt: `${theme.name} colour palette preview`,
  title: theme.name,
  subtitle: `${theme.colours.length} colours`,
}))

export default function ThemeSelector({ currentThemeId, onApply, onClose }: {
  currentThemeId: string
  onApply: (id: string) => void
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const initialIndex = Math.max(0, themes.findIndex(theme => theme.id === currentThemeId))
  const [previewIndex, setPreviewIndex] = useState(initialIndex)
  const [navigation, setNavigation] = useState({ index: initialIndex, request: 0 })
  const preview = themes[previewIndex]
  const isCurrent = preview.id === currentThemeId

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function browse(index: number) {
    const wrappedIndex = (index + themes.length) % themes.length
    setNavigation(previous => ({ index: wrappedIndex, request: previous.request + 1 }))
  }

  return (
    <dialog
      ref={dialog}
      className="theme-dialog"
      aria-labelledby="theme-selector-title"
      aria-describedby="theme-selector-description"
      onCancel={onClose}
      onClose={event => { if (!event.currentTarget.open) onClose() }}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}
    >
      <div className="theme-selector">
        <div className="theme-toolbar">
          <span className="theme-eyebrow">Make yourself at home</span>
          <button className="theme-close" onClick={onClose} aria-label="Close theme selector" autoFocus>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <header className="theme-heading">
          <h2 id="theme-selector-title">A different perspective.</h2>
          <p id="theme-selector-description">One portfolio. Six colour palettes. Explore a look, then make it yours.</p>
        </header>
        <div className="theme-carousel-wrap">
          <CircularCarousel
            items={carouselItems}
            ariaLabel="Portfolio theme previews. Use Left and Right arrow keys to browse."
            navigation={navigation}
            preset="cylinder"
            intro="none"
            cardWidth={240}
            aspectRatio={0.8}
            gap={32}
            curve={0.3}
            tilt={-8}
            autoplay="off"
            parallax={0}
            stretch={0}
            momentum={0.25}
            depthFade={0.3}
            fadeColor={getTheme(currentThemeId).roles.dark}
            innerShade={0.85}
            cornerRadius={14}
            onChange={setPreviewIndex}
          />
        </div>
        <div className="theme-browse">
          <button className="theme-step" onClick={() => browse(previewIndex - 1)} aria-label="Previous theme">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
          </button>
          <p>Drag to explore <span aria-hidden="true">·</span> {previewIndex + 1} of {themes.length}</p>
          <button className="theme-step" onClick={() => browse(previewIndex + 1)} aria-label="Next theme">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
          </button>
        </div>
        <div className="theme-options" role="group" aria-label="Browse themes">
          {themes.map((theme, index) => (
            <button
              key={theme.id}
              className={`theme-option ${index === previewIndex ? 'is-previewed' : ''}`}
              onClick={() => browse(index)}
              aria-pressed={index === previewIndex}
              aria-label={`${theme.name}: ${theme.id === currentThemeId ? 'current theme' : 'available'}`}
            >
              {theme.name}
              <span>{theme.id === currentThemeId ? 'Current' : 'Available'}</span>
            </button>
          ))}
        </div>
        <div className="theme-details" aria-live="polite" aria-atomic="true">
          <div>
            <span className="theme-eyebrow">{isCurrent ? 'Your current look' : 'Find your next look'}</span>
            <h3>{preview.name}</h3>
            <p>{preview.description}</p>
          </div>
          <button className="theme-apply" onClick={() => onApply(preview.id)} disabled={isCurrent}>
            {isCurrent ? 'Active theme' : `Use ${preview.name}`}
          </button>
        </div>
        <ul className="theme-swatches" aria-label={`${preview.name} colours`}>
          {preview.colours.map(colour => (
            <li key={colour.name}>
              <span className="theme-swatch" style={{ backgroundColor: colour.hex }} aria-hidden="true" />
              <span>{colour.name}<span className="theme-swatch-code">{colour.hex}{colour.approximate ? ' · Approx.' : ''}</span></span>
            </li>
          ))}
        </ul>
        {preview.colours.some(colour => colour.approximate) && <p className="theme-colour-note">Approximate shades can be refined when an exact reference is available.</p>}
      </div>
    </dialog>
  )
}
