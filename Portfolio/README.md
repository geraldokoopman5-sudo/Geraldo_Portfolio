# Geraldo Koopman — portfolio demo

A frontend-only portfolio built with React, TypeScript and CSS, using the existing Vite starter. No backend, accounts, forms service or database is required.

## Run locally

Requires Node.js 22.12+ (Node.js 24 recommended).

```sh
cd Portfolio
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.
In Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

```sh
npm run build
npm run preview
```

The production build is written to `dist/` and can be served by any static host.

## Personalise

- Edit `src/data/content.ts` for the name, portrait path, introduction, biography, technology list, projects, years and contact destinations.
- Replace `public/images/portrait.png` with your own transparent portrait. The existing portrait is an AI-generated fictional model, explicitly labelled as a placeholder.
- Replace the three `*-preview.svg` concept screens with real project screenshots, then update their paths in the data file. Original demo screens can be regenerated with `node scripts/create-demo-assets.mjs`.
- Replace `Year — TBD`, placeholder summaries, contributions and proposed stacks with verified project details.
- Set `demoUrl`, `sourceUrl` and contact `href` values to real destinations. `null` displays a disabled, clearly labelled placeholder. For email use `mailto:you@example.com`; for the CV use a real document path or URL.
- Layout and motion styles are in `src/App.css`; global styles are in `src/index.css`.
- G-Stock links to `https://g-stock-eight.vercel.app/` from its work row and project panel. Its preview remains explicitly illustrative because screenshot capture was interrupted before the live application finished restoring its session. Add actual screenshots to its `screenshots` array as `{ src, alt, caption }` entries and set `image` to the preferred cover screenshot; the project panel renders the supplied gallery automatically.

## Interactions and accessibility

Desktop project previews follow the pointer within the work section. Touch devices and mobile layouts show previews inline. Project buttons open native modal dialogs with keyboard focus containment, Escape dismissal, explicit Close controls, backdrop dismissal and next-project navigation. Section links use native smooth scrolling. The mobile navigation supports Escape and returns focus to its button.

Reduced-motion users get a static, readable name, inline project previews, instant section navigation and no reveal or magnetic animations. Other users can pause the desktop name marquee. Images have local fallbacks and all assets ship with the site; there are no remote image dependencies.

## Design and assets

The reference https://dennissnellenberg.com/ was inspected for composition, typography and spacing. This implementation uses original copy, code, concept screens and a fictional portrait; no reference-site assets are included.

The portrait was created with the built-in image-generation tool. Prompt: “Original fictional male model, late twenties, medium brown skin, short dark curly hair and subtle stubble; charcoal crewneck sweater, relaxed standing pose with hands loosely together, softly desaturated editorial studio lighting, head to upper thighs, transparent background, no text or logos.” The full production prompt is recorded in `public/images/portrait-prompt.txt`.

## Verification

- TypeScript compilation and Vite production build.
- Local HTTP readiness and static asset checks.
- React initial-render smoke check, section target validation and local SVG validation.
- Browser-based desktop/mobile visual QA was interrupted when Computer Use was stopped with Escape. Those visual checks still need to be performed.
- The private hosted preview could not be uploaded because the environment cannot connect to the Sites source repository. Local development and the static production build are complete.

Suggested review: 1440px desktop, 768px tablet, and 390px/320px mobile; open each project; use Next, Escape and keyboard Tab; test the mobile menu and reduced-motion preference; check the footer and image fallback paths.

## Theme selector

Use **Themes** in the main navigation (inside Menu on mobile) to open the circular theme gallery. Choose Original, Wine & Mist, Amber & Timber, Blue Hour, Cedar & Hearth, or Ember & Eclipse, then use the activation button to apply it. Browsing a card previews its palette without applying it. Selections are saved in browser storage and restored on the next visit; invalid or blocked storage falls back safely to Original.

The gallery uses the [React Bits Circular Carousel](https://reactbits.dev/components/circular-carousel), with drag, keyboard, previous/next and direct preview controls. The dialog supports Escape, backdrop dismissal, focus containment and background scroll locking. Reduced-motion navigation skips the carousel's spring animation, and autoplay is off.

Theme colours, surface roles, contrast helpers and persistence live in `src/data/themes.ts`; matching local SVG previews live in `public/images/themes/`. Each palette shows its colour names and hex codes in the selector. Cedar & Hearth preserves all six requested colours. Most hex codes match the [meodai colour-name reference](https://github.com/meodai/color-names); Mist (`#D1D1D1`), Dusk Blue (`#26538D`) and Deep Navy (`#14213D`) are explicitly labelled approximations. River Styx and Amber Autumn normalise the supplied spellings.

Text roles choose a readable colour from each palette. If a soft surface has insufficient text contrast, buttons use the lighter palette colour instead. Original remains the default. Run `npm run test:themes` with Node.js 24 to check palette completeness, text contrast, theme application, saved selections, blocked storage and selector rendering.

The carousel source and styles are in `src/components/CircularCarousel.*`, with the upstream license retained in `src/components/REACT-BITS-LICENSE.md`. Local adaptations add navigation requests, an accessible label, commit-phase ref updates and reduced-motion/idle handling. No new runtime dependencies are required.
