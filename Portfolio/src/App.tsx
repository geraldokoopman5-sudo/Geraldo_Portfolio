import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { portfolio, projects, technologyColors } from './data/content'
import type { Project } from './data/content'
import './App.css'

function Lines({ lines }: { lines: string[] }) {
  return <>{lines.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</>
}

function Globe({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="16" /><ellipse cx="20" cy="20" rx="7" ry="16" /><path d="M4 20h32M7 11h26M7 29h26" /></svg>
}

function SafeImage({ src, alt, className = '', eager = false, portrait = false }: { src: string; alt: string; className?: string; eager?: boolean; portrait?: boolean }) {
  return <img className={className} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={event => {
    const img = event.currentTarget
    const fallback = portrait ? '/images/portrait-fallback.svg' : '/images/project-fallback.svg'
    if (!img.src.endsWith(fallback)) img.src = fallback
  }} />
}

function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  function move(event: MouseEvent<HTMLDivElement>) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const box = event.currentTarget.getBoundingClientRect()
    ref.current?.style.setProperty('--mx', `${(event.clientX - box.left - box.width / 2) * .16}px`)
    ref.current?.style.setProperty('--my', `${(event.clientY - box.top - box.height / 2) * .16}px`)
  }
  return <div ref={ref} className={`magnetic ${className}`} onMouseMove={move} onMouseLeave={() => { ref.current?.style.setProperty('--mx', '0px'); ref.current?.style.setProperty('--my', '0px') }}>{children}</div>
}

function CircleLink({ href, children, accent = false }: { href: string; children: ReactNode; accent?: boolean }) {
  return <Magnetic><a className={`circle-button ${accent ? 'accent' : ''}`} href={href}><span>{children}</span></a></Magnetic>
}

function Navigation() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!open) return
    navRef.current?.querySelector('a')?.focus()
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() } }
    const closeOnDesktop = () => { if (window.innerWidth > 700) setOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktop)
    return () => { document.removeEventListener('keydown', closeOnEscape); window.removeEventListener('resize', closeOnDesktop) }
  }, [open])
  return <header className="header">
    <a className="wordmark" href="#home" aria-label={`${portfolio.name}, home`}><span className="wordmark-symbol" aria-hidden="true">gk.</span><span className="wordmark-name">{portfolio.name}</span></a>
    <button ref={menuButton} className={`menu-toggle ${open ? 'is-open' : ''}`} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><span>{open ? 'Close' : 'Menu'}</span><i aria-hidden="true" /></button>
    <nav ref={navRef} id="main-navigation" aria-label="Main navigation" className={open ? 'is-open' : ''}>
      {['Work', 'About', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}
      <span className="menu-caption">{portfolio.location.city}, {portfolio.location.country}</span>
    </nav>
  </header>
}

function Hero() {
  const [paused, setPaused] = useState(false)
  return <section className="hero" id="home" aria-label={`${portfolio.name}, ${portfolio.role}`}>
    <Navigation />
    <div className="hero-topline"><span><Lines lines={portfolio.copy.heroTagline} /></span><span>Portfolio / {portfolio.edition}</span></div>
    <div className="portrait-wrap"><SafeImage src={portfolio.portrait.src} alt={portfolio.portrait.alt} className="hero-portrait" eager portrait /></div>
    <div className="location-badge"><span>Based in {portfolio.location.city},<br />{portfolio.location.country}.</span><Globe /></div>
    <div className="hero-role"><span className="role-mark" aria-hidden="true">✳</span><p>{portfolio.role.split(' ')[0]}<br />{portfolio.role.split(' ').slice(1).join(' ')}</p></div>
    <h1 className="sr-only">{portfolio.name} — {portfolio.role}</h1>
    <div className={`name-marquee ${paused ? 'is-paused' : ''}`} aria-hidden="true"><div className="marquee-track">{[0, 1].map(copy => <span className="marquee-name" key={copy}>{portfolio.name}<span className="marquee-separator">—</span></span>)}</div></div>
    <div className="static-name" aria-hidden="true">{portfolio.name.split(' ')[0]}<br />{portfolio.name.split(' ').slice(1).join(' ')}</div>
    <div className="hero-bottom"><a href="#intro" className="scroll-link"><span className="scroll-line" aria-hidden="true" />Scroll to explore</a><span className="portrait-credit">{portfolio.portrait.caption}</span><button className="motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Play name motion' : 'Pause name motion'}<span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button></div>
  </section>
}

function Introduction() {
  return <section className="intro section-shell" id="intro"><div className="section-label reveal">{portfolio.copy.introductionLabel}</div><div className="intro-layout"><h2 className="reveal">{portfolio.introduction}</h2><div className="intro-aside reveal"><p>{portfolio.description}</p><CircleLink href="#about">About me</CircleLink></div></div></section>
}

function SelectedWork({ onSelect }: { onSelect: (project: Project) => void }) {
  const [hovered, setHovered] = useState<Project | null>(null)
  const section = useRef<HTMLElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  function follow(event: MouseEvent<HTMLElement>) {
    const box = section.current?.getBoundingClientRect()
    if (!box || !preview.current) return
    const width = preview.current.offsetWidth
    const height = preview.current.offsetHeight
    const x = Math.max(width / 2 + 12, Math.min(event.clientX - box.left, box.width - width / 2 - 12))
    const y = Math.max(height / 2, Math.min(event.clientY - box.top, box.height - height / 2))
    preview.current.style.left = `${x}px`
    preview.current.style.top = `${y}px`
  }
  return <section ref={section} className="work section-shell" id="work" onMouseMove={follow} onMouseLeave={() => setHovered(null)}>
    <div className="work-heading reveal"><div><span className="section-label">{portfolio.copy.workLabel}</span><h2><Lines lines={portfolio.copy.workHeading} /></h2></div><p>{portfolio.copy.workDescription[0]}<br /><span>{portfolio.copy.workDescription[1]}</span></p></div>
    <div className="work-columns" aria-hidden="true"><span>Project</span><span>Discipline</span><span>Year</span></div>
    <div className="project-list">{projects.map(project => <article key={project.id} className="project-entry"><button className="project-row reveal" aria-haspopup="dialog" onMouseEnter={() => setHovered(project)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(null)} onClick={() => { setHovered(null); onSelect(project) }}>
      <div className="mobile-preview" style={{ '--project-color': project.color } as CSSProperties}><SafeImage src={project.image} alt={project.imageAlt ?? `${project.name} — concept screenshot placeholder`} /><span className="mobile-view">View project <span aria-hidden="true">+</span></span></div>
      <div className="project-title"><h3>{project.name}</h3><p>{project.description}</p></div><span className="project-category">{project.category}</span><span className="project-year">{project.year}</span><span className="project-plus" aria-hidden="true">+</span>
    </button>{project.demoUrl && <div className="project-live-strip"><LiveProjectLink href={project.demoUrl} compact /></div>}</article>)}</div>
    <div ref={preview} className={`floating-preview ${hovered ? 'is-visible' : ''}`} aria-hidden="true" style={{ backgroundColor: hovered?.color }}><SafeImage src={hovered?.image ?? projects[0].image} alt="" eager /><span className="preview-view">View</span></div>
    <p className="work-note">{portfolio.copy.workNote}</p>
  </section>
}

function About() {
  return <section id="about" className="about section-shell"><div className="about-heading reveal"><span className="section-label">{portfolio.copy.aboutLabel}</span><Globe /><h2><Lines lines={portfolio.copy.aboutHeading} /></h2></div><div className="about-content reveal"><div><span className="section-label">About {portfolio.name.split(' ')[0]}</span><p className="bio">{portfolio.biography}</p></div><div className="tech-block"><span className="section-label">{portfolio.copy.technologiesLabel}</span><ul>{portfolio.technologies.map(tech => <li key={tech} style={{ '--tech-accent': technologyColors[tech]?.accent ?? 'var(--accent)', '--tech-text': technologyColors[tech]?.text ?? 'var(--accent)' } as CSSProperties}>{tech}</li>)}</ul></div></div></section>
}

function Destination({ label, href, detail }: { label: string; href: string | null; detail?: string }) {
  return href ? <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer"><span>{label}</span>{detail && <span className="destination-detail">{detail}</span>}</a> : <span className="placeholder-link" aria-disabled="true">{label}<span>{detail ?? 'To be added'}</span></span>
}

function LiveProjectLink({ href, compact = false }: { href: string; compact?: boolean }) {
  return <a className={`live-project-link ${compact ? 'is-compact' : ''}`} href={href} target="_blank" rel="noopener noreferrer" aria-label="Visit live site (opens in a new tab)"><span className="live-link-icon"><Globe /></span><span className="live-link-copy"><span>Visit live site</span>{!compact && <span className="live-link-domain">{new URL(href).hostname}</span>}</span><span className="live-link-badge" aria-hidden="true">LIVE</span></a>
}

function ProjectImages({ project }: { project: Project }) {
  const images = project.screenshots?.length ? project.screenshots : [{ src: project.image, alt: project.imageAlt ?? `${project.name} concept screenshot, placeholder interface`, caption: project.imageCaption ?? 'Concept screenshot · Replace with actual project imagery' }]
  return <div className={`project-gallery ${images.length > 1 ? 'has-screenshots' : ''}`}>{images.map((image, index) => <figure key={image.src} className="panel-image" style={{ backgroundColor: project.color }}><SafeImage src={image.src} alt={image.alt} eager={index === 0} /><figcaption>{image.caption}</figcaption></figure>)}</div>
}

function Contact() {
  return <footer id="contact" className="contact"><div className="section-shell"><div className="contact-top reveal"><span className="section-label">{portfolio.copy.contactLabel}</span><span>{portfolio.location.city}, {portfolio.location.country}</span></div><h2 className="contact-title reveal"><Lines lines={portfolio.copy.contactHeading} /><span className="contact-period">.</span></h2><div className="contact-rule"><div /><CircleLink accent href="#contact-details">Get in touch</CircleLink></div><div className="contact-details" id="contact-details" tabIndex={-1}><p>{portfolio.copy.contactDescription}</p><div className="contact-links">{portfolio.links.map(link => <Destination key={link.label} {...link} />)}</div></div><div className="footer-bottom"><a href="#home" className="footer-signature">gk.</a><span>{portfolio.edition} {portfolio.name}</span><span>{portfolio.copy.footerNote}</span><a href="#home">Back to top</a></div></div></footer>
}

function ProjectPanel({ project, onClose, onNext }: { project: Project | null; onClose: () => void; onNext: (project: Project) => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const scrollArea = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (project && !element.open) element.showModal()
    if (project) document.body.style.overflow = 'hidden'
    if (!project && element.open) element.close()
    if (project) { scrollArea.current?.scrollTo({ top: 0 }); closeButton.current?.focus() }
    return () => { document.body.style.overflow = '' }
  }, [project])
  const next = project ? projects[(projects.findIndex(p => p.id === project.id) + 1) % projects.length] : projects[0]
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-panel-title" onCancel={onClose} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}><div ref={scrollArea} className="panel-scroll">{project && <>
    <div className="panel-toolbar"><span className="section-label">Project preview / {project.demoUrl ? 'Live application' : project.technologiesVerified ? 'Project details' : 'Demo entry'}</span><button ref={closeButton} className="close-button" onClick={onClose} aria-label="Close project details"><span>Close</span><span aria-hidden="true">×</span></button></div>
    <div className="panel-heading"><span>{project.category} <span className="panel-dot">/</span> {project.year}</span><h2 id="project-panel-title">{project.name}</h2></div>
    {project.demoUrl && <div className="live-project-banner"><div><span className="section-label">Take it for a spin</span><p>Explore {project.name} in the browser.</p></div><Magnetic><LiveProjectLink href={project.demoUrl} /></Magnetic></div>}
    <ProjectImages project={project} />
    <div className="panel-content"><div><h3>The project</h3><p>{project.summary}</p><h3>{project.contributionLabel ?? 'My contribution'}</h3><p>{project.contribution}</p></div><div><h3>Technologies used</h3>{!project.technologiesVerified && <p className="placeholder-note">Proposed placeholder stack</p>}<ul className="panel-tech">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>{!project.demoUrl && <div className="panel-links"><Destination label="Live demo" href={null} /></div>}</div></div>
    <button className="next-project" onClick={() => onNext(next)}><span className="section-label">Next project</span><span>{next.name}</span><span aria-hidden="true">+</span></button>
  </>}</div></dialog>
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target) } }), { threshold: .08 })
    elements.forEach(element => { element.classList.add('will-reveal'); observer.observe(element) })
    return () => observer.disconnect()
  }, [])
  return <><a className="skip-link" href="#work">Skip to selected work</a><main><Hero /><Introduction /><SelectedWork onSelect={setSelectedProject} /><About /></main><Contact /><ProjectPanel project={selectedProject} onClose={() => setSelectedProject(null)} onNext={setSelectedProject} /></>
}

export default App
