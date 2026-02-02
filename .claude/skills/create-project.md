# Create Project

Genererar ett komplett projekt för portfolion baserat på SignTalker-mallen. All projektdata finns i två filer.

## Usage

```
/create-project
```

## Hur det fungerar

Claude frågar efter projektinfo steg för steg och genererar sedan all data. Följ SignTalkers struktur som referens.

---

## Steg 1: Fråga användaren om grunddata

- **Project ID** (format: `namn`, t.ex. `signtalker`)
- **Projektnamn** (t.ex. `SignTalker`)
- **År** (t.ex. `2024 – 2025`)
- **Tagline** (kort mening, visas under titeln)
- **Plattformar** (t.ex. Apple Watch, iPhone, Webb, Raspberry Pi)
- **Tech stack** (t.ex. Swift, Core ML, Python, React)
- **GitHub URL**
- **Demo URL** (valfritt)
- **Thesis URL** (valfritt)

---

## Steg 2: README-sektion (description)

Fråga användaren om projektets beskrivning. Ska innehålla:

1. **Problemet** – Vad löser projektet? Varför behövs det?
2. **Lösningen** – Vad gör appen/systemet? Hur fungerar det för användaren?
3. **Det unika** – Vad behövs/behövs inte? Vad skiljer det från andra lösningar?
4. **Bakgrund** (valfritt) – Hur startade projektet?

Skriv i löpande text, personligt och tydligt. Använd `\n\n` för att separera stycken.

---

## Steg 3: result.log-sektion

Fråga användaren om:

- **resultText** – En sammanfattande mening om hur det fungerar i praktiken
- **demoVideos** (valfritt) – YouTube-videor med titel och beskrivning:
  ```js
  { title: 'Titel', description: 'Kort beskrivning', url: 'https://www.youtube.com/embed/VIDEO_ID' }
  ```
- **techDetails** – Tekniska detaljer som bullet points. Varje detalj har en `label` och en `text`:
  ```js
  { label: 'Rubrik', text: 'Förklaring av hur det fungerar tekniskt.' }
  ```
  Bra exempel (från SignTalker): Träningsfas, 50 Hz motion sampling, Fixed-window segmentering, Haptisk feedback

---

## Steg 4: architecture.sys-sektion

Fråga användaren om systemets arkitektur. Ska innehålla:

- **subtitle** – Text som förklarar arkitekturen i 1-2 stycken
- **nodes** – Noder i diagrammet. Varje nod har:
  ```js
  { id: 'node-id', label: 'Visningsnamn', col: 0, row: 0 }
  ```
  `col` = kolumn (0 = vänster), `row` = rad (0 = topp). Placera logiskt: UI högst upp, logik i mitten, tjänster längst ner.

- **connections** – Pilar mellan noder:
  ```js
  { from: 'node-a', to: 'node-b', label: 'Vad som skickas' }
  ```
  Använd `\n` i label för radbrytning.

- **groups** – Grupper som ramar in noder:
  ```js
  { label: 'GRUPPNAMN', nodeIds: ['node-a', 'node-b'] }
  ```

**Tips:** Tänk lager: UI → Logik → Tjänster/Data. Grupper kan vara enheter (iPhone, Watch) eller moduler (Frontend, Backend).

---

## Steg 5: components.lib-sektion

Fråga användaren om projektets komponenter:

- **componentsText** – Introduktionstext (1-2 meningar)
- **components** – Grupperade per enhet/modul:
  ```js
  {
    group: 'Gruppnamn',
    items: [
      { name: 'KomponentNamn', type: 'ViewModel', responsibility: 'Vad den gör.' },
      { name: 'AnnanKomponent', type: 'Model', responsibility: 'Vad den gör.' }
    ]
  }
  ```
  Typer: `ViewModel`, `Model`, `Helper`, `Service`, `View`, `Controller`

---

## Steg 6: insights.dev-sektion

Fråga användaren om insikter. Delas i kategorier:

```js
insights: [
  {
    title: 'Begränsningar',
    items: [
      { label: 'Rubrik', text: 'Beskrivning av begränsningen och varför den finns.' }
    ]
  },
  {
    title: 'Fortsatt utveckling',
    items: [
      { label: 'Rubrik', text: 'Vad som skulle kunna förbättras och hur.' }
    ]
  }
]
```

Bra kategorier: Begränsningar, Fortsatt utveckling, Lärdomar, Designbeslut

---

## Steg 7: links.url-sektion

Samlas från grunddata:
- `github` – GitHub-repo
- `demo` – Demo-URL (null om ingen)
- `thesis` – Thesis/rapport (null om ingen)

---

## Steg 8: Workflow (result.log pipeline)

Fråga användaren om projektets flöde steg för steg:

```js
hasWorkflow: true,
workflow: [
  { step: 1, icon: '🔧', title: 'STEG TITEL', description: 'Vad som händer', details: 'Teknisk detalj', ledColor: 'blue' },
  { step: 2, icon: '⚙️', title: 'STEG TITEL', description: 'Vad som händer', details: 'Teknisk detalj', ledColor: 'green' }
]
```

LED-färger: `blue` (input/start), `yellow` (bearbetning), `green` (resultat/klart)

---

## Infoga i koden

### Fil 1: `src/pages/Projects/Projects.js`

Lägg till i `projects`-arrayen:

```js
{
  id: '{id}',
  name: '{name}',
  year: '{year}',
  platform: '{platform}',
  tech: '{main-tech}',
  description: '{tagline}',
  shortDescription: '{tagline}',
  techStack: ['{tech1}', '{tech2}'],
  github: '{github-url}',
  demo: null,
  connectedTo: ['signtalker']  // justera koppling
}
```

Lägg även till en position i `SCATTER_POSITIONS`-arrayen.

### Fil 2: `src/pages/ProjectDetail/ProjectDetail.js`

Lägg till i `projects`-objektet med alla sektioner från steg 1-8:

```js
'{id}': {
  id: '{id}',
  model: 'GENERIC MODEL',
  label: '{UPPERCASE-LABEL}',
  name: '{name}',
  year: '{year}',
  capacity: '1.0 GB',
  interface: 'SATA',
  status: 'OPERATIONAL',
  ledColor: 'brown',        // brown, medium, burgundy
  accentColor: 'terracotta', // terracotta, rose
  tagline: '{tagline}',
  description: '{description}',
  platforms: ['{platform1}', '{platform2}'],
  techStack: ['{tech1}', '{tech2}'],
  architecture: { nodes: [...], connections: [...], groups: [...], subtitle: '...' },
  github: '{github-url}',
  demo: null,
  thesis: null,
  image: null,
  demoVideos: [...],
  resultText: '{resultText}',
  techDetails: [...],
  insights: [...],
  hasWorkflow: true,
  workflow: [...],
  componentsText: '{componentsText}',
  components: [...]
}
```

---

## Viktigt

- Följ SignTalkers struktur som referens – alla nya projekt ska ha samma upplägg
- `ledColor`: `brown`, `medium`, `burgundy`
- `accentColor`: `terracotta`, `rose`
- Position i `SCATTER_POSITIONS` bestämmer var noden visas i nätverket (x: 0-100, y: 0-100)
- Uppdatera `connectedTo` på befintliga projekt om det nya ska länkas
- Kör dev-servern efter insättning och verifiera att allt renderas korrekt
- Alla sektioner (architecture, components, insights) är valfria men rekommenderas
