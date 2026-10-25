# Fomi Atelier — AI Content Generation Studio

> Technical Assessment Submission for **Fomi**  
> **Live demo:** `https://<VERCEL_URL>`  
> **Repository:** `https://github.com/sadquain/fomi-atelier.git`

A production-quality, responsive web application implementing two complementary creative paradigms:
- **Part A (`/`)**: Consumer AI content generation studio inspired by [Fomi.art](https://fomi.art/), [Krea.ai](https://www.krea.ai/image), [Higgsfield.ai](https://higgsfield.ai/generate), and [OpenArt.ai](https://openart.ai/).
- **Part B (`/workspace`)**: Original professional studio redesign built around a **Directed Acyclic Graph (DAG) creative timeline**, persistent **Project Memory DNA**, interactive **swipe-curtain diffing**, and a **keyboard-first command palette**.

Built with **Next.js (App Router, JavaScript only)**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## ✦ Overview of Workspaces

### Part A: Consumer Generation Studio (`/`)
- **Top Bar**: Glowing logo mark, centered icon nav (Home, Image, Video, Edit, Folder) with coral active indicator, "Gallery" and "Support" modals, smooth theme toggle, and profile badge.
- **Floating History Strip**: Horizontally scrollable row of generations with item count, chevron scrollers, loading skeletons, and turn jumping.
- **Peach Generator Card**: Segmented Image/Video toggle, prompt textarea with random inspiration dice, coral `✦ Generate` action (`Ctrl+Enter` / `⌘+Enter`), model/ratio/batch selects, video trajectory controls, and collapsible **Advance** and **Styles** accordions.
- **Chat-Style Results Thread**: Soft pink-beige prompt cards, responsive multi-column image grid (portrait ~3:4 aspect ratio), video preview playback, full-screen lightbox modal, and accessible empty/error states with retry.

### Part B: Professional Studio & Creative Timeline (`/workspace`)
- **Branching Directed Acyclic Graph (DAG)**: Non-destructive visual lineage tree tracking every parent-child generation, prompt deltas, models, and seeds. Single-click branching (`F`), hero shot starring (`S`), and side-by-side parent comparison (`C`).
- **Interactive Swipe Curtain Diff (`C` / `3`)**: Pixel-level comparison with an interactive before/after curtain wipe slider (powered by CSS `clip-path`) and optional split-view layout.
- **Cinema Canvas View (`2`)**: Full-bleed hero viewport with zoom controls, asset downloading, and minimal prompt HUD. Supports both high-resolution imagery and video leaf nodes (`Wan 2.1 Video`).
- **Project Memory DNA Drawer (`M`)**: Persistent creative context remembering character references (Akira-01), cohesive palette tokens, cinematographic style anchors, and next-shot narrative suggestions.
- **Omni Command Palette (`⌘K` / `Ctrl+K`)**: Rapid keyboard execution to switch views, toggle hero shots, launch comparisons, randomize seeds, and fork variations without mouse interaction.

---

## 📁 Architecture & Folder Structure

```
fomi-atelier/
├── app/
│   ├── api/
│   │   ├── generate/route.js       # POST: Simulates latent diffusion latency & returns outputs
│   │   ├── generations/route.js    # GET: History generations stream
│   │   ├── models/route.js         # GET: Available diffusion & video model profiles
│   │   └── styles/route.js         # GET: Aesthetic style presets
│   ├── workspace/
│   │   └── page.js                 # Part B: Professional DAG Workspace coordinator
│   ├── globals.css                 # Warm design tokens, custom scrollbars, shimmer animation
│   ├── icon.svg                    # Vector brand favicon (coral "F" mark)
│   ├── layout.js                   # Plus Jakarta Sans, OpenGraph, Twitter, viewport config
│   └── page.js                     # Part A: Server Component rendering WorkspaceShell
├── components/
│   ├── layout/
│   │   ├── Header.jsx              # Brand mark, centered icon nav, pills, modals & theme toggle
│   │   ├── IconNav.jsx             # Centered icon suite with coral top indicator
│   │   ├── MobileTabBar.jsx        # Bottom tab bar for mobile viewports (<640px)
│   │   └── ThemeToggle.jsx         # Sun/Moon toggle with localStorage persistence
│   ├── history/
│   │   ├── HistoryStrip.jsx        # Floating rounded history bar with chevron scroll & skeletons
│   │   └── HistoryThumbnail.jsx    # Square next/image thumbnail with active ring & tooltip
│   ├── generator/
│   │   ├── GeneratorPanel.jsx      # Soft peach control card housing generator tools
│   │   ├── PromptInput.jsx         # Textarea with bottom-right anchored Generate button
│   │   ├── AdvanceAccordion.jsx    # Dynamically-loaded CFG, steps, seed, sampler controls
│   │   ├── StylesAccordion.jsx     # Visual style presets with gradient swatches
│   │   └── VideoControls.jsx       # Video duration, resolution, motion & camera path
│   ├── results/
│   │   ├── ResultsThread.jsx       # Stream feed orchestrating turns, skeletons, and modals
│   │   ├── GenerationTurn.jsx      # Prompt bubble with model chip & 4-col results grid
│   │   ├── ResultCard.jsx          # Media tile with next/image, hover actions & video loop
│   │   ├── SkeletonGrid.jsx        # Shimmering placeholder cards during synthesis
│   │   ├── LightboxModal.jsx       # Fullscreen next/image preview with arrow navigation
│   │   ├── EmptyState.jsx          # Warm empty state with prompt starter cards
│   │   └── ErrorState.jsx          # Accessible alert banner with retry trigger
│   ├── workspace/                  # Part B Professional Workspace Components
│   │   ├── CanvasView.jsx          # Cinema canvas with zoom & prompt HUD (image + video)
│   │   ├── CommandPalette.jsx      # Cmd+K fuzzy-search command palette
│   │   ├── CompareDiffView.jsx     # Interactive before/after wipe curtain & split diff
│   │   ├── FloatingPromptDock.jsx  # Collapsible bottom prompt dock with typing guards
│   │   ├── LineageGraph.jsx        # DAG tree visualization with prompt deltas & forks
│   │   ├── ProjectMemoryDrawer.jsx # Character DNA, palette tokens & shot recommendations
│   │   └── WorkspaceHeader.jsx     # Breadcrumb, project metadata, view toggle & DNA trigger
│   ├── workspace-shell/
│   │   └── WorkspaceShell.jsx      # Client Component isolating interactive state for Part A
│   └── ui/
│       ├── Accordion.jsx           # Accessible pill accordion with CSS grid height animation
│       ├── Badge.jsx               # Tag and model chip primitive
│       ├── Button.jsx              # Reusable button with variants and loading state
│       ├── IconButton.jsx          # Icon button with tooltip & micro-interactions
│       ├── Modal.jsx               # Accessible dialog with focus trap & Esc handler
│       ├── Select.jsx              # Compact dropdown with keyboard navigation
│       ├── Skeleton.jsx            # Base skeleton & card shimmer primitives
│       ├── Slider.jsx              # Accessible range slider with coral gradient fill
│       └── Toggle.jsx              # Segmented radio toggle & switch primitives
├── data/
│   ├── defaultPrompts.js           # Sample creative inspirations
│   ├── modelsData.js               # Diffusion models & aspect ratio configurations
│   ├── proProjectData.js           # Part B: Solaria DAG nodes, Akira DNA & video leaf
│   └── stylesData.js               # Visual style presets & modifiers
├── hooks/
│   ├── useGenerate.js              # Synthesis lifecycle, validation & optimistic skeletons
│   ├── useGenerations.js           # History management, API single-source of truth & retry
│   ├── useLocalStorage.js          # SSR-safe persisted storage hook
│   └── useMediaQuery.js            # Responsive breakpoint detection hook
├── lib/
│   ├── isTypingTarget.js           # Shared guard preventing shortcut hijacking during input
│   ├── mockData.js                 # 14 curated high-aesthetic generations with local media
│   └── utils.js                    # cn class merging, deterministic time formatting
└── public/
    └── media/
        ├── images/                 # 20 curated 3:4 portrait JPEG assets (portrait-01 to 20)
        └── videos/                 # 3 looping MP4 video clips & companion posters
```

---

## ⚡ Performance Engineering

1. **`next/image` Optimization**:
   - All legacy `<img>` tags replaced with `next/image`.
   - Utilizes `fill` inside relative responsive containers with explicit `sizes` tailored to mobile (2-col: `50vw`), tablet (3-col: `33vw`), desktop (4-col: `25vw`), and ultrawide (5-6 col: `18vw`).
   - `priority` flag restricted strictly to above-the-fold media (e.g., initial result turn and active canvas view) to maximize Largest Contentful Paint (LCP).
2. **Dynamic Imports (`next/dynamic`)**:
   - Complex, non-critical components such as `LightboxModal` and `AdvanceAccordion` are dynamically imported with SSR disabled, keeping the initial JS bundle lean.
3. **Memoization & Render Hygiene**:
   - Critical callbacks wrapped in `useCallback` to prevent unnecessary re-renders across the DAG tree and results stream.
   - Deterministic UTC string formatting prevents hydration mismatches and avoids redundant client re-computations during static prerendering.
4. **Local Asset Architecture**:
   - All imagery and video assets reside locally under `/media/...`, eliminating third-party CDN latency, rate-limiting, and broken hotlinks.

---

## 📐 Responsive Breakpoint Matrix

| Viewport | Breakpoint | Layout Adaptations |
| :--- | :--- | :--- |
| **Mobile** | `< 640px` | Top nav moves to an accessible **Bottom Tab Bar**; generator controls dock into an expandable **Bottom Sheet**; results display as a **2-column grid**; history strip stays horizontally scrollable. |
| **Tablet** | `640px – 1024px` | Left generator panel becomes a **Collapsible Side Drawer** accessible via a floating action trigger; results format as a **3-column grid**. |
| **Desktop** | `1024px – 1536px` | Canonical mockup layout: floating history strip, sticky **peach control card** on the left, and a **4-column portrait grid** in the results stream. |
| **Large Screens** | `> 1536px` | Content constrained to `max-w-[1720px]`; grid expands comfortably up to **5–6 columns** while maintaining typographic balance. |

---

## 🎨 Design Refinements & Decisions vs. Mockup

While adhering strictly to the visual spirit of Fomi.art and Krea.ai, several tasteful enhancements were implemented:

1. **Typography Selection (Plus Jakarta Sans vs. Generic Rounded Sans)**:
   - *Mockup*: Generic rounded sans.
   - *Refinement*: Implemented **Plus Jakarta Sans** via `next/font/google`. Plus Jakarta Sans provides refined geometric proportions, optical clarity, and distinct letterforms (clear differentiation between `I`, `l`, `1`, `O`, `0`) that are essential for dense technical parameters, prompts, and seeds at 10–12px micro-type, while retaining the warm, approachable character of the Fomi peach/coral design tokens.
2. **Active Coral Bar Placement**:
   - *Mockup*: Thin coral line above active navigation item.
   - *Refinement*: Configured with micro-rounded ends, optical centering, and smooth tab transitions with scale feedback.
3. **Dual-Theme Contrast Harmonization**:
   - *Refinement*: In dark mode, instead of harsh pure black (`#000`), a warm obsidian palette (`#141211` background, `#26211E` peach-tinted cards, `#F09B84` coral) was created to maintain the signature cozy, artistic character of Fomi without eye fatigue.
4. **Optimistic Skeletons & Single Source of Truth**:
   - Initialized `useGenerations` with an empty state and `isLoading: true` to prevent the flash of initial mock data before the API fetch completes. Shimmer cards with simulated diffusion steps provide immediate feedback.
5. **Interactive Video Previews**:
   - Hovering over generated video cards initiates an automated, muted, high-framerate playback loop with a subtle center play glyph that vanishes on hover.

---

## ⌨️ Professional Keyboard Shortcuts (Part B)

All single-key shortcuts are guarded by `lib/isTypingTarget.js` to ensure zero collision with typing in inputs, textareas, contenteditable fields, or dialog modals:

| Key Binding | Action | Target / Scope |
| :--- | :--- | :--- |
| `⌘K` / `Ctrl+K` | Toggle Omni Command Palette | Global (accessible anytime) |
| `1` | Switch to **Timeline Graph** View | Canvas / Navigation |
| `2` | Switch to **Cinema Canvas** View | Canvas / Navigation |
| `3` | Switch to **Swipe Diff Compare** View | Canvas / Navigation |
| `F` | **Fork** active node into a new creative branch | Active Generation Node |
| `C` | **Compare** active node with parent node | Active Generation Node |
| `S` | **Star / Unstar** active node as Hero Shot | Active Generation Node |
| `M` | Toggle **Project Memory DNA** Drawer | Studio State |
| `/` | Focus **Floating Prompt Dock** textarea | Prompt Ergonomics |
| `Esc` | Dismiss modals, drawers, or command palette | Dialogs & Drawers |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.18+` or `20+` / `22+`
- npm `9+`

### Installation
```bash
git clone https://github.com/sadquain/fomi-atelier.git
cd fomi-atelier
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for Part A or [http://localhost:3000/workspace](http://localhost:3000/workspace) for Part B.

### Production Build & Lint
```bash
# Validate production compilation
npm run build

# Run code style & linting check
npm run lint
```

---

## ☁️ Deploying to Vercel

1. Push your repository to **GitHub**: `https://github.com/sadquain/fomi-atelier.git`.
2. Go to the [Vercel Dashboard](https://vercel.com/new).
3. Import the `fomi-atelier` repository.
4. Vercel automatically detects **Next.js**:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Click **Deploy**. Your app will be live with full edge caching, SSR, and dynamic API route support.
