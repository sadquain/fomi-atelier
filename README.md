# Fomi Atelier — AI Content Generation Studio

A production-quality, responsive web implementation of the **Fomi AI content generation workspace** ([Fomi.art](https://fomi.art/)), inspired by modern creative suites including [Krea.ai](https://www.krea.ai/image), [Higgsfield.ai](https://higgsfield.ai/generate), and [OpenArt.ai](https://openart.ai/).

Built with **Next.js (App Router, JavaScript only)**, **Tailwind CSS**, and **Lucide Icons**.

---

## ✦ Key Features

- **Top Bar & Navigation**: Brand mark with glowing status, centered icon navigation (Home, Image Studio, Video Studio, Edit / Canvas, Projects) with a thin coral active indicator, "Gallery" and "Support" dialogs, smooth Sun/Moon theme toggle, and user account badge.
- **Floating History Strip**: Horizontally scrollable row of generations with square rounded thumbnails, item counters, smooth arrow scrollers, and instant turn jumping.
- **Peach Generator Control Panel**:
  - Segmented **Image | Video** toggle that dynamically switches controls and outputs.
  - Generous prompt textarea with character count, random inspiration dice, and anchored coral `✦ Generate` button (`Ctrl+Enter` / `⌘+Enter` supported).
  - Compact selects for **Model** (`Model: Name`), **Aspect Ratio** (`3:4`, `1:1`, `4:3`, `9:16`, `16:9`), and **Batch Count** (`1`, `2`, `4`, `8`).
  - Video-specific controls for **Duration** (`3s`, `5s`, `10s`), **Resolution** (`720p`, `1080p`, `4K`), **Motion Dynamics**, and **Camera Trajectory**.
  - Collapsible **Advance** accordion (negative prompt, seed randomizer, CFG guidance slider, step slider, sampler dropdown).
  - Collapsible **Styles** accordion with gradient preview chips and single-click preset application.
- **Chat-Style Results Feed**:
  - Soft pink-beige prompt bubbles with model chips and metadata badges.
  - Responsive **4-column image grid** (portrait ~3:4 aspect ratio) with stagger entrance transitions and subtle warm shadows.
  - **Video rendering** with poster previews and muted looping playback on hover.
  - Action overlay per asset: **Favorite**, **Download**, **Copy Prompt**, **Reuse Prompt**, and **Fullscreen Lightbox**.
- **Interactive Lightbox**:
  - Full-resolution media view with arrow key navigation (`←` / `→`) and `Esc` dismissal.
  - Inspect prompt, seed, model, and download directly.
- **Optimistic Generation & Skeletons**:
  - Immediate shimmer skeleton placeholders with animated diffusion step feedback.
  - Automatic prepend of new generations to the feed and the front of the history strip.
- **Resilience & Storage**:
  - Persisted theme (Light / Dark) and draft prompts via `localStorage` (guarded with SSR-safe wrappers).
  - Empty state with clickable sample prompts and error state with instant retry.

---

## 📁 Architecture & Folder Structure

```
fomi-atelier/
├── app/
│   ├── api/
│   │   ├── generate/route.js       # POST: Simulates latent diffusion latency & returns outputs
│   │   ├── generations/route.js    # GET: Fetches history generations stream
│   │   ├── models/route.js         # GET: Available diffusion & video model definitions
│   │   └── styles/route.js         # GET: Aesthetic style presets
│   ├── globals.css                 # Warm design tokens, custom scrollbars, shimmer animation
│   ├── layout.js                   # Plus Jakarta Sans font, metadata & viewport
│   └── page.js                     # Root workspace coordinator & responsive shell
├── components/
│   ├── layout/
│   │   ├── Header.jsx              # Brand, centered nav, pills, modals & theme toggle
│   │   ├── IconNav.jsx             # Centered icon suite with coral top indicator
│   │   ├── MobileTabBar.jsx        # Bottom tab bar for mobile viewports (<640px)
│   │   └── ThemeToggle.jsx         # Sun/Moon toggle with localStorage persistence
│   ├── history/
│   │   ├── HistoryStrip.jsx        # Floating rounded history bar with chevron scroll
│   │   └── HistoryThumbnail.jsx    # Square thumbnail with active ring & tooltip
│   ├── generator/
│   │   ├── GeneratorPanel.jsx      # Soft peach control card housing generator tools
│   │   ├── PromptInput.jsx         # Textarea with bottom-right anchored Generate button
│   │   ├── AdvanceAccordion.jsx    # Lazy-loaded CFG, steps, seed, sampler controls
│   │   ├── StylesAccordion.jsx     # Visual style presets with gradient swatches
│   │   └── VideoControls.jsx       # Video duration, resolution, motion & camera path
│   ├── results/
│   │   ├── ResultsThread.jsx       # Stream feed orchestrating turns, skeletons, and modals
│   │   ├── GenerationTurn.jsx      # Prompt bubble with model chip & 4-col results grid
│   │   ├── ResultCard.jsx          # Media tile with hover actions & video loop
│   │   ├── SkeletonGrid.jsx        # Shimmering placeholder cards during synthesis
│   │   ├── LightboxModal.jsx       # Fullscreen preview with arrow navigation
│   │   ├── EmptyState.jsx          # Warm empty state with prompt starter cards
│   │   └── ErrorState.jsx          # Accessible alert banner with retry trigger
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
│   └── stylesData.js               # Visual style presets & modifiers
├── hooks/
│   ├── useGenerate.js              # Synthesis lifecycle, validation & optimistic skeletons
│   ├── useGenerations.js           # History management, favorites & turn deletion
│   ├── useLocalStorage.js          # SSR-safe persisted storage hook
│   └── useMediaQuery.js            # Responsive breakpoint detection hook
└── lib/
    ├── mockData.js                 # 14 curated high-aesthetic generations
    └── utils.js                    # cn class merging, deterministic time formatting
```

---

## 📐 Responsive Breakpoint Matrix

The application layout is intentionally designed for every viewport:

| Viewport | Breakpoint | Layout Adaptations |
| :--- | :--- | :--- |
| **Mobile** | `< 640px` | Top nav moves to an accessible **Bottom Tab Bar**; generator controls dock into an expandable **Bottom Sheet**; results display as a **2-column grid**; history strip stays horizontally scrollable. |
| **Tablet** | `640px – 1024px` | Left generator panel becomes a **Collapsible Side Drawer** accessible via a floating action trigger; results format as a **3-column grid**. |
| **Desktop** | `1024px – 1536px` | Canonical mockup layout: floating history strip, sticky **peach control card** on the left, and a **4-column portrait grid** in the results stream. |
| **Large Screens** | `> 1536px` | Content constrained to `max-w-[1720px]`; grid expands comfortably up to **5–6 columns** while maintaining typographic balance. |

---

## 🎨 Design Refinements & Decisions vs. Mockup

While adhering strictly to the visual spirit of Fomi.art and Krea.ai, several tasteful enhancements were implemented:

1. **Active Coral Bar Placement**:
   - *Mockup*: Thin coral line above active navigation item.
   - *Refinement*: Configured with micro-rounded ends, exact optical centering, and smooth tab transitions with scale feedback.
2. **Dual-Theme Contrast Harmonization**:
   - *Refinement*: In dark mode, instead of harsh pure black (`#000`), a warm obsidian palette (`#141211` background, `#26211E` peach-tinted cards, `#F09B84` coral) was created to maintain the signature cozy, artistic character of Fomi without eye fatigue.
3. **Optimistic Diffusion Skeletons**:
   - *Mockup*: Instant pop-in or simple spinner.
   - *Refinement*: Displays responsive shimmer cards with simulated diffusion progress feedback, transitioning into the staggered result cards.
4. **Prompt Inspiration Randomizer**:
   - Added a subtle dice (`Dices`) action inside the prompt bar allowing users to immediately test high-aesthetic prompt templates without typing from scratch.
5. **Interactive Video Previews**:
   - Hovering over generated video cards initiates an automated, muted, high-framerate playback loop with a subtle center play glyph that vanishes on hover.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.18+` or `20+` / `22+`
- npm `9+`

### Installation
```bash
git clone https://github.com/your-username/fomi-atelier.git
cd fomi-atelier
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Lint
```bash
# Validate production compilation
npm run build

# Run code style & linting check
npm run lint
```

---

## ☁️ Deploying to Vercel

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to the [Vercel Dashboard](https://vercel.com/new).
3. Import the `fomi-atelier` repository.
4. Vercel automatically detects **Next.js**:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Click **Deploy**. Your app will be live with full edge caching, SSR, and dynamic API route support.
