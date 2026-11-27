export interface ThemeColour {
  name: string
  hex: string
  approximate?: boolean
}

export interface PortfolioTheme {
  id: string
  name: string
  description: string
  preview: string
  available: boolean
  colours: ThemeColour[]
  roles: { dark: string; light: string; soft: string; strong: string; mid: string; hero?: string }
}

// Named matches: https://github.com/meodai/color-names
// Mist is an explicit approximation because that name has no unique match
// in that reference. Values remain editable here.
// "river stix" and "amber autum" are normalised to River Styx and Amber Autumn.
export const themes: PortfolioTheme[] = [
  {
    "id": "original",
    "name": "Original",
    "description": "Soft heather and deep plum. The original portfolio palette.",
    "colours": [
      {
        "name": "Back in Black",
        "hex": "#1B151F"
      },
      {
        "name": "Mountain Heather",
        "hex": "#EEDAE6"
      },
      {
        "name": "Decanting",
        "hex": "#BFA1AD"
      },
      {
        "name": "Funkie Friday",
        "hex": "#4A3C4A"
      },
      {
        "name": "Moonscape",
        "hex": "#806B77"
      }
    ],
    "roles": {
      "dark": "#1B151F",
      "light": "#EEDAE6",
      "soft": "#BFA1AD",
      "strong": "#4A3C4A",
      "mid": "#806B77"
    },
    "available": true,
    "preview": "/images/themes/original.svg"
  },
  {
    "id": "wine-mist",
    "name": "Wine & Mist",
    "description": "Black, plum and wine, balanced with soft mist and white.",
    "colours": [
      {
        "name": "Black",
        "hex": "#000000"
      },
      {
        "name": "Plum",
        "hex": "#66386A"
      },
      {
        "name": "Wine",
        "hex": "#80013F"
      },
      {
        "name": "Mist",
        "hex": "#D1D1D1",
        "approximate": true
      },
      {
        "name": "White",
        "hex": "#FFFFFF"
      }
    ],
    "roles": {
      "dark": "#000000",
      "light": "#FFFFFF",
      "soft": "#D1D1D1",
      "strong": "#66386A",
      "mid": "#80013F"
    },
    "available": true,
    "preview": "/images/themes/wine-mist.svg"
  },
  {
    "id": "amber-timber",
    "name": "Amber & Timber",
    "description": "River Styx and carbon fibre meet warm tea, timber and autumn amber.",
    "colours": [
      {
        "name": "River Styx",
        "hex": "#161820"
      },
      {
        "name": "Carbon Fibre",
        "hex": "#2E2E2E"
      },
      {
        "name": "Afternoon Tea",
        "hex": "#594E40"
      },
      {
        "name": "Tanned Wood",
        "hex": "#8F6E4B"
      },
      {
        "name": "Amber Autumn",
        "hex": "#C69C6A"
      }
    ],
    "roles": {
      "dark": "#161820",
      "light": "#C69C6A",
      "soft": "#8F6E4B",
      "strong": "#2E2E2E",
      "mid": "#594E40"
    },
    "available": true,
    "preview": "/images/themes/amber-timber.svg"
  },
  {
    "id": "dynamite-stout",
    "name": "Dynamite & Stout",
    "description": "Dynamite red and deep stout, layered with rich reds, mimolette orange and golden artichoke heart.",
    "colours": [
      {
        "name": "Dynamite Red",
        "hex": "#DD3311"
      },
      {
        "name": "Stout",
        "hex": "#0F0B0A"
      },
      {
        "name": "Jack and Coke",
        "hex": "#920F0E"
      },
      {
        "name": "Vampiric Council",
        "hex": "#5C0C0C"
      },
      {
        "name": "Mimolette Orange",
        "hex": "#EE8811"
      },
      {
        "name": "Artichoke Heart",
        "hex": "#E4D588"
      }
    ],
    "roles": {
      "dark": "#0F0B0A",
      "light": "#E4D588",
      "soft": "#EE8811",
      "strong": "#5C0C0C",
      "mid": "#DD3311",
      "hero": "#920F0E"
    },
    "available": true,
    "preview": "/images/themes/dynamite-stout.svg"
  },
  {
    "id": "cedar-hearth",
    "name": "Cedar & Hearth",
    "description": "Six colours: deep cedar, warm winter white and hearth, with slate-blue accents.",
    "colours": [
      {
        "name": "Crow",
        "hex": "#180614"
      },
      {
        "name": "Bleached Cedar",
        "hex": "#2C2133"
      },
      {
        "name": "Winter White",
        "hex": "#F5ECD2"
      },
      {
        "name": "Diplomatic",
        "hex": "#3A445D"
      },
      {
        "name": "Hearth",
        "hex": "#E1CCA6"
      },
      {
        "name": "Bay Wharf",
        "hex": "#747F89"
      }
    ],
    "roles": {
      "dark": "#180614",
      "light": "#F5ECD2",
      "soft": "#E1CCA6",
      "strong": "#3A445D",
      "mid": "#747F89",
      "hero": "#2C2133"
    },
    "available": true,
    "preview": "/images/themes/cedar-hearth.svg"
  },
  {
    "id": "ember-eclipse",
    "name": "Ember & Eclipse",
    "description": "Charcoal and eclipse blue, warmed by deep red, peach and creamy white.",
    "colours": [
      {
        "name": "Closed Shutter",
        "hex": "#25252C"
      },
      {
        "name": "Jack and Coke",
        "hex": "#920F0E"
      },
      {
        "name": "Fatback",
        "hex": "#FFF7ED"
      },
      {
        "name": "Peach Orange",
        "hex": "#FFCC99"
      },
      {
        "name": "Dark Eclipse",
        "hex": "#112244"
      }
    ],
    "roles": {
      "dark": "#25252C",
      "light": "#FFF7ED",
      "soft": "#FFCC99",
      "strong": "#920F0E",
      "mid": "#112244",
      "hero": "#112244"
    },
    "available": true,
    "preview": "/images/themes/ember-eclipse.svg"
  }
]

export const THEME_STORAGE_KEY = 'geraldo-portfolio-theme'

export function getTheme(id: string | null): PortfolioTheme {
  const currentId = id === 'blue-hour' ? 'dynamite-stout' : id
  return themes.find(theme => theme.id === currentId && theme.available) ?? themes[0]
}

export function readSavedTheme(): string {
  try {
    return getTheme(window.localStorage.getItem(THEME_STORAGE_KEY)).id
  } catch {
    return themes[0].id
  }
}

export function contrastRatio(first: string, second: string): number {
  const luminance = (hex: string) => {
    const channels = [1, 3, 5].map(index => {
      const channel = parseInt(hex.slice(index, index + 2), 16) / 255
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    })
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  }
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

function readableColour(background: string, preferred: string, alternatives: string[]): string {
  if (contrastRatio(background, preferred) >= 4.5) return preferred
  return alternatives.reduce((best, colour) =>
    contrastRatio(background, colour) > contrastRatio(background, best) ? colour : best, preferred)
}

export function themeVariables(theme: PortfolioTheme): Record<string, string> {
  const { dark, light, soft, strong, mid, hero = strong } = theme.roles
  const palette = theme.colours.map(colour => colour.hex)
  const softText = readableColour(soft, dark, palette)
  const softSurface = contrastRatio(soft, softText) >= 4.5 ? soft : light
  return {
    '--back-in-black': dark,
    '--mountain-heather': light,
    '--decanting': soft,
    '--funkie-friday': strong,
    '--moonscape': mid,
    '--hero': hero,
    '--on-hero': readableColour(hero, light, palette),
    '--on-dark-muted': readableColour(dark, soft, palette),
    '--soft-surface': softSurface,
    '--on-soft': readableColour(softSurface, dark, palette),
    '--on-light-muted': readableColour(light, strong, palette),
    '--on-mid': readableColour(mid, light, palette),
    '--dark-border': readableColour(dark, mid, palette),
  }
}

export function applyTheme(id: string): void {
  const theme = getTheme(id)
  const root = document.documentElement
  for (const [property, value] of Object.entries(themeVariables(theme))) root.style.setProperty(property, value)
  root.dataset.theme = theme.id
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.roles.hero ?? theme.roles.strong)
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme.id)
  } catch {
    // The theme still works for this visit if browser storage is unavailable.
  }
}

